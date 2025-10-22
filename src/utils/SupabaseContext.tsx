import type * as i from 'types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { Env } from '@env';
import { createUser, getUserByEmail } from '@queries/users';

import { supabase } from './supabase';

type UserType = i.User | null | undefined;

type PendingProfile = {
  email: string;
  authUserId: string | null;
};

type SupabaseContextProps = {
  loggedIn: boolean;
  user: UserType;
  pendingProfile: PendingProfile | null;
  signOut: () => Promise<void>;
  signInWithEmail: (params: { email: string; password: string }) => Promise<void>;
  signUpWithEmail: (
    params: { email: string; password: string },
  ) => Promise<{ needsVerification: boolean }>;
  completeProfile: (params: { name: string }) => Promise<void>;
  getAppleOAuthUrl: () => Promise<string | null>;
  getGoogleOAuthUrl: () => Promise<string | null>;
  setOAuthSession: (tokens: { access_token: string; refresh_token: string }) => Promise<void>;
};

function notImplemented(method: string): never {
  throw new Error(`${method} is not available outside of SupabaseProvider.`);
}

export const SupabaseContext = createContext<SupabaseContextProps>({
  loggedIn: false,
  user: null,
  pendingProfile: null,
  signOut: async () => {
    notImplemented('signOut');
  },
  signInWithEmail: async () => {
    notImplemented('signInWithEmail');
  },
  signUpWithEmail: async () => {
    notImplemented('signUpWithEmail');
  },
  completeProfile: async () => {
    notImplemented('completeProfile');
  },
  getAppleOAuthUrl: async () => {
    notImplemented('getAppleOAuthUrl');
  },
  getGoogleOAuthUrl: async () => {
    notImplemented('getGoogleOAuthUrl');
  },
  setOAuthSession: async () => {
    notImplemented('setOAuthSession');
  },
});

export function useSupabase() {
  return useContext(SupabaseContext);
}

function useProtectedRoute(user: UserType, pendingProfile: PendingProfile | null, loggedIn: boolean) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined && !pendingProfile && !loggedIn) return;

    const rootSegment = segments[0];
    const isAuthRoot = rootSegment === undefined;
    const isOnboarding = rootSegment === 'onboarding';
    const isCompleteProfile = isOnboarding && segments[1] === 'complete-profile';

    if (!loggedIn) {
      if (!isAuthRoot) {
        router.replace('/');
      }
      return;
    }

    if (!user) {
      if (pendingProfile) {
        if (!isCompleteProfile) {
          router.replace('/onboarding/complete-profile');
        }
      } else if (!isAuthRoot) {
        router.replace('/');
      }

      return;
    }

    if (isAuthRoot) {
      router.replace('/home/');
    }
  }, [user, pendingProfile, loggedIn, segments]);
}

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>(undefined);
  const [pendingProfile, setPendingProfile] = useState<PendingProfile | null>(null);

  async function getSupabaseUser(token: string) {
    const decodedToken = jwt_decode(token) as JwtPayload & {
      email: string;
      name?: string | null;
      sub?: string;
    };
    const email = decodedToken.email;
    const name = decodedToken.name ?? '';
    const authUserId = typeof decodedToken.sub === 'string' ? decodedToken.sub : null;

    // Fetch the user from Supabase, if not existing, create a new user
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      setUser(existingUser);
      setPendingProfile(null);
      return;
    }

    setUser(null);
    setPendingProfile((current) => current ?? { email, authUserId });

    if (!name) return;

    const { data: newUser, error: newUserError } = await createUser({
      email,
      name,
    });

    if (newUser && !newUserError) {
      setUser(newUser);
      setPendingProfile(null);
    } else if (newUserError) {
      console.error('Error creating new user', { newUserError });
    }
  }

  // Check if the user still has an exisiting session
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      if (data.session) {
        await getSupabaseUser(data.session.access_token);
        setLoggedIn(true);
      }
    })();
  }, []);

  async function signInWithEmail({ email, password }: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.session?.access_token) {
      throw new Error('Unable to retrieve session from Supabase.');
    }

    await getSupabaseUser(data.session.access_token);
    setLoggedIn(true);
  }

  async function signUpWithEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ needsVerification: boolean }> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.session?.access_token) {
      await getSupabaseUser(data.session.access_token);
      setLoggedIn(true);
      return { needsVerification: false };
    }

    setLoggedIn(false);
    setUser(null);
    return { needsVerification: true };
  }

  async function getAppleOAuthUrl(): Promise<string | null> {
    const result = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${Env.BUNDLE_ID}://home/`,
        scopes: 'full_name email',
      },
    });

    return result.data.url;
  }

  async function getGoogleOAuthUrl(): Promise<string | null> {
    const result = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${Env.BUNDLE_ID}://home/`,
      },
    });

    return result.data.url;
  }

  async function setOAuthSession(tokens: { access_token: string; refresh_token: string }) {
    const { data, error } = await supabase.auth.setSession({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    if (error) throw error;

    await getSupabaseUser(tokens.access_token);
    setLoggedIn(data.session !== null);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setLoggedIn(false);
    setPendingProfile(null);

    if (error) throw error;
  }

  async function completeProfile({ name }: { name: string }) {
    if (!pendingProfile) throw new Error('No pending profile to complete.');

    const { data, error } = await createUser({
      email: pendingProfile.email,
      name,
    });

    if (error) throw error;
    if (!data) throw new Error('Unable to create user profile.');

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        full_name: name,
      },
    });

    if (updateError) {
      console.error('Error updating auth profile with name', { updateError });
    }

    setUser(data);
    setPendingProfile(null);
  }

  useProtectedRoute(user, pendingProfile, loggedIn);

  return (
    <SupabaseContext.Provider
      value={{
        loggedIn,
        user,
        pendingProfile,
        signOut,
        signInWithEmail,
        signUpWithEmail,
        completeProfile,
        getAppleOAuthUrl,
        getGoogleOAuthUrl,
        setOAuthSession,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};

type SupabaseProviderProps = {
  children: React.ReactNode;
};

declare module 'jwt-decode' {
  export interface JwtPayload {
    email: string;
    name?: string | null;
    sub: string;
  }
}

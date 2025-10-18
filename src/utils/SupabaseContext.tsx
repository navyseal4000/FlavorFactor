import type * as i from 'types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { Env } from '@env';
import { createUser, getUserByEmail } from '@queries/users';

import { supabase } from './supabase';

type UserType = i.User | null | undefined;

type SupabaseContextProps = {
  loggedIn: boolean;
  user: UserType;
  signOut: () => Promise<void>;
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
  signOut: async () => {
    notImplemented('signOut');
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

function useProtectedRoute(user: UserType) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;

    const rootSegment = segments[0];
    const isAppDir = rootSegment === undefined;

    // If the user is not signed in, and not on signin page
    if (!user) {
      router.replace('/');
    } else if (user && isAppDir) {
      router.replace('/home/');
    }
  }, [user, segments]);
}

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>(undefined);

  async function getSupabaseUser(token: string) {
    const decodedToken = jwt_decode(token) as JwtPayload;
    const email = decodedToken.email;
    const name = decodedToken.name;

    // Fetch the user from Supabase, if not existing, create a new user
    const data = await getUserByEmail(email);

    if (data) {
      setUser(data);
    } else if (!data) {
      const { data: newUser, error: newUserError } = await createUser({
        email,
        name,
      });

      if (newUser && !newUserError) {
        setUser(newUser);
      } else if (newUserError) {
        console.error('Error creating new user', { newUserError });
      }
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

    if (error) throw error;
  }

  useProtectedRoute(user);

  return (
    <SupabaseContext.Provider
      value={{
        loggedIn,
        user,
        signOut,
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
    name: string;
  }
}

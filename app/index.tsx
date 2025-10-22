import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import styled from 'styled-components/native';

import { Env } from '@env';
import { getApplicationId, isIphone, SecureStoreAdapter } from '@utils';
import { useSupabase } from '@utils/SupabaseContext';
import { Button } from '@common/interaction';
import { Container, LogoHeader } from '@common/layout';
import { Apple, Gsuite } from '@common/svg';
import { Text } from '@common/typography';

export default function AuthScreen() {
  const { getAppleOAuthUrl, getGoogleOAuthUrl, setOAuthSession, signInWithEmail, signUpWithEmail } =
    useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signIn');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formNotice, setFormNotice] = useState<string | null>(null);

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  function extractParamsFromUrl(url: string) {
    const params = new URLSearchParams(url.split('#')[1]);
    const data = {
      access_token: params.get('access_token'),
      expires_in: parseInt(params.get('expires_in') || '0'),
      refresh_token: params.get('refresh_token'),
      token_type: params.get('token_type'),
      provider_token: params.get('provider_token'),
    };

    return data;
  }

  function handleToggleAuthMode() {
    if (formLoading) return;

    setAuthMode((prev) => (prev === 'signIn' ? 'signUp' : 'signIn'));
    setFormError(null);
    setFormNotice(null);
  }

  function isValidEmail(value: string) {
    return /\S+@\S+\.\S+/.test(value);
  }

  async function onSubmitEmailAuth() {
    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password;

    setFormError(null);
    setFormNotice(null);

    if (!isValidEmail(email)) {
      setFormError('Enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }

    setFormLoading(true);

    try {
      if (authMode === 'signIn') {
        await signInWithEmail({ email, password });
        setCredentials({ email: '', password: '' });
      } else {
        const result = await signUpWithEmail({ email, password });

        if (result.needsVerification) {
          setFormNotice('Check your email to confirm your account before signing in.');
        } else {
          setCredentials({ email: '', password: '' });
          router.replace('/onboarding/complete-profile');
          return;
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to complete the request.';
      setFormError(message);
    } finally {
      setFormLoading(false);
    }
  }

  async function onSignInWithGoogle() {
    setLoading(true);

    try {
      const url = await getGoogleOAuthUrl();
      if (!url) return;

      const result = await WebBrowser.openAuthSessionAsync(url, `${Env.BUNDLE_ID}://home/`, {
        showInRecents: true,
      });

      if (result.type === 'success') {
        const data = extractParamsFromUrl(result.url);

        if (!data.access_token || !data.refresh_token) return;

        setOAuthSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });

        // You can optionally store Google's access token if you need it later
        SecureStoreAdapter.setItem('google-access-token', JSON.stringify(data.provider_token));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function onSignInWithApple() {
    setLoading(true);

    try {
      const url = await getAppleOAuthUrl();
      if (!url) return;

      const result = await WebBrowser.openAuthSessionAsync(url, `${Env.BUNDLE_ID}://home/`, {
        showInRecents: true,
      });

      if (result.type === 'success') {
        const data = extractParamsFromUrl(result.url);

        if (!data.access_token || !data.refresh_token) return;

        setOAuthSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });

        // You can optionally store Apple access token if you need it later
        SecureStoreAdapter.setItem('apple-access-token', JSON.stringify(data.provider_token));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const isSubmitDisabled =
    formLoading || credentials.email.trim() === '' || credentials.password.trim() === '';

  return (
    <>
      <StatusBar style="dark" />
      <LogoHeader />
      <Container>
        <Button
          onPress={onSignInWithGoogle}
          isDisabled={loading}
          variant="social"
          style={{ marginBottom: 16, width: '100%' }}
        >
          <Gsuite
            width={19}
            height={19}
            style={{ marginRight: 8 }}
          />
          <Text>{loading ? 'Loading...' : 'Sign in with Google'}</Text>
        </Button>
        {isIphone && (
          <Button
            onPress={onSignInWithApple}
            isDisabled={loading}
            variant="social"
            style={{ width: '100%' }}
          >
            <Apple
              width={20}
              height={22}
              style={{ marginRight: 8 }}
            />
            <Text>{loading ? 'Loading...' : 'Sign in with Apple'}</Text>
          </Button>
        )}

        <Text
          size={16}
          color="gray"
          align="center"
          marginTop={32}
          marginBottom={16}
        >
          Or continue with email
        </Text>

        <FormWrapper>
          <Input
            value={credentials.email}
            onChangeText={(value) => setCredentials((prev) => ({ ...prev, email: value }))}
            placeholder="Email address"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            editable={!formLoading}
            returnKeyType="next"
          />
          <Input
            value={credentials.password}
            onChangeText={(value) => setCredentials((prev) => ({ ...prev, password: value }))}
            placeholder="Password"
            secureTextEntry
            textContentType={authMode === 'signUp' ? 'newPassword' : 'password'}
            editable={!formLoading}
            returnKeyType="done"
            onSubmitEditing={onSubmitEmailAuth}
          />

          {formError && <MessageText variant="error">{formError}</MessageText>}
          {formNotice && !formError && <MessageText variant="info">{formNotice}</MessageText>}

          <Button
            onPress={onSubmitEmailAuth}
            isDisabled={isSubmitDisabled}
            isLoading={formLoading}
            style={{ width: '100%', marginTop: 8 }}
          >
            {authMode === 'signIn' ? 'Sign in with email' : 'Create account'}
          </Button>

          <ToggleModeButton
            onPress={handleToggleAuthMode}
            disabled={formLoading}
          >
            <ToggleModeText
              size={16}
              align="center"
            >
              {authMode === 'signIn'
                ? "Don't have an account? Create one"
                : 'Already have an account? Sign in'}
            </ToggleModeText>
          </ToggleModeButton>
        </FormWrapper>

        <Text
          size={16}
          color="gray"
          style={{ marginTop: 32 }}
        >
          {getApplicationId()}
        </Text>
      </Container>
    </>
  );
}

const FormWrapper = styled.View`
  width: 100%;
`;

const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray800,
}))`
  width: 100%;
  border-radius: ${({ theme }) => theme.ui.borderRadius.button};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray};
  padding: 14px 16px;
  margin-bottom: 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
`;

const MessageText = styled.Text<{ variant: 'error' | 'info' }>`
  width: 100%;
  text-align: center;
  color: ${({ theme, variant }) =>
    variant === 'error' ? theme.colors.red : theme.colors.gray800};
  font-size: 14px;
  margin-bottom: 12px;
`;

const ToggleModeButton = styled.Pressable<{ disabled?: boolean }>`
  margin-top: 12px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const ToggleModeText = styled(Text)`
  color: ${({ theme }) => theme.colors.primary};
`;

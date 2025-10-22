import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

import { Button } from '@common/interaction';
import { LogoHeader } from '@common/layout';
import { Text } from '@common/typography';
import { useSupabase } from '@utils/SupabaseContext';

export default function CompleteProfileScreen() {
  const { pendingProfile, completeProfile, loggedIn, user } = useSupabase();
  const router = useRouter();
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      router.replace('/');
      return;
    }

    if (user) {
      router.replace('/onboarding/goals-and-preferences');
      return;
    }

    if (pendingProfile === null && user === undefined) {
      return;
    }

    if (!pendingProfile) {
      router.replace('/');
    }
  }, [loggedIn, pendingProfile, router, user]);

  async function onSubmit() {
    const trimmedName = name.trim();
    setErrorMessage(null);

    if (trimmedName.length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    try {
      setSaving(true);
      await completeProfile({ name: trimmedName });
      router.replace('/onboarding/goals-and-preferences');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save your name.';
      setErrorMessage(message);
    } finally {
      setSaving(false);
    }
  }

  const emailLabel = pendingProfile?.email ?? '';

  return (
    <ScreenWrapper>
      <LogoHeader />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <Content>
          <Text
            size={32}
            marginBottom={12}
          >
            Welcome! What should we call you?
          </Text>
          <Text
            size={16}
            color="gray"
            marginBottom={24}
          >
            We use your name to personalize your experience for {emailLabel}.
          </Text>

          <NameInput
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            autoCapitalize="words"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={onSubmit}
            editable={!saving}
          />

          {errorMessage && <MessageText variant="error">{errorMessage}</MessageText>}

          <Button
            onPress={onSubmit}
            isDisabled={saving || name.trim().length === 0}
            isLoading={saving}
            style={{ width: '100%', marginTop: 12 }}
          >
            Continue
          </Button>
        </Content>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const ScreenWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Content = styled.View`
  flex: 1;
  padding: 24px 20px;
  justify-content: flex-start;
`;

const NameInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray800,
}))`
  width: 100%;
  border-radius: ${({ theme }) => theme.ui.borderRadius.button};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray};
  padding: 14px 16px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.black};
`;

const MessageText = styled.Text<{ variant: 'error' }>`
  width: 100%;
  text-align: left;
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
  margin-top: 8px;
`;

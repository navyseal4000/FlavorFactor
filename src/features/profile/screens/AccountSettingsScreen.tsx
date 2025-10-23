import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

import { ProfileLayout } from '../components/ProfileLayout';
import { ProfileSectionList } from '../components/ProfileSectionList';
import { ProfileTabsCarousel } from '../components/ProfileTabsCarousel';
import { accountTabScenes } from '../mockData';

export interface AccountSettingsScreenProps {
  showBottomNav?: boolean;
}

export function AccountSettingsScreen({ showBottomNav = true }: AccountSettingsScreenProps): ReactElement {
  const [activeTab, setActiveTab] = useState(accountTabScenes.tabs[0]?.key ?? 'overview');
  const router = useRouter();

  const handleOpenDeleteAccount = useCallback(() => {
    router.push('/settings/delete-account' as never);
  }, [router]);

  const scenes = useMemo(
    () =>
      accountTabScenes.tabs.reduce<Record<string, ReactElement>>((acc, tab) => {
        acc[tab.key] = <ProfileSectionList sections={accountTabScenes.sectionsByTab[tab.key] ?? []} />;
        return acc;
      }, {}),
    [],
  );

  return (
    <ProfileLayout
      title="Account settings"
      tabs={accountTabScenes.tabs}
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      showBottomNav={showBottomNav}
      headerAccessory={
        <HeaderAccessoryButton
          onPress={handleOpenDeleteAccount}
          accessibilityRole="button"
          accessibilityHint="Review the steps before deleting your account"
        >
          <HeaderAccessoryText>Delete account</HeaderAccessoryText>
        </HeaderAccessoryButton>
      }
    >
      <ProfileTabsCarousel tabs={accountTabScenes.tabs} activeTab={activeTab} scenes={scenes} />
    </ProfileLayout>
  );
}

const HeaderAccessoryButton = styled.Pressable`
  padding: 8px 12px;
  border-radius: 999px;
  border-width: 1px;
  border-color: #ef4444;
  background-color: rgba(239, 68, 68, 0.08);
`;

const HeaderAccessoryText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #b91c1c;
`;

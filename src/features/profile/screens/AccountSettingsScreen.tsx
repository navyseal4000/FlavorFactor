import React, { ReactElement, useMemo, useState } from 'react';

import { ProfileLayout } from '../components/ProfileLayout';
import { ProfileSectionList } from '../components/ProfileSectionList';
import { ProfileTabsCarousel } from '../components/ProfileTabsCarousel';
import { accountTabScenes } from '../mockData';

export interface AccountSettingsScreenProps {
  showBottomNav?: boolean;
}

export function AccountSettingsScreen({ showBottomNav = true }: AccountSettingsScreenProps): ReactElement {
  const [activeTab, setActiveTab] = useState(accountTabScenes.tabs[0]?.key ?? 'overview');

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
    >
      <ProfileTabsCarousel tabs={accountTabScenes.tabs} activeTab={activeTab} scenes={scenes} />
    </ProfileLayout>
  );
}

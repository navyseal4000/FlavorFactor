import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface NotificationsSettingsScreenProps {
  showBottomNav?: boolean;
}

export function NotificationsSettingsScreen({
  showBottomNav = true,
}: NotificationsSettingsScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.notifications.title}
      sections={profileMockData.notifications.sections}
      showBottomNav={showBottomNav}
    />
  );
}

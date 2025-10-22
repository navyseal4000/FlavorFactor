import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface AnalyticsSettingsScreenProps {
  showBottomNav?: boolean;
}

export function AnalyticsSettingsScreen({
  showBottomNav = true,
}: AnalyticsSettingsScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.analytics.title}
      sections={profileMockData.analytics.sections}
      showBottomNav={showBottomNav}
    />
  );
}

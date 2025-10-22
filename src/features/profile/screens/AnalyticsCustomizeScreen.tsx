import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface AnalyticsCustomizeScreenProps {
  showBottomNav?: boolean;
}

export function AnalyticsCustomizeScreen({
  showBottomNav = true,
}: AnalyticsCustomizeScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.analyticsCustomize.title}
      sections={profileMockData.analyticsCustomize.sections}
      showBottomNav={showBottomNav}
    />
  );
}

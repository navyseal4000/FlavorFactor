import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface AnalyticsExportScreenProps {
  showBottomNav?: boolean;
}

export function AnalyticsExportScreen({
  showBottomNav = true,
}: AnalyticsExportScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.analyticsExport.title}
      sections={profileMockData.analyticsExport.sections}
      showBottomNav={showBottomNav}
    />
  );
}

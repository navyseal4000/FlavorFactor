import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface DataRetentionScreenProps {
  showBottomNav?: boolean;
}

export function DataRetentionScreen({ showBottomNav = true }: DataRetentionScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.dataRetention.title}
      sections={profileMockData.dataRetention.sections}
      showBottomNav={showBottomNav}
    />
  );
}

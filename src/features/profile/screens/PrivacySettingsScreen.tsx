import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface PrivacySettingsScreenProps {
  showBottomNav?: boolean;
}

export function PrivacySettingsScreen({ showBottomNav = true }: PrivacySettingsScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.privacy.title}
      sections={profileMockData.privacy.sections}
      showBottomNav={showBottomNav}
    />
  );
}

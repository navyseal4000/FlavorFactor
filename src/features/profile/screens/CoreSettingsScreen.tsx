import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface CoreSettingsScreenProps {
  showBottomNav?: boolean;
}

export function CoreSettingsScreen({ showBottomNav = true }: CoreSettingsScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.core.title}
      sections={profileMockData.core.sections}
      showBottomNav={showBottomNav}
    />
  );
}

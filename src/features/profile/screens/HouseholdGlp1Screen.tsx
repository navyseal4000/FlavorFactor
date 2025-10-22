import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface HouseholdGlp1ScreenProps {
  showBottomNav?: boolean;
}

export function HouseholdGlp1Screen({ showBottomNav = true }: HouseholdGlp1ScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.householdGlp1.title}
      sections={profileMockData.householdGlp1.sections}
      showBottomNav={showBottomNav}
    />
  );
}

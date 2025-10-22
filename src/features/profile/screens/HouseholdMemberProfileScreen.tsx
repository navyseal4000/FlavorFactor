import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface HouseholdMemberProfileScreenProps {
  showBottomNav?: boolean;
}

export function HouseholdMemberProfileScreen({
  showBottomNav = true,
}: HouseholdMemberProfileScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.householdMemberProfile.title}
      sections={profileMockData.householdMemberProfile.sections}
      subtitle={profileMockData.householdMemberProfile.subtitle}
      showBottomNav={showBottomNav}
    />
  );
}

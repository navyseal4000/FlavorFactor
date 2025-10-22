import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface HouseholdAddMemberScreenProps {
  showBottomNav?: boolean;
}

export function HouseholdAddMemberScreen({
  showBottomNav = true,
}: HouseholdAddMemberScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.householdAddMember.title}
      sections={profileMockData.householdAddMember.sections}
      showBottomNav={showBottomNav}
    />
  );
}

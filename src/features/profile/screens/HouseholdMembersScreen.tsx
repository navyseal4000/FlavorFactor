import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface HouseholdMembersScreenProps {
  showBottomNav?: boolean;
}

export function HouseholdMembersScreen({
  showBottomNav = true,
}: HouseholdMembersScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.householdMembers.title}
      sections={profileMockData.householdMembers.sections}
      showBottomNav={showBottomNav}
    />
  );
}

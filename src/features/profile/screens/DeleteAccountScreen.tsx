import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface DeleteAccountScreenProps {
  showBottomNav?: boolean;
}

export function DeleteAccountScreen({ showBottomNav = true }: DeleteAccountScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.deleteAccount.title}
      sections={profileMockData.deleteAccount.sections}
      showBottomNav={showBottomNav}
    />
  );
}

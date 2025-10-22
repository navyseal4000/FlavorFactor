import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface AboutScreenProps {
  showBottomNav?: boolean;
}

export function AboutScreen({ showBottomNav = true }: AboutScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.about.title}
      sections={profileMockData.about.sections}
      showBottomNav={showBottomNav}
    />
  );
}

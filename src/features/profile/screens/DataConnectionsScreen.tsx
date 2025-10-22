import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface DataConnectionsScreenProps {
  showBottomNav?: boolean;
}

export function DataConnectionsScreen({ showBottomNav = true }: DataConnectionsScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.dataConnections.title}
      sections={profileMockData.dataConnections.sections}
      showBottomNav={showBottomNav}
    />
  );
}

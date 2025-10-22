import React, { ReactElement } from 'react';

import { profileMockData } from '../mockData';
import { ProfileSectionsScreen } from './ProfileSectionsScreen';

export interface ExportDataScreenProps {
  showBottomNav?: boolean;
}

export function ExportDataScreen({ showBottomNav = true }: ExportDataScreenProps): ReactElement {
  return (
    <ProfileSectionsScreen
      title={profileMockData.exportData.title}
      sections={profileMockData.exportData.sections}
      showBottomNav={showBottomNav}
    />
  );
}

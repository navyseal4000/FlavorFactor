import React, { ReactElement } from 'react';

import { ProfileLayout } from '../components/ProfileLayout';
import { ProfileSectionList } from '../components/ProfileSectionList';
import type { ProfileSection } from '../types';

export interface ProfileSectionsScreenProps {
  title: string;
  sections: ProfileSection[];
  subtitle?: string;
  showBottomNav?: boolean;
}

export function ProfileSectionsScreen({
  title,
  sections,
  subtitle,
  showBottomNav = true,
}: ProfileSectionsScreenProps): ReactElement {
  return (
    <ProfileLayout title={title} subtitle={subtitle} showBottomNav={showBottomNav}>
      <ProfileSectionList sections={sections} />
    </ProfileLayout>
  );
}

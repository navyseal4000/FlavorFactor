import type { ReactElement } from 'react';

export type ProfileTabDescriptor = {
  key: string;
  label: string;
};

export type ProfileListItemType = 'info' | 'navigation' | 'toggle' | 'status';

export type ProfileStatusTone = 'default' | 'success' | 'warning' | 'info';

export interface ProfileListItemBase {
  id: string;
  title: string;
  description?: string;
  icon?: ReactElement;
  badge?: string;
}

export interface ProfileInfoItem extends ProfileListItemBase {
  type?: 'info';
  value?: string;
  meta?: string;
}

export interface ProfileNavigationItem extends ProfileListItemBase {
  type: 'navigation';
  meta?: string;
  value?: string;
}

export interface ProfileToggleItem extends ProfileListItemBase {
  type: 'toggle';
  toggleValue: boolean;
  toggleDisabled?: boolean;
}

export interface ProfileStatusItem extends ProfileListItemBase {
  type: 'status';
  statusLabel: string;
  statusTone?: ProfileStatusTone;
  meta?: string;
}

export type ProfileListItem =
  | ProfileInfoItem
  | ProfileNavigationItem
  | ProfileToggleItem
  | ProfileStatusItem;

export interface ProfileSection {
  id: string;
  title?: string;
  description?: string;
  items: ProfileListItem[];
}

export interface ProfileSinglePageConfig {
  title: string;
  subtitle?: string;
  sections: ProfileSection[];
}

export interface ProfileTabScenes {
  tabs: ProfileTabDescriptor[];
  sectionsByTab: Record<string, ProfileSection[]>;
}

import React, { ReactElement } from 'react';
import { Pressable, View } from 'react-native';
import styled from 'styled-components/native';

import {
  PROFILE_ACCENT_COLOR,
  PROFILE_BORDER_COLOR,
  PROFILE_HEADER_BACKGROUND,
  PROFILE_MUTED_TEXT_COLOR,
  PROFILE_TEXT_COLOR,
} from '../constants';
import type { ProfileTabDescriptor } from '../types';

interface ProfileTabsProps {
  tabs: ProfileTabDescriptor[];
  activeTab?: string;
  onSelect?: (tab: string) => void;
}

export function ProfileTabs({ tabs, activeTab, onSelect }: ProfileTabsProps): ReactElement {
  return (
    <TabsContainer>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TabButton
            key={tab.key}
            onPress={() => onSelect?.(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            testID={`profile-tab-${tab.key}`}
          >
            <TabLabel $active={isActive}>{tab.label}</TabLabel>
            {isActive ? <TabIndicator /> : null}
          </TabButton>
        );
      })}
    </TabsContainer>
  );
}

const TabsContainer = styled(View)`
  flex-direction: row;
  background-color: ${PROFILE_HEADER_BACKGROUND};
  border-bottom-width: 1px;
  border-color: ${PROFILE_BORDER_COLOR};
`;

const TabButton = styled(Pressable)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 12px 4px 10px 4px;
  gap: 4px;
`;

const TabLabel = styled.Text<{ $active: boolean }>`
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  color: ${({ $active }) => ($active ? PROFILE_TEXT_COLOR : PROFILE_MUTED_TEXT_COLOR)};
`;

const TabIndicator = styled(View)`
  width: 24px;
  height: 3px;
  border-radius: 999px;
  background-color: ${PROFILE_ACCENT_COLOR};
`;

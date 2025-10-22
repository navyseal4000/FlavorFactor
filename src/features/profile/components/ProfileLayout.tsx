import React, { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { BottomNav } from '../../../components/navigation/BottomNav';
import {
  PROFILE_BACKGROUND,
  PROFILE_BORDER_COLOR,
  PROFILE_HEADER_BACKGROUND,
  PROFILE_MUTED_TEXT_COLOR,
  PROFILE_TEXT_COLOR,
} from '../constants';
import type { ProfileTabDescriptor } from '../types';
import { ProfileTabs } from './ProfileTabs';

export interface ProfileLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  tabs?: ProfileTabDescriptor[];
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  headerAccessory?: ReactNode;
  showBottomNav?: boolean;
}

/**
 * Provides the shared shell for profile/settings pages. The component mirrors the
 * structure of the log feature by managing safe-area padding, rendering the
 * persistent bottom navigation, and exposing an optional tab strip that can be
 * paired with the animated carousel.
 */
export function ProfileLayout({
  title,
  subtitle,
  children,
  tabs,
  activeTab,
  onSelectTab,
  headerAccessory,
  showBottomNav = true,
}: ProfileLayoutProps): ReactElement {
  const { top } = useSafeAreaInsets();

  return (
    <ScreenContainer style={{ paddingTop: Math.max(top, 12) }}>
      <Header>
        <HeaderContent>
          <HeaderTitle>{title}</HeaderTitle>
          {subtitle ? <HeaderSubtitle>{subtitle}</HeaderSubtitle> : null}
        </HeaderContent>
        {headerAccessory ? <HeaderAccessory>{headerAccessory}</HeaderAccessory> : null}
      </Header>
      {tabs && tabs.length > 0 ? (
        <ProfileTabs tabs={tabs} activeTab={activeTab} onSelect={onSelectTab} />
      ) : null}
      <Content>{children}</Content>
      {showBottomNav ? <BottomNav activeKey="profile" /> : null}
    </ScreenContainer>
  );
}

const ScreenContainer = styled(View)`
  flex: 1;
  background-color: ${PROFILE_BACKGROUND};
`;

const Header = styled(View)`
  background-color: ${PROFILE_HEADER_BACKGROUND};
  border-bottom-width: 1px;
  border-color: ${PROFILE_BORDER_COLOR};
  padding: 12px 16px 8px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const HeaderContent = styled(View)`
  flex: 1;
`;

const HeaderAccessory = styled(View)`
  align-items: flex-end;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${PROFILE_TEXT_COLOR};
`;

const HeaderSubtitle = styled.Text`
  margin-top: 4px;
  font-size: 14px;
  color: ${PROFILE_MUTED_TEXT_COLOR};
`;

const Content = styled(View)`
  flex: 1;
`;

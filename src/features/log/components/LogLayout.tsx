import { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '../../../components/navigation/BottomNav';

import { LOG_BACKGROUND, LogTabKey } from '../constants';
import { LogTopTabs } from './LogTopTabs';

interface LogLayoutProps {
  activeTab: LogTabKey;
  children: ReactNode;
  onSelectTab?: (tab: LogTabKey) => void;
}

export function LogLayout({ activeTab, children, onSelectTab }: LogLayoutProps): ReactElement {
  const { top } = useSafeAreaInsets();

  return (
    <ScreenContainer style={{ paddingTop: Math.max(top, 12) }}>
      <Header>
        <Spacer />
      <HeaderTitle>Log</HeaderTitle>
      <Spacer />
      </Header>
      <LogTopTabs
        activeTab={activeTab}
        onSelect={onSelectTab}
      />
      <Content>{children}</Content>
      <BottomNav activeKey="log" />
    </ScreenContainer>
  );
}

const ScreenContainer = styled(View)`
  flex: 1;
  background-color: ${LOG_BACKGROUND};
`;

const Header = styled(View)`
  background-color: #ffffff;
  padding-horizontal: 16px;
  padding-bottom: 8px;
  border-bottom-width: 1px;
  border-color: #e5e7eb;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Spacer = styled(View)`
  width: 40px;
  height: 40px;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

const Content = styled(View)`
  flex: 1;
`;

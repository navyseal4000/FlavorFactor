import { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '../../../components/navigation/BottomNav';

import { LOG_BACKGROUND, LOG_PRIMARY_COLOR, LogTabKey } from '../constants';
import { LogTopTabs } from './LogTopTabs';

interface LogLayoutProps {
  activeTab: LogTabKey;
  children: ReactNode;
  headerAction?: () => void;
}

export function LogLayout({ activeTab, children, headerAction }: LogLayoutProps): ReactElement {
  const { top } = useSafeAreaInsets();

  return (
    <ScreenContainer style={{ paddingTop: Math.max(top, 12) }}>
      <Header>
        <IconButton onPress={headerAction}>
          <MaterialIcons name="menu" size={24} color="#111827" />
        </IconButton>
        <HeaderTitle>Log</HeaderTitle>
        <View style={{ width: 40 }} />
      </Header>
      <LogTopTabs activeTab={activeTab} />
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

const IconButton = styled.Pressable`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

const Content = styled(View)`
  flex: 1;
`;

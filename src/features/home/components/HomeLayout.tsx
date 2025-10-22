import { ReactElement, ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { BottomNav } from '../../../components/navigation/BottomNav';
import { HOME_BACKGROUND, HomeTabKey } from '../constants';
import { triggerHomeImpact, triggerHomeSelection } from '../haptics';
import { homeUser } from '../mockData';
import { HomeTopTabs } from './HomeTopTabs';

interface HomeLayoutProps {
  activeTab: HomeTabKey;
  children: ReactNode;
  onSelectTab?: (tab: HomeTabKey) => void;
}

export function HomeLayout({ activeTab, children, onSelectTab }: HomeLayoutProps): ReactElement {
  const navigation = useNavigation();
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const userName = homeUser.name ?? 'there';

  function handleOpenDrawer() {
    triggerHomeSelection();
    (navigation as { toggleDrawer?: () => void })?.toggleDrawer?.();
  }

  return (
    <ScreenContainer style={{ paddingTop: Math.max(top, 16) }}>
      <Header>
        <HeaderBlock>
          <HeaderTitle>{`Welcome Back ${userName}`}</HeaderTitle>
        </HeaderBlock>
        <HeaderActions>
          <DrawerButton
            onPress={handleOpenDrawer}
            accessibilityLabel="Open navigation menu"
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            <MaterialIcons name="menu" size={22} color="#111827" />
          </DrawerButton>
          <NotificationButton
            accessibilityLabel="Open notifications"
            onPress={() => {
              triggerHomeImpact();
              router.push('/notifications' as never);
            }}
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            <MaterialIcons name="notifications-none" size={22} color="#111827" />
          </NotificationButton>
        </HeaderActions>
      </Header>
      <HomeTopTabs activeTab={activeTab} onSelect={onSelectTab} />
      <Content>{children}</Content>
      <BottomNav activeKey="home" />
    </ScreenContainer>
  );
}

const ScreenContainer = styled(View)`
  flex: 1;
  background-color: ${HOME_BACKGROUND};
`;

const Header = styled(View)`
  padding: 0 20px 12px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const HeaderBlock = styled(View)`
  gap: 4px;
`;

const HeaderTitle = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
`;

const HeaderActions = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const DrawerButton = styled(Pressable)`
  padding: 10px;
  border-radius: 24px;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #e5e7eb;
`;

const NotificationButton = styled(Pressable)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f1f5f9;
  border-width: 1px;
  border-color: #e2e8f0;
  align-items: center;
  justify-content: center;
`;

const Content = styled(View)`
  flex: 1;
`;

export default HomeLayout;

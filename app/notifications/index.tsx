import { ReactElement } from 'react';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { triggerHomeSelection } from '../../src/features/home/haptics';
import { BottomNav } from '../../src/components/navigation/BottomNav';
import { HomeNotificationsPage } from '../../src/features/home';

export default function NotificationsRoute(): ReactElement {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Screen style={{ paddingTop: Math.max(top, 16) }}>
      <Header>
        <BackButton
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => {
            triggerHomeSelection();
            router.back();
          }}
        >
          <MaterialIcons name="arrow-back" size={22} color="#111827" />
        </BackButton>
        <HeaderTitle>Notifications</HeaderTitle>
      </Header>
      <Content>
        <HomeNotificationsPage />
      </Content>
      <BottomNav activeKey="home" />
    </Screen>
  );
}

const Screen = styled.View`
  flex: 1;
  background-color: #f8fafc;
`;

const Header = styled.View`
  padding: 0 24px 12px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
`;

const Content = styled.View`
  flex: 1;
`;

const BackButton = styled(Pressable)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #e2e8f0;
  background-color: #ffffff;
`;

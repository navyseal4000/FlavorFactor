import { ReactElement, ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '../../../components/navigation/BottomNav';
import { COACH_BACKGROUND, CoachTabKey } from '../constants';
import { CoachTopTabs } from './CoachTopTabs';

interface CoachLayoutProps {
  activeTab: CoachTabKey;
  children: ReactNode;
  onSelectTab?: (tab: CoachTabKey) => void;
  onPressHeaderAction?: () => void;
}

/**
 * Shared wrapper for every Coach screen. The layout keeps header chrome,
 * segmented navigation, and the persistent bottom tabs consistent so that each
 * page can focus on its feature-specific content.
 */
export function CoachLayout({
  activeTab,
  children,
  onSelectTab,
  onPressHeaderAction,
}: CoachLayoutProps): ReactElement {
  const { top } = useSafeAreaInsets();

  return (
    <ScreenContainer style={{ paddingTop: Math.max(top, 12) }}>
      <Header>
        <HeaderTitle accessibilityRole="header">Support</HeaderTitle>
        <HeaderAction
          accessibilityRole="button"
          accessibilityLabel="View coaching notes"
          onPress={onPressHeaderAction}
        >
          <MaterialIcons name="sticky-note-2" size={20} color="#111827" />
          <HeaderActionLabel>Notes</HeaderActionLabel>
        </HeaderAction>
      </Header>
      <CoachTopTabs activeTab={activeTab} onSelect={onSelectTab} />
      <Content>{children}</Content>
      <BottomNav activeKey="coach" />
    </ScreenContainer>
  );
}

const ScreenContainer = styled(View)`
  flex: 1;
  background-color: ${COACH_BACKGROUND};
`;

const Header = styled(View)`
  background-color: #ffffff;
  padding: 12px 16px 8px 16px;
  border-bottom-width: 1px;
  border-color: #e5e7eb;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

const HeaderAction = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  background-color: #f3f4f6;
`;

const HeaderActionLabel = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #111827;
`;

const Content = styled(View)`
  flex: 1;
`;

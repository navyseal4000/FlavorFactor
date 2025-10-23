import { ReactElement, ReactNode } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '../../../components/navigation/BottomNav';

import { PLAN_BACKGROUND, PlanTabKey } from '../constants';
import { PlanTopTabs } from './PlanTopTabs';

interface PlanLayoutProps {
  activeTab: PlanTabKey;
  children: ReactNode;
  onSelectTab?: (tab: PlanTabKey) => void;
}

/**
 * Top-level shell for the Plan feature. It mirrors {@link LogLayout} to maintain
 * parity across tabs while applying plan-specific copy and safe-area spacing.
 */
export function PlanLayout({ activeTab, children, onSelectTab }: PlanLayoutProps): ReactElement {
  const { top } = useSafeAreaInsets();

  return (
    <ScreenContainer style={{ paddingTop: Math.max(top, 12) }}>
      <Header>
        <Spacer />
        <HeaderTitle>Plan &amp; Shop</HeaderTitle>
        <Spacer />
      </Header>
      <PlanTopTabs activeTab={activeTab} onSelect={onSelectTab} />
      <Content>{children}</Content>
      <BottomNav activeKey="plan" />
    </ScreenContainer>
  );
}

const ScreenContainer = styled(View)`
  flex: 1;
  background-color: ${PLAN_BACKGROUND};
`;

const Header = styled(View)`
  background-color: #ffffff;
  padding-horizontal: 16px;
  padding-bottom: 12px;
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

import { ReactElement } from 'react';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

import { LOG_NAV_ROUTES, LOG_PRIMARY_COLOR, LogTabKey } from '../constants';

interface LogTopTabsProps {
  activeTab: LogTabKey;
}

const TAB_LABELS: Record<LogTabKey, string> = {
  food: 'Food',
  weight: 'Weight',
  activity: 'Activity',
};

export function LogTopTabs({ activeTab }: LogTopTabsProps): ReactElement {
  const router = useRouter();

  function handleSelect(tab: LogTabKey) {
    if (tab === activeTab) return;
    router.replace(LOG_NAV_ROUTES[tab] as never);
  }

  return (
    <Container>
      {Object.entries(TAB_LABELS).map(([key, label]) => {
        const tabKey = key as LogTabKey;
        const isActive = tabKey === activeTab;
        return (
          <TabButton
            key={tabKey}
            onPress={() => handleSelect(tabKey)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <TabLabel $active={isActive}>{label}</TabLabel>
            {isActive && <ActiveUnderline />}
          </TabButton>
        );
      })}
    </Container>
  );
}

const Container = styled(View)`
  flex-direction: row;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: #e5e7eb;
  padding-horizontal: 12px;
`;

const TabButton = styled(Pressable)`
  padding-vertical: 12px;
  margin-horizontal: 16px;
  align-items: center;
`;

const TabLabel = styled.Text<{ $active: boolean }>`
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  color: ${({ $active }) => ($active ? '#111827' : '#6b7280')};
`;

const ActiveUnderline = styled(View)`
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background-color: ${LOG_PRIMARY_COLOR};
  margin-top: 6px;
`;


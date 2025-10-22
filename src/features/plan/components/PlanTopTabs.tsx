import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

import { PLAN_NAV_ROUTES, PlanTabKey } from '../constants';
import { PLAN_TAB_SEQUENCE } from '../utils/carousel';

interface PlanTopTabsProps {
  activeTab: PlanTabKey;
  onSelect?: (tab: PlanTabKey) => void;
}

const TAB_LABELS: Record<PlanTabKey, string> = {
  weekly: 'Weekly',
  daily: 'Daily',
  pantry: 'Pantry',
  cart: 'Cart',
};

/**
 * Pill-style segmented control at the top of the Plan layout. It mirrors the log
 * tabs but routes to plan screens by default.
 */
export function PlanTopTabs({ activeTab, onSelect }: PlanTopTabsProps): ReactElement {
  const router = useRouter();
  const [containerWidth, setContainerWidth] = useState(0);
  const segmentWidth = containerWidth / PLAN_TAB_SEQUENCE.length || 0;

  const animatedValue = useRef(new Animated.Value(PLAN_TAB_SEQUENCE.indexOf(activeTab))).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: PLAN_TAB_SEQUENCE.indexOf(activeTab),
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [activeTab, animatedValue]);

  const translateX = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: PLAN_TAB_SEQUENCE.map((_, index) => index),
        outputRange: PLAN_TAB_SEQUENCE.map((_, index) => index * segmentWidth),
      }),
    [animatedValue, segmentWidth],
  );

  function handleLayout(event: LayoutChangeEvent) {
    setContainerWidth(event.nativeEvent.layout.width);
  }

  function handleSelect(tab: PlanTabKey) {
    if (tab === activeTab) return;
    if (onSelect) {
      onSelect(tab);
    } else {
      router.navigate(PLAN_NAV_ROUTES[tab] as never);
    }
  }

  return (
    <TabsWrapper>
      <TabsContainer onLayout={handleLayout}>
        {segmentWidth > 0 && (
          <Highlight
            style={{
              transform: [{ translateX }],
              width: segmentWidth,
            }}
          />
        )}
        {PLAN_TAB_SEQUENCE.map((tabKey) => {
          const label = TAB_LABELS[tabKey];
          const isActive = tabKey === activeTab;
          return (
            <TabButton
              key={tabKey}
              onPress={() => handleSelect(tabKey)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <TabLabel $active={isActive}>{label}</TabLabel>
            </TabButton>
          );
        })}
      </TabsContainer>
    </TabsWrapper>
  );
}

const TabsWrapper = styled(View)`
  padding: 12px 24px;
  background-color: transparent;
`;

const TabsContainer = styled(View)`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #e2e8f0;
  border-radius: 999px;
  padding: 6px;
  overflow: hidden;
`;

const Highlight = styled(Animated.View)`
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  border-radius: 999px;
  background-color: #ffffff;
  shadow-color: #94a3b8;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  shadow-offset: 0px 3px;
  elevation: 2;
`;

const TabButton = styled(Pressable)`
  flex: 1;
  padding-vertical: 8px;
  align-items: center;
  justify-content: center;
`;

const TabLabel = styled.Text<{ $active: boolean }>`
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  color: ${({ $active }) => ($active ? '#111827' : '#475569')};
`;

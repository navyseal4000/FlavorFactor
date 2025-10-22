import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

import { COACH_NAV_ROUTES, CoachTabKey } from '../constants';

interface CoachTopTabsProps {
  activeTab: CoachTabKey;
  onSelect?: (tab: CoachTabKey) => void;
}

const TAB_LABELS: Record<CoachTabKey, string> = {
  progress: 'Progress',
  chat: 'Chat',
};

const TAB_SEQUENCE: CoachTabKey[] = ['progress', 'chat'];

/**
 * Compact segmented control that lets coaches move between top-level routes.
 * Mirrors the Log feature's animated treatment so that the mental model stays
 * consistent across major sections of the app.
 */
export function CoachTopTabs({ activeTab, onSelect }: CoachTopTabsProps): ReactElement {
  const router = useRouter();
  const [containerWidth, setContainerWidth] = useState(0);
  const segmentWidth = containerWidth / TAB_SEQUENCE.length || 0;

  const animatedValue = useRef(new Animated.Value(TAB_SEQUENCE.indexOf(activeTab))).current;

  useEffect(() => {
    const targetIndex = TAB_SEQUENCE.indexOf(activeTab);
    Animated.timing(animatedValue, {
      toValue: targetIndex,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [activeTab, animatedValue]);

  const translateX = useMemo(() => {
    return animatedValue.interpolate({
      inputRange: TAB_SEQUENCE.map((_, index) => index),
      outputRange: TAB_SEQUENCE.map((_, index) => index * segmentWidth),
    });
  }, [animatedValue, segmentWidth]);

  function handleLayout(event: LayoutChangeEvent) {
    setContainerWidth(event.nativeEvent.layout.width);
  }

  function handleSelect(tab: CoachTabKey) {
    if (tab === activeTab) return;

    if (onSelect) {
      onSelect(tab);
    } else {
      router.replace(COACH_NAV_ROUTES[tab] as never);
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
        {TAB_SEQUENCE.map((tabKey) => {
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
  padding: 12px 24px 0 24px;
`;

const TabsContainer = styled(View)`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #eef2f7;
  border-radius: 999px;
  padding: 6px;
`;

const Highlight = styled(Animated.View)`
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  border-radius: 999px;
  background-color: #ffffff;
  shadow-color: #94a3b8;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  elevation: 1;
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
  color: ${({ $active }) => ($active ? '#111827' : '#6b7280')};
`;

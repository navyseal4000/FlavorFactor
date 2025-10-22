import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, View } from 'react-native';
import styled from 'styled-components/native';

import { HOME_CAROUSEL_DURATION_MS, HOME_TAB_KEYS, HOME_TAB_LABELS, HomeTabKey } from '../constants';
import { triggerHomeSelection } from '../haptics';

interface HomeTopTabsProps {
  activeTab: HomeTabKey;
  onSelect?: (tab: HomeTabKey) => void;
}

const TAB_SEQUENCE = HOME_TAB_KEYS;

export function HomeTopTabs({ activeTab, onSelect }: HomeTopTabsProps): ReactElement {
  const [containerWidth, setContainerWidth] = useState(0);
  const segmentWidth = containerWidth / TAB_SEQUENCE.length || 0;
  const animatedValue = useRef(new Animated.Value(TAB_SEQUENCE.indexOf(activeTab))).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: TAB_SEQUENCE.indexOf(activeTab),
      duration: HOME_CAROUSEL_DURATION_MS,
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

  function handleSelect(tab: HomeTabKey) {
    if (tab === activeTab) return;
    triggerHomeSelection();
    onSelect?.(tab);
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
          const label = HOME_TAB_LABELS[tabKey];
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
  padding: 8px 20px 16px;
`;

const TabsContainer = styled(View)`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #e2e8f0;
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
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 2;
`;

const TabButton = styled(Pressable)`
  flex: 1;
  padding-vertical: 10px;
  align-items: center;
  justify-content: center;
`;

const TabLabel = styled.Text<{ $active: boolean }>`
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  color: ${({ $active }) => ($active ? '#1f2937' : '#64748b')};
`;
export default HomeTopTabs;

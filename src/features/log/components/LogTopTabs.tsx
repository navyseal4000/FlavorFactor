import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

import { palette, textColors, withOpacity } from '../../../styles/palette';
import { LOG_NAV_ROUTES, LogTabKey } from '../constants';

interface LogTopTabsProps {
  activeTab: LogTabKey;
  onSelect?: (tab: LogTabKey) => void;
}

const TAB_LABELS: Record<LogTabKey, string> = {
  food: 'Food',
  weight: 'Weight',
  activity: 'Activity',
};

const TAB_SEQUENCE: LogTabKey[] = ['food', 'weight', 'activity'];

export function LogTopTabs({ activeTab, onSelect }: LogTopTabsProps): ReactElement {
  const router = useRouter();
  const [containerWidth, setContainerWidth] = useState(0);
  const segmentWidth = containerWidth / TAB_SEQUENCE.length || 0;

  const animatedValue = useRef(new Animated.Value(TAB_SEQUENCE.indexOf(activeTab))).current;

  useEffect(() => {
    const targetIndex = TAB_SEQUENCE.indexOf(activeTab);
    Animated.timing(animatedValue, {
      toValue: targetIndex,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [activeTab, animatedValue]);

  const translateX = useMemo(() => {
    return animatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, segmentWidth, segmentWidth * 2],
    });
  }, [animatedValue, segmentWidth]);

  function handleLayout(event: LayoutChangeEvent) {
    setContainerWidth(event.nativeEvent.layout.width);
  }

  function handleSelect(tab: LogTabKey) {
    if (tab === activeTab) return;

    if (onSelect) {
      onSelect(tab);
    } else {
      router.navigate(LOG_NAV_ROUTES[tab] as never);
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
  padding: 12px 24px;
  background-color: transparent;
`;

const TabsContainer = styled(View)`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${withOpacity(palette.brand.lime500, 0.12)};
  border-radius: 999px;
  padding: 6px;
`;

const Highlight = styled(Animated.View)`
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 6px;
  border-radius: 999px;
  background-color: ${palette.brand.lime500};
  shadow-color: ${withOpacity(palette.brand.lime500, 0.45)};
  shadow-opacity: 0.35;
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
  color: ${({ $active }) => ($active ? textColors.inverse : textColors.primary)};
`;


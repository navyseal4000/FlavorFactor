import React, { ReactElement, ReactNode, useEffect, useMemo, useRef } from 'react';
import { Animated, useWindowDimensions, View } from 'react-native';
import styled from 'styled-components/native';

import { PROFILE_ANIMATION_DURATION_MS } from '../constants';
import type { ProfileTabDescriptor } from '../types';

interface ProfileTabsCarouselProps {
  tabs: ProfileTabDescriptor[];
  activeTab: string;
  scenes: Record<string, ReactNode>;
}

/**
 * Animated carousel that mirrors the log feature implementation. Consumers can
 * pair this with {@link ProfileLayout} and {@link ProfileTabs} to provide a
 * smooth transition between profile sub-screens.
 */
export function ProfileTabsCarousel({
  tabs,
  activeTab,
  scenes,
}: ProfileTabsCarouselProps): ReactElement {
  const { width } = useWindowDimensions();
  const defaultIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.key === activeTab),
  );
  const animatedIndex = useRef(new Animated.Value(defaultIndex)).current;

  useEffect(() => {
    const nextIndex = Math.max(0, tabs.findIndex((tab) => tab.key === activeTab));
    Animated.timing(animatedIndex, {
      toValue: nextIndex,
      duration: PROFILE_ANIMATION_DURATION_MS,
      useNativeDriver: true,
    }).start();
  }, [activeTab, animatedIndex, tabs]);

  const translateX = useMemo(
    () =>
      animatedIndex.interpolate({
        inputRange: tabs.map((_, index) => index),
        outputRange: tabs.map((_, index) => -index * width),
      }),
    [animatedIndex, tabs, width],
  );

  return (
    <CarouselFrame>
      <AnimatedPages
        style={{
          width: width * tabs.length,
          transform: [{ translateX }],
        }}
      >
        {tabs.map((tab) => (
          <PageContainer key={tab.key} style={{ width }}>
            {scenes[tab.key] ?? null}
          </PageContainer>
        ))}
      </AnimatedPages>
    </CarouselFrame>
  );
}

const CarouselFrame = styled(View)`
  flex: 1;
  overflow: hidden;
`;

const AnimatedPages = styled(Animated.View)`
  flex-direction: row;
  height: 100%;
`;

const PageContainer = styled(View)`
  height: 100%;
`;

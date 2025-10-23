import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, useWindowDimensions, View } from 'react-native';
import styled from 'styled-components/native';

import { CarouselIndicators } from '../../../components/navigation/CarouselIndicators';
import { LogLayout } from '../components/LogLayout';
import { LogTabKey } from '../constants';
import { ActivityLogPage } from '../pages/ActivityLogPage';
import { FoodLogPage } from '../pages/FoodLogPage';
import { WeightLogPage } from '../pages/WeightLogPage';

const TAB_SEQUENCE: LogTabKey[] = ['food', 'weight', 'activity'];
const TAB_LABELS: Record<LogTabKey, string> = {
  food: 'Food',
  weight: 'Weight',
  activity: 'Activity',
};

interface LogTabsScreenProps {
  initialTab?: LogTabKey;
}

export function LogTabsScreen({ initialTab = 'food' }: LogTabsScreenProps): ReactElement {
  const normalizedInitial = TAB_SEQUENCE.includes(initialTab) ? initialTab : 'food';
  const [activeTab, setActiveTab] = useState<LogTabKey>(normalizedInitial);
  const { width } = useWindowDimensions();

  const animatedIndex = useRef(new Animated.Value(TAB_SEQUENCE.indexOf(normalizedInitial))).current;

  useEffect(() => {
    Animated.timing(animatedIndex, {
      toValue: TAB_SEQUENCE.indexOf(activeTab),
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [activeTab, animatedIndex]);

  const translateX = useMemo(
    () =>
      animatedIndex.interpolate({
        inputRange: TAB_SEQUENCE.map((_, index) => index),
        outputRange: TAB_SEQUENCE.map((_, index) => -index * width),
      }),
    [animatedIndex, width],
  );

  function handleSelect(tab: LogTabKey) {
    setActiveTab(tab);
  }

  const activeIndex = TAB_SEQUENCE.indexOf(activeTab);
  const indicatorLabels = TAB_SEQUENCE.map((tab) => TAB_LABELS[tab]);

  return (
    <LogLayout activeTab={activeTab} onSelectTab={handleSelect}>
      <CarouselFrame>
        <AnimatedPages
          style={{
            width: width * TAB_SEQUENCE.length,
            transform: [{ translateX }],
          }}
        >
          <PageContainer style={{ width }}>
            <FoodLogPage />
          </PageContainer>
          <PageContainer style={{ width }}>
            <WeightLogPage />
          </PageContainer>
          <PageContainer style={{ width }}>
            <ActivityLogPage />
          </PageContainer>
        </AnimatedPages>
      </CarouselFrame>
      <IndicatorsWrapper>
        <CarouselIndicators
          count={TAB_SEQUENCE.length}
          activeIndex={activeIndex}
          labels={indicatorLabels}
          onSelect={(index) => handleSelect(TAB_SEQUENCE[index])}
        />
      </IndicatorsWrapper>
    </LogLayout>
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

const IndicatorsWrapper = styled(View)`
  padding: 12px 0 20px;
`;

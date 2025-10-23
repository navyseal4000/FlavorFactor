import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, useWindowDimensions, View } from 'react-native';
import styled from 'styled-components/native';

import { CarouselIndicators } from '../../../components/navigation/CarouselIndicators';
import { PlanLayout } from '../components/PlanLayout';
import { PlanTabKey } from '../constants';
import { PLAN_TAB_LABELS } from '../components/PlanTopTabs';
import { CartReviewPage } from '../pages/CartReviewPage';
import { DailyPlanPage } from '../pages/DailyPlanPage';
import { PantryPage } from '../pages/PantryPage';
import { WeeklyPlanPage } from '../pages/WeeklyPlanPage';
import { PLAN_TAB_SEQUENCE, createTranslateOutputRange } from '../utils/carousel';

interface PlanTabsScreenProps {
  initialTab?: PlanTabKey;
}

/**
 * Animated screen used by all Plan routes. It mirrors the log carousel so the
 * horizontal slide takes one second regardless of the width.
 */
export function PlanTabsScreen({ initialTab = 'weekly' }: PlanTabsScreenProps): ReactElement {
  const normalizedInitial = PLAN_TAB_SEQUENCE.includes(initialTab) ? initialTab : 'weekly';
  const [activeTab, setActiveTab] = useState<PlanTabKey>(normalizedInitial);
  const { width } = useWindowDimensions();

  const animatedIndex = useRef(new Animated.Value(PLAN_TAB_SEQUENCE.indexOf(normalizedInitial))).current;

  useEffect(() => {
    Animated.timing(animatedIndex, {
      toValue: PLAN_TAB_SEQUENCE.indexOf(activeTab),
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [activeTab, animatedIndex]);

  const translateX = useMemo(
    () =>
      animatedIndex.interpolate({
        inputRange: PLAN_TAB_SEQUENCE.map((_, index) => index),
        outputRange: createTranslateOutputRange(width),
      }),
    [animatedIndex, width],
  );

  function handleSelect(tab: PlanTabKey) {
    setActiveTab(tab);
  }

  const activeIndex = PLAN_TAB_SEQUENCE.indexOf(activeTab);
  const indicatorLabels = PLAN_TAB_SEQUENCE.map((tab) => PLAN_TAB_LABELS[tab]);

  return (
    <PlanLayout activeTab={activeTab} onSelectTab={handleSelect}>
      <CarouselFrame>
        <AnimatedPages
          style={{
            width: width * PLAN_TAB_SEQUENCE.length,
            transform: [{ translateX }],
          }}
        >
          <PageContainer style={{ width }}>
            <WeeklyPlanPage />
          </PageContainer>
          <PageContainer style={{ width }}>
            <DailyPlanPage />
          </PageContainer>
          <PageContainer style={{ width }}>
            <PantryPage />
          </PageContainer>
          <PageContainer style={{ width }}>
            <CartReviewPage />
          </PageContainer>
        </AnimatedPages>
      </CarouselFrame>
      <IndicatorsWrapper>
        <CarouselIndicators
          count={PLAN_TAB_SEQUENCE.length}
          activeIndex={activeIndex}
          labels={indicatorLabels}
          onSelect={(index) => handleSelect(PLAN_TAB_SEQUENCE[index])}
        />
      </IndicatorsWrapper>
    </PlanLayout>
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
  padding: 10px 0 20px;
`;

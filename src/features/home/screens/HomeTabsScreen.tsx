import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, useWindowDimensions, View } from 'react-native';
import styled from 'styled-components/native';

import { CarouselIndicators } from '../../../components/navigation/CarouselIndicators';
import { HOME_CAROUSEL_DURATION_MS, HOME_TAB_KEYS, HOME_TAB_LABELS, HomeTabKey } from '../constants';
import { triggerHomeSelection } from '../haptics';
import { HomeLayout } from '../components/HomeLayout';
import { HomeDashboardPage } from '../pages/HomeDashboardPage';
import { HomeQuickActionsPage } from '../pages/HomeQuickActionsPage';
import { HomeInsightsPage } from '../pages/HomeInsightsPage';

interface HomeTabsScreenProps {
  initialTab?: HomeTabKey;
}

const TAB_SEQUENCE = HOME_TAB_KEYS;

export function HomeTabsScreen({ initialTab = 'dashboard' }: HomeTabsScreenProps): ReactElement {
  const normalizedInitial = TAB_SEQUENCE.includes(initialTab) ? initialTab : 'dashboard';
  const [activeTab, setActiveTab] = useState<HomeTabKey>(normalizedInitial);
  const { width } = useWindowDimensions();
  const animatedIndex = useRef(new Animated.Value(TAB_SEQUENCE.indexOf(normalizedInitial))).current;

  useEffect(() => {
    Animated.timing(animatedIndex, {
      toValue: TAB_SEQUENCE.indexOf(activeTab),
      duration: HOME_CAROUSEL_DURATION_MS,
      useNativeDriver: true,
    }).start();
  }, [activeTab, animatedIndex]);

  const translateX = useMemo(() => {
    return animatedIndex.interpolate({
      inputRange: TAB_SEQUENCE.map((_, index) => index),
      outputRange: TAB_SEQUENCE.map((_, index) => -index * width),
    });
  }, [animatedIndex, width]);

  function handleSelect(tab: HomeTabKey) {
    triggerHomeSelection();
    setActiveTab(tab);
  }

  const activeIndex = TAB_SEQUENCE.indexOf(activeTab);
  const indicatorLabels = TAB_SEQUENCE.map((tab) => HOME_TAB_LABELS[tab]);

  return (
    <HomeLayout activeTab={activeTab} onSelectTab={handleSelect}>
      <CarouselFrame>
        <AnimatedPages
          style={{
            width: width * TAB_SEQUENCE.length,
            transform: [{ translateX }],
          }}
        >
          <PageContainer style={{ width }}>
            <HomeDashboardPage />
          </PageContainer>
          <PageContainer style={{ width }}>
            <HomeQuickActionsPage />
          </PageContainer>
          <PageContainer style={{ width }}>
            <HomeInsightsPage />
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
    </HomeLayout>
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

export default HomeTabsScreen;

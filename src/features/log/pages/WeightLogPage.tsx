import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Image, ScrollView, View, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { SegmentedControl } from '../components/SegmentedControl';
import { WeightTrendChart } from '../components/WeightTrendChart';
import { LOG_PRIMARY_COLOR } from '../constants';
import { weightSummaries } from '../mockData';

type TrendVariant = '7d' | '30d' | '365d';

const OPTIONS = [
  { value: '7d' as const, label: 'Last 7 Days' },
  { value: '30d' as const, label: 'Last Month' },
  { value: '365d' as const, label: 'Last Year' },
];

const FOOTER_LABELS: Record<TrendVariant, string[]> = {
  '7d': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  '30d': ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  '365d': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const RELOADING_GIF =
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHR6emc5aWI2cXRvYXlteWlxdnY3bm12d3E5bW9uYXY3M21rN2pjdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oEjI6SIIHBdRxXI40/giphy.gif';
const SECTION_HORIZONTAL_PADDING = 16;
const CARD_HORIZONTAL_PADDING = 16;
const PAGE_GAP = 20;
const CLAMP_PADDING = 12;

export function WeightLogPage(): ReactElement {
  const [timeframe, setTimeframe] = useState<TrendVariant>('7d');
  const [isSyncing, setIsSyncing] = useState(false);
  const animatedIndex = useRef(new Animated.Value(OPTIONS.findIndex((o) => o.value === timeframe))).current;
  const syncTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { width } = useWindowDimensions();
  const [measuredWidth, setMeasuredWidth] = useState<number>(0);
  const fallbackWidth = useMemo(
    () =>
      Math.max(width - SECTION_HORIZONTAL_PADDING * 2 - CARD_HORIZONTAL_PADDING * 2, 1),
    [width],
  );
  const stepWidth = measuredWidth > 0 ? measuredWidth : fallbackWidth;
  const pageWidth = Math.max(stepWidth - PAGE_GAP, 1);

  useEffect(() => {
    return () => {
      if (syncTimeout.current) {
        clearTimeout(syncTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    Animated.timing(animatedIndex, {
      toValue: OPTIONS.findIndex((option) => option.value === timeframe),
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [animatedIndex, timeframe]);

  function handleSync() {
    if (isSyncing) return;
    setIsSyncing(true);
    syncTimeout.current = setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  }

  const translateX = useMemo(
    () =>
      animatedIndex.interpolate({
        inputRange: OPTIONS.map((_, index) => index),
        outputRange: OPTIONS.map((_, index) => -index * stepWidth),
      }),
    [animatedIndex, stepWidth],
  );

  function handleTimeframeChange(value: TrendVariant) {
    setTimeframe(value);
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
      <Section>
        <SectionTitle>Log Your Weight</SectionTitle>
        <InputCard>
          <WeightInput placeholder="0.0" keyboardType="decimal-pad" />
          <WeightSuffix>lbs</WeightSuffix>
        </InputCard>
        <NotesInput
          placeholder='Add a note (e.g., "Feeling great!")'
          multiline
          numberOfLines={3}
        />
        <PrimaryButton>
          <PrimaryButtonLabel>Save Log</PrimaryButtonLabel>
        </PrimaryButton>
      </Section>

      <Section>
        <HistoryHeader>
          <SectionTitle>History</SectionTitle>
          <SyncButton onPress={handleSync} disabled={isSyncing}>
            <MaterialIcons name="sync" size={18} color="#4b5563" />
            <SyncLabel>{isSyncing ? 'Syncing...' : 'Sync with Scale'}</SyncLabel>
          </SyncButton>
        </HistoryHeader>
        <SegmentedControl
          options={OPTIONS}
          value={timeframe}
          onChange={handleTimeframeChange}
        />

        <HistoryCard
          onLayout={(event) => {
            const { width: layoutWidth } = event.nativeEvent.layout;
            const innerWidth = Math.max(layoutWidth - CARD_HORIZONTAL_PADDING * 2, 1);
            if (Math.abs(innerWidth - measuredWidth) > 0.5) {
              setMeasuredWidth(innerWidth);
            }
          }}
        >
          <CardInner>
            <AnimatedPages
              style={{
                width: stepWidth * OPTIONS.length,
                transform: [{ translateX }],
              }}
            >
              {OPTIONS.map((option) => {
                const data = weightSummaries[option.value];
                const labels = FOOTER_LABELS[option.value];
                const isActive = option.value === timeframe;
                return (
                  <PageContainer
                    key={option.value}
                    style={{ width: pageWidth }}
                  >
                    <ChartClamp>
                      <ChartInner>
                    <SummaryRow>
                      <WeightValue>
                        {data.weight.toFixed(1)} <WeightUnit>{data.unit}</WeightUnit>
                      </WeightValue>
                      <Trend>
                        <MaterialIcons
                          name={data.deltaDirection === 'down' ? 'trending-down' : 'trending-up'}
                          size={20}
                          color="#dc2626"
                        />
                        <TrendValue>{Math.abs(data.delta).toFixed(1)} lbs</TrendValue>
                      </Trend>
                    </SummaryRow>
                    <ComparisonLabel>{data.comparisonLabel}</ComparisonLabel>
                    <ChartContainer>
                      {isActive && isSyncing ? (
                        <ReloadingImage
                          source={{ uri: RELOADING_GIF }}
                          resizeMode="contain"
                        />
                      ) : (
                        <WeightTrendChart variant={data.chartVariant} />
                      )}
                    </ChartContainer>
                    <FooterRow>
                      {labels.map((label, index) => (
                        <FooterLabel
                          key={`${option.value}-${label}`}
                          $highlight={
                            option.value === '7d'
                              ? index === 5
                              : option.value === '30d'
                                ? index === 0
                                : label === 'Dec'
                          }
                        >
                          {label}
                        </FooterLabel>
                      ))}
                    </FooterRow>
                    </ChartInner>
                  </ChartClamp>
                  </PageContainer>
                );
              })}
            </AnimatedPages>
          </CardInner>
        </HistoryCard>
      </Section>
    </ScrollView>
  );
}

const Section = styled(View)`
  padding: 20px 16px 0 16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const InputCard = styled(View)`
  margin-top: 20px;
  position: relative;
`;

const WeightInput = styled.TextInput`
  font-size: 48px;
  font-weight: 700;
  color: #111827;
  text-align: center;
  padding: 12px;
  border-bottom-width: 2px;
  border-color: #e5e7eb;
`;

const WeightSuffix = styled.Text`
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 18px;
  color: #6b7280;
  font-weight: 600;
`;

const NotesInput = styled.TextInput`
  margin-top: 16px;
  border-width: 1px;
  border-color: #e5e7eb;
  border-radius: 16px;
  padding: 12px 16px;
  background-color: #f3f4f6;
  font-size: 14px;
  color: #1f2937;
  text-align-vertical: top;
`;

const PrimaryButton = styled.Pressable`
  margin-top: 16px;
  background-color: ${LOG_PRIMARY_COLOR};
  border-radius: 999px;
  padding-vertical: 14px;
  align-items: center;
`;

const PrimaryButtonLabel = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

const HistoryHeader = styled(View)`
  margin-top: 24px;
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SyncButton = styled.Pressable<{ disabled?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const SyncLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #4b5563;
`;

const HistoryCard = styled(View)`
  margin-top: 16px;
  background-color: #ffffff;
  border-radius: 20px;
  shadow-color: #0f172a;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 2;
  overflow: hidden;
`;

const CardInner = styled(View)`
  padding: 20px ${CARD_HORIZONTAL_PADDING}px 12px ${CARD_HORIZONTAL_PADDING}px;
`;

const SummaryRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WeightValue = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
`;

const WeightUnit = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #6b7280;
`;

const Trend = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const TrendValue = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #dc2626;
`;

const ComparisonLabel = styled.Text`
  margin-top: 4px;
  font-size: 13px;
  color: #6b7280;
`;

const ChartContainer = styled(View)`
  width: 100%;
  height: 200px;
  margin-top: 12px;
  justify-content: center;
`;

const FooterRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 1px;
  border-color: #f3f4f6;
  padding-top: 12px;
  margin-top: 12px;
`;

const FooterLabel = styled.Text<{ $highlight: boolean }>`
  font-size: 11px;
  color: ${({ $highlight }) => ($highlight ? '#111827' : '#6b7280')};
  font-weight: ${({ $highlight }) => ($highlight ? '700' : '600')};
`;

const ReloadingImage = styled(Image)`
  width: 160px;
  height: 120px;
`;

const AnimatedPages = styled(Animated.View)`
  flex-direction: row;
`;

const PageContainer = styled(View)`
  padding-bottom: 8px;
  margin-horizontal: ${PAGE_GAP / 2}px;
`;

const ChartClamp = styled(View)`
  padding-left: ${CLAMP_PADDING}px;
  padding-right: ${CLAMP_PADDING}px;
`;

const ChartInner = styled(View)`
  border-radius: 20px;
  overflow: hidden;
  background-color: #ffffff;
`;

import { ReactElement, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { LogLayout } from '../../src/features/log/components/LogLayout';
import { SegmentedControl } from '../../src/features/log/components/SegmentedControl';
import { WeightTrendChart } from '../../src/features/log/components/WeightTrendChart';
import { LOG_PRIMARY_COLOR } from '../../src/features/log/constants';
import { weightSummaries } from '../../src/features/log/mockData';

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

export default function WeightTrendScreen(): ReactElement {
  const [timeframe, setTimeframe] = useState<TrendVariant>('7d');
  const summary = weightSummaries[timeframe];

  return (
    <LogLayout activeTab="weight">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Section>
          <SectionTitle>Log Your Weight</SectionTitle>
          <InputCard>
            <WeightInput placeholder="0.0" keyboardType="decimal-pad" />
            <WeightSuffix>lbs</WeightSuffix>
          </InputCard>
          <NotesInput placeholder='Add a note (e.g., "Feeling great!")' multiline numberOfLines={3} />
          <PrimaryButton>
            <PrimaryButtonLabel>Save Log</PrimaryButtonLabel>
          </PrimaryButton>
        </Section>

        <Section>
          <HistoryHeader>
            <SectionTitle>History</SectionTitle>
            <SyncButton>
              <MaterialIcons name="sync" size={18} color='#4b5563' />
              <SyncLabel>Sync with Scale</SyncLabel>
            </SyncButton>
          </HistoryHeader>
          <SegmentedControl options={OPTIONS} value={timeframe} onChange={setTimeframe} />

          <HistoryCard>
            <SummaryRow>
              <WeightValue>
                {summary.weight.toFixed(1)} <WeightUnit>{summary.unit}</WeightUnit>
              </WeightValue>
              <Trend>
                <MaterialIcons
                  name={summary.deltaDirection === 'down' ? 'trending-down' : 'trending-up'}
                  size={20}
                  color='#dc2626'
                />
                <TrendValue>{Math.abs(summary.delta).toFixed(1)} lbs</TrendValue>
              </Trend>
            </SummaryRow>
            <ComparisonLabel>{summary.comparisonLabel}</ComparisonLabel>
            <ChartContainer>
              <WeightTrendChart variant={summary.chartVariant} />
            </ChartContainer>
            <FooterRow>
              {FOOTER_LABELS[timeframe].map((label, index) => (
                <FooterLabel key={label} $highlight={timeframe === '7d' ? index === 5 : timeframe === '30d' ? index === 0 : label === 'Dec'}>
                  {label}
                </FooterLabel>
              ))}
            </FooterRow>
          </HistoryCard>
        </Section>
      </ScrollView>
    </LogLayout>
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

const SyncButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 6px;
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
  padding: 20px 16px 12px 16px;
  shadow-color: #0f172a;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 2;
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
  height: 200px;
  margin-top: 12px;
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





import { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { insightTrends, macroBreakdown } from '../mockData';

export function HomeInsightsPage(): ReactElement {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
      <Section>
        <SectionHeader>
          <SectionTitle>Progress Metrics</SectionTitle>
          <SectionSubtext>Aggregated from the past two weeks</SectionSubtext>
        </SectionHeader>
        <MetricsGrid>
          {insightTrends.map((insight) => (
            <MetricCard key={insight.id}>
              <MetricHeader>
                <MetricTitle>{insight.title}</MetricTitle>
                <TrendBadge $direction={insight.trendDirection}>
                  <TrendIcon>
                    <MaterialIcons
                      name={
                        insight.trendDirection === 'down'
                          ? 'arrow-downward'
                          : insight.trendDirection === 'up'
                          ? 'arrow-upward'
                          : 'remove'
                      }
                      size={14}
                      color={insight.trendDirection === 'down' ? '#ef4444' : '#0f172a'}
                    />
                  </TrendIcon>
                  <TrendLabel>{insight.trendLabel}</TrendLabel>
                </TrendBadge>
              </MetricHeader>
              <MetricValue>{insight.value}</MetricValue>
              <MetricDescription>{insight.description}</MetricDescription>
            </MetricCard>
          ))}
        </MetricsGrid>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Macro Trajectory</SectionTitle>
          <SectionSubtext>Rolling three-day average</SectionSubtext>
        </SectionHeader>
        <ChartCard>
          {macroBreakdown.map((macro) => (
            <ChartRow key={macro.id}>
              <ChartLabel>{macro.label}</ChartLabel>
              <BarTrack>
                <BarFill style={{ width: `${Math.min(1, macro.grams / macro.target) * 100}%` }} />
              </BarTrack>
              <ChartValue>{macro.grams}g</ChartValue>
            </ChartRow>
          ))}
          <ChartFootnote>
            Targets adjust dynamically based on yesterday&apos;s energy expenditure.
          </ChartFootnote>
        </ChartCard>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Weekly Highlights</SectionTitle>
          <SectionSubtext>Automatic saves from coach reviews</SectionSubtext>
        </SectionHeader>
        <HighlightsCard>
          <HighlightRow>
            <MaterialIcons name="emoji-events" size={18} color="#f59e0b" />
            <HighlightLabel>Best adherence week since August</HighlightLabel>
          </HighlightRow>
          <HighlightRow>
            <MaterialIcons name="self-improvement" size={18} color="#0ea5e9" />
            <HighlightLabel>Recovery score averaged 86%</HighlightLabel>
          </HighlightRow>
          <HighlightRow>
            <MaterialIcons name="restaurant-menu" size={18} color="#22c55e" />
            <HighlightLabel>Fiber intake hit goal 5 of 7 days</HighlightLabel>
          </HighlightRow>
        </HighlightsCard>
      </Section>
    </ScrollView>
  );
}

const Section = styled(View)`
  padding: 20px 20px 0;
  gap: 18px;
`;

const SectionHeader = styled(View)`
  gap: 4px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
`;

const SectionSubtext = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
`;

const MetricsGrid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: space-between;
`;

const MetricCard = styled(View)`
  width: 48%;
  border-radius: 18px;
  background-color: #ffffff;
  padding: 16px;
  gap: 10px;
  shadow-color: #0f172a;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 1;
  overflow: hidden;
`;

const MetricHeader = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
`;

const MetricTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  width: 100%;
`;

const MetricValue = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #111827;
`;

const MetricDescription = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #475569;
  line-height: 18px;
`;

const TrendBadge = styled(View)<{ $direction: 'up' | 'down' | 'neutral' }>`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  border-radius: 999px;
  padding: 4px 8px;
  flex-shrink: 0;
  margin-top: 2px;
  background-color: ${({ $direction }) => {
    if ($direction === 'down') return '#fee2e2';
    if ($direction === 'up') return '#dcfce7';
    return '#e2e8f0';
  }};
`;

const TrendIcon = styled(View)`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

const TrendLabel = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: #1f2937;
`;

const ChartCard = styled(View)`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  gap: 16px;
  shadow-color: #0f172a;
  shadow-opacity: 0.05;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 1;
`;

const ChartRow = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const ChartLabel = styled.Text`
  width: 72px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
`;

const BarTrack = styled(View)`
  flex: 1;
  height: 10px;
  border-radius: 999px;
  background-color: #f1f5f9;
  overflow: hidden;
`;

const BarFill = styled(View)`
  height: 10px;
  border-radius: 999px;
  background-color: #60a5fa;
`;

const ChartValue = styled.Text`
  width: 44px;
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  text-align: right;
`;

const ChartFootnote = styled.Text`
  font-size: 11px;
  font-weight: 500;
  color: #94a3b8;
  line-height: 16px;
`;

const HighlightsCard = styled(View)`
  background-color: #ffffff;
  border-radius: 18px;
  padding: 18px;
  gap: 12px;
  shadow-color: #0f172a;
  shadow-opacity: 0.05;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 1;
`;

const HighlightRow = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const HighlightLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
`;
export default HomeInsightsPage;

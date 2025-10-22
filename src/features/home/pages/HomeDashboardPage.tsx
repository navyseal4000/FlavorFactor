import { ReactElement } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { HOME_PRIMARY_COLOR } from '../constants';
import { coachPrompts, homeHighlights, macroBreakdown, upcomingEvents } from '../mockData';

export function HomeDashboardPage(): ReactElement {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
      <Section>
        <SectionHeader>
          <SectionTitle>Today&apos;s Snapshot</SectionTitle>
          <PillButton>
            <PillLabel>Sync wearables</PillLabel>
          </PillButton>
        </SectionHeader>
        <HighlightRow horizontal showsHorizontalScrollIndicator={false}>
          {homeHighlights.map((highlight) => (
            <HighlightCard key={highlight.id}>
              <HighlightIcon style={{ backgroundColor: highlight.iconBackground }}>
                <MaterialIcons name={highlight.icon} size={20} color={highlight.iconTint} />
              </HighlightIcon>
              <HighlightLabel>{highlight.label}</HighlightLabel>
              <HighlightValue>{highlight.value}</HighlightValue>
              <HighlightDelta $direction={highlight.deltaDirection}>
                {highlight.deltaLabel}
              </HighlightDelta>
            </HighlightCard>
          ))}
        </HighlightRow>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Macro Balance</SectionTitle>
          <SectionSubtext>Based on today&apos;s intake</SectionSubtext>
        </SectionHeader>
        <Card>
          {macroBreakdown.map((macro, index) => {
            const progress = Math.min(macro.grams / macro.target, 1);
            return (
              <MacroRow key={macro.id} $hasDivider={index < macroBreakdown.length - 1}>
                <MacroInfo>
                  <MacroLabel>{macro.label}</MacroLabel>
                  <MacroMeta>
                    {macro.grams} g / {macro.target} g goal
                  </MacroMeta>
                </MacroInfo>
                <ProgressTrack>
                  <ProgressFill style={{ width: `${progress * 100}%`, backgroundColor: macro.color }} />
                </ProgressTrack>
              </MacroRow>
            );
          })}
        </Card>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Upcoming</SectionTitle>
        </SectionHeader>
        <Card>
          {upcomingEvents.map((event, index) => (
            <EventRow key={event.id} $hasDivider={index < upcomingEvents.length - 1}>
              <EventIcon style={{ backgroundColor: event.accentColor }}>
                <MaterialIcons name={event.icon} size={20} color="#ffffff" />
              </EventIcon>
              <EventContent>
                <EventTitle>{event.title}</EventTitle>
                <EventDetails>{event.details}</EventDetails>
              </EventContent>
              <EventTime>{event.timeLabel}</EventTime>
            </EventRow>
          ))}
        </Card>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Coach Feed</SectionTitle>
          <SectionSubtext>Stay ahead with personal tips</SectionSubtext>
        </SectionHeader>
        {coachPrompts.map((prompt) => (
          <CoachCard key={prompt.id}>
            <CoachHeader>
              <CoachTitle>{prompt.title}</CoachTitle>
              <CoachTimestamp>{prompt.timestamp}</CoachTimestamp>
            </CoachHeader>
            <CoachSummary>{prompt.summary}</CoachSummary>
            <CoachAction>
              <CoachActionLabel>{prompt.actionLabel}</CoachActionLabel>
              <MaterialIcons name="arrow-forward" size={18} color="#1d4ed8" />
            </CoachAction>
          </CoachCard>
        ))}
      </Section>
    </ScrollView>
  );
}

const Section = styled(View)`
  padding: 20px 20px 0;
  gap: 16px;
`;

const SectionHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
`;

const SectionSubtext = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
`;

const PillButton = styled(Pressable)`
  padding: 8px 12px;
  border-radius: 999px;
  background-color: ${HOME_PRIMARY_COLOR};
`;

const PillLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #0f172a;
`;

const HighlightRow = styled(ScrollView)`
  flex-grow: 0;
`;

const HighlightCard = styled(View)`
  width: 220px;
  border-radius: 20px;
  background-color: #ffffff;
  padding: 18px;
  margin-right: 12px;
  shadow-color: #0f172a;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 2;
  gap: 10px;
`;

const HighlightIcon = styled(View)`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
`;

const HighlightLabel = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
`;

const HighlightValue = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
`;

const HighlightDelta = styled.Text<{ $direction: 'up' | 'down' | 'neutral' }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ $direction }) => {
    if ($direction === 'up') return '#16a34a';
    if ($direction === 'down') return '#dc2626';
    return '#1f2937';
  }};
`;

const Card = styled(View)`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  shadow-color: #0f172a;
  shadow-opacity: 0.05;
  shadow-radius: 10px;
  shadow-offset: 0px 6px;
  elevation: 1;
  gap: 20px;
`;

const MacroRow = styled(View)<{ $hasDivider: boolean }>`
  gap: 12px;
  padding-bottom: ${({ $hasDivider }) => ($hasDivider ? 16 : 0)}px;
  border-bottom-width: ${({ $hasDivider }) => ($hasDivider ? 1 : 0)}px;
  border-color: #e2e8f0;
`;

const MacroInfo = styled(View)`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;

const MacroLabel = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
`;

const MacroMeta = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #94a3b8;
`;

const ProgressTrack = styled(View)`
  height: 8px;
  border-radius: 999px;
  background-color: #f1f5f9;
  overflow: hidden;
`;

const ProgressFill = styled(View)`
  height: 100%;
  border-radius: 999px;
`;

const EventRow = styled(View)<{ $hasDivider: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding-bottom: ${({ $hasDivider }) => ($hasDivider ? 16 : 0)}px;
  margin-bottom: ${({ $hasDivider }) => ($hasDivider ? 16 : 0)}px;
  border-bottom-width: ${({ $hasDivider }) => ($hasDivider ? 1 : 0)}px;
  border-color: #e2e8f0;
`;

const EventIcon = styled(View)`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
`;

const EventContent = styled(View)`
  flex: 1;
  gap: 6px;
`;

const EventTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
`;

const EventDetails = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
`;

const EventTime = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #1d4ed8;
`;

const CoachCard = styled(View)`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 18px;
  shadow-color: #0f172a;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  shadow-offset: 0px 4px;
  elevation: 1;
  gap: 12px;
  margin-bottom: 16px;
`;

const CoachHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CoachTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
`;

const CoachTimestamp = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #94a3b8;
`;

const CoachSummary = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  line-height: 20px;
`;

const CoachAction = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const CoachActionLabel = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #1d4ed8;
`;
export default HomeDashboardPage;

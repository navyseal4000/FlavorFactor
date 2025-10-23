import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import styled from 'styled-components/native';

import { CarouselIndicators } from '../../../components/navigation/CarouselIndicators';
import {
  coachActionItems,
  coachFocusAreas,
  coachHighlights,
  coachMembers,
} from '../mockData';

const SECTION_SEQUENCE = ['overview', 'members'] as const;
type SectionKey = (typeof SECTION_SEQUENCE)[number];

const SECTION_LABELS: Record<SectionKey, string> = {
  overview: 'Insights',
  members: 'Members',
};

/**
 * The progress page adapts the Log carousel pattern so coaches can jump between
 * high-level insights and actionable member lists without leaving the route.
 */
export function CoachProgressPage(): ReactElement {
  const [activeSection, setActiveSection] = useState<SectionKey>('overview');
  const { width } = useWindowDimensions();
  const animatedIndex = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedIndex, {
      toValue: SECTION_SEQUENCE.indexOf(activeSection),
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [activeSection, animatedIndex]);

  const translateX = useMemo(
    () =>
      animatedIndex.interpolate({
        inputRange: SECTION_SEQUENCE.map((_, index) => index),
        outputRange: SECTION_SEQUENCE.map((_, index) => -index * width),
      }),
    [animatedIndex, width],
  );

  function handleSelect(section: SectionKey) {
    if (section !== activeSection) {
      setActiveSection(section);
    }
  }

  const activeIndex = SECTION_SEQUENCE.indexOf(activeSection);
  const indicatorLabels = SECTION_SEQUENCE.map((section) => SECTION_LABELS[section]);

  return (
    <Container>
      <SectionTabs>
        {SECTION_SEQUENCE.map((sectionKey) => {
          const isActive = sectionKey === activeSection;
          return (
            <SectionTab
              key={sectionKey}
              onPress={() => handleSelect(sectionKey)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${SECTION_LABELS[sectionKey]} section`}
            >
              <SectionTabLabel $active={isActive}>
                {SECTION_LABELS[sectionKey]}
              </SectionTabLabel>
            </SectionTab>
          );
        })}
      </SectionTabs>
      <CarouselFrame>
        <AnimatedPages
          style={{
            width: width * SECTION_SEQUENCE.length,
            transform: [{ translateX }],
          }}
        >
          <PageContainer style={{ width }}>
            <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
              <HighlightsGrid>
                {coachHighlights.map((highlight) => (
                  <HighlightCard key={highlight.id}>
                    <HighlightLabel>{highlight.label}</HighlightLabel>
                    <HighlightValue>{highlight.value}</HighlightValue>
                    <HighlightTrend $direction={highlight.trendDirection}>
                      {highlight.trendDirection === 'up' ? '▲' : '▼'} {highlight.trendLabel}
                    </HighlightTrend>
                    <HighlightDescription>{highlight.description}</HighlightDescription>
                  </HighlightCard>
                ))}
              </HighlightsGrid>
              <SectionHeading>Focus areas</SectionHeading>
              <CardStack>
                {coachFocusAreas.map((focus) => (
                  <FocusCard key={focus.id}>
                    <FocusHeader>
                      <FocusTitle>{focus.title}</FocusTitle>
                      <FocusOwner>{focus.owner}</FocusOwner>
                    </FocusHeader>
                    <FocusSummary>{focus.summary}</FocusSummary>
                    <ProgressBar>
                      <ProgressFill style={{ width: `${focus.completionPercent}%` }} />
                    </ProgressBar>
                    <ProgressLabel>{focus.completionPercent}% complete</ProgressLabel>
                  </FocusCard>
                ))}
              </CardStack>
              <SectionHeading>Action items</SectionHeading>
              <CardStack>
                {coachActionItems.map((action) => (
                  <ActionCard key={action.id}>
                    <ActionTitle>{action.title}</ActionTitle>
                    <ActionDue>{action.scheduledFor}</ActionDue>
                    <ActionDescription>{action.description}</ActionDescription>
                  </ActionCard>
                ))}
              </CardStack>
            </ScrollView>
          </PageContainer>
          <PageContainer style={{ width }}>
            <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
              {coachMembers.map((member) => (
                <MemberCard key={member.id}>
                  <MemberHeader>
                    <MemberName>{member.name}</MemberName>
                    <StatusPill $status={member.status}>
                      <StatusPillLabel $status={member.status}>
                        {member.status === 'on-track' ? 'On track' : 'Needs attention'}
                      </StatusPillLabel>
                    </StatusPill>
                  </MemberHeader>
                  <MemberGoal>{member.goal}</MemberGoal>
                  <MemberMeta>{member.lastCheckIn}</MemberMeta>
                  <ProgressBar>
                    <ProgressFill style={{ width: `${member.adherencePercent}%` }} />
                  </ProgressBar>
                  <ProgressLabel>{member.adherencePercent}% plan adherence</ProgressLabel>
                  <MessagePreview>{member.messagePreview}</MessagePreview>
                </MemberCard>
              ))}
            </ScrollView>
          </PageContainer>
        </AnimatedPages>
      </CarouselFrame>
      <IndicatorsWrapper>
        <CarouselIndicators
          count={SECTION_SEQUENCE.length}
          activeIndex={activeIndex}
          labels={indicatorLabels}
          onSelect={(index) => handleSelect(SECTION_SEQUENCE[index])}
        />
      </IndicatorsWrapper>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
`;

const SectionTabs = styled(View)`
  flex-direction: row;
  padding: 12px 20px 0 20px;
  gap: 12px;
`;

const SectionTab = styled(Pressable)`
  flex: 1;
  padding: 10px 12px;
  border-radius: 12px;
  background-color: #e5e7eb;
  align-items: center;
`;

const SectionTabLabel = styled.Text<{ $active: boolean }>`
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  color: ${({ $active }) => ($active ? '#111827' : '#6b7280')};
`;

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

const HighlightsGrid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const HighlightCard = styled(View)`
  flex-basis: 48%;
  padding: 16px;
  border-radius: 16px;
  background-color: #ffffff;
  shadow-color: #94a3b8;
  shadow-opacity: 0.12;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
  elevation: 1;
  gap: 4px;
`;

const HighlightLabel = styled.Text`
  font-size: 13px;
  color: #6b7280;
`;

const HighlightValue = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #111827;
`;

const HighlightTrend = styled.Text<{ $direction: 'up' | 'down' }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ $direction }) => ($direction === 'up' ? '#16a34a' : '#dc2626')};
`;

const HighlightDescription = styled.Text`
  font-size: 12px;
  color: #4b5563;
`;

const SectionHeading = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

const CardStack = styled(View)`
  gap: 12px;
`;

const FocusCard = styled(View)`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 16px;
  gap: 8px;
`;

const FocusHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FocusTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

const FocusOwner = styled.Text`
  font-size: 12px;
  color: #6b7280;
`;

const FocusSummary = styled.Text`
  font-size: 13px;
  color: #4b5563;
`;

const ProgressBar = styled(View)`
  height: 8px;
  border-radius: 999px;
  background-color: #e5e7eb;
  overflow: hidden;
`;

const ProgressFill = styled(Animated.View)`
  height: 100%;
  background-color: #a4ec13;
`;

const ProgressLabel = styled.Text`
  font-size: 12px;
  color: #4b5563;
`;

const ActionCard = styled(View)`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 16px;
  gap: 6px;
`;

const ActionTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
`;

const ActionDue = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #2563eb;
`;

const ActionDescription = styled.Text`
  font-size: 13px;
  color: #4b5563;
`;

const MemberCard = styled(View)`
  background-color: #ffffff;
  padding: 18px;
  border-radius: 16px;
  gap: 8px;
  shadow-color: #94a3b8;
  shadow-opacity: 0.12;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
  elevation: 1;
`;

const MemberHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MemberName = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

const StatusPill = styled(View)<{ $status: 'on-track' | 'at-risk' }>`
  padding: 4px 10px;
  border-radius: 999px;
  background-color: ${({ $status }) => ($status === 'on-track' ? '#dcfce7' : '#fee2e2')};
`;

const StatusPillLabel = styled.Text<{ $status: 'on-track' | 'at-risk' }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ $status }) => ($status === 'on-track' ? '#166534' : '#991b1b')};
`;

const MemberGoal = styled.Text`
  font-size: 13px;
  color: #4b5563;
`;

const MemberMeta = styled.Text`
  font-size: 12px;
  color: #6b7280;
`;

const MessagePreview = styled.Text`
  font-size: 13px;
  color: #4b5563;
`;

import { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';

import { weeklyMealPlan } from '../mockData';

/**
 * Displays the high-level week view of planned meals.
 */
export function WeeklyPlanPage(): ReactElement {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
      <IntroSection>
        <IntroHeading>This Week&apos;s Overview</IntroHeading>
        <IntroSubheading>
          A snapshot of the meals queued for the upcoming week. Tap a day to
          review recipes and prep guidance.
        </IntroSubheading>
      </IntroSection>
      {weeklyMealPlan.map((day) => (
        <DayCard key={day.id}>
          <DayHeader>
            <DayLabel>{day.label}</DayLabel>
            <DayMeta>{day.entries.length} meals planned</DayMeta>
          </DayHeader>
          {day.entries.map((entry, index) => (
            <MealRow key={entry.id} $hasDivider={index < day.entries.length - 1}>
              <MealName>{entry.meal}</MealName>
              <MealDetail>
                {entry.recipeCount} recipe{entry.recipeCount > 1 ? 's' : ''} · {entry.primaryIngredient}
              </MealDetail>
            </MealRow>
          ))}
        </DayCard>
      ))}
    </ScrollView>
  );
}

const IntroSection = styled(View)`
  padding: 24px 16px 8px 16px;
`;

const IntroHeading = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #111827;
`;

const IntroSubheading = styled.Text`
  font-size: 14px;
  color: #4b5563;
  margin-top: 8px;
  line-height: 20px;
`;

const DayCard = styled(View)`
  background-color: #ffffff;
  margin: 12px 16px 0 16px;
  border-radius: 20px;
  padding: 16px;
  shadow-color: #0f172a;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 2;
`;

const DayHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const DayLabel = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const DayMeta = styled.Text`
  font-size: 13px;
  color: #6b7280;
`;

const MealRow = styled(View)<{ $hasDivider: boolean }>`
  padding-vertical: 12px;
  border-top-width: ${({ $hasDivider }) => ($hasDivider ? 1 : 0)}px;
  border-color: #f3f4f6;
`;

const MealName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const MealDetail = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;

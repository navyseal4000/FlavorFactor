import { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';

import { PLAN_ACCENT_TINT, PLAN_PRIMARY_COLOR } from '../constants';
import { weeklyMealPlan } from '../mockData';

/**
 * Displays the high-level week view of planned meals.
 */
export function WeeklyPlanPage(): ReactElement {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
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

const DayCard = styled(View)`
  background-color: #ffffff;
  margin: 12px 16px 0 16px;
  border-radius: 20px;
  padding: 16px;
  border-width: 1px;
  border-color: #e5e7eb;
  border-left-width: 4px;
  border-left-color: ${PLAN_PRIMARY_COLOR};
  shadow-color: ${PLAN_PRIMARY_COLOR};
  shadow-opacity: 0.08;
  shadow-radius: 10px;
  shadow-offset: 0px 2px;
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
  color: ${PLAN_PRIMARY_COLOR};
`;

const DayMeta = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray800};
`;

const MealRow = styled(View)<{ $hasDivider: boolean }>`
  padding-vertical: 12px;
  border-top-width: ${({ $hasDivider }) => ($hasDivider ? 1 : 0)}px;
  border-color: ${PLAN_ACCENT_TINT};
`;

const MealName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

const MealDetail = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray800};
  margin-top: 4px;
`;

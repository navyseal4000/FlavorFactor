import { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

import { LogLayout } from '../../src/features/log/components/LogLayout';
import { LOG_PRIMARY_COLOR } from '../../src/features/log/constants';
import { MealEntry, todayMeals, yesterdayMeals } from '../../src/features/log/mockData';

export default function LogFoodScreen(): ReactElement {
  const router = useRouter();

  function handleAddFood() {
    router.push('/log/add-food' as never);
  }

  function handleOpenMeal(entry: MealEntry) {
    router.push({ pathname: '/log/meal', params: { mealId: entry.id } } as never);
  }

  return (
    <LogLayout activeTab="food">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Section>
          <SectionHeader>
            <SectionTitle>Today</SectionTitle>
            <AddButton onPress={handleAddFood}>
              <MaterialIcons name="add" size={18} color="#111827" />
              <AddButtonLabel>Add Food</AddButtonLabel>
            </AddButton>
          </SectionHeader>
          <Card>
            {todayMeals.map((meal, index) => (
              <MealRow
                key={meal.id}
                onPress={() => handleOpenMeal(meal)}
                $hasDivider={index < todayMeals.length - 1}
              >
                <MealIcon style={{ backgroundColor: meal.iconBackground }}>
                  <MaterialIcons name={meal.icon} size={22} color={meal.iconTint} />
                </MealIcon>
                <MealContent>
                  <MealLabel>{meal.label}</MealLabel>
                  <MealMeta>{meal.calories} kcal</MealMeta>
                </MealContent>
                <MaterialIcons name="chevron-right" size={22} color="#9ca3af" />
              </MealRow>
            ))}
          </Card>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>Yesterday</SectionTitle>
          </SectionHeader>
          <Card>
            {yesterdayMeals.map((meal, index) => (
              <MealRow
                key={meal.id}
                onPress={() => handleOpenMeal(meal)}
                $hasDivider={index < yesterdayMeals.length - 1}
              >
                <MealIcon style={{ backgroundColor: meal.iconBackground }}>
                  <MaterialIcons name={meal.icon} size={22} color={meal.iconTint} />
                </MealIcon>
                <MealContent>
                  <MealLabel>{meal.label}</MealLabel>
                  <MealMeta>{meal.calories} kcal</MealMeta>
                </MealContent>
                <MaterialIcons name="chevron-right" size={22} color="#9ca3af" />
              </MealRow>
            ))}
          </Card>
        </Section>
      </ScrollView>
    </LogLayout>
  );
}

const Section = styled(View)`
  padding: 20px 16px 0 16px;
`;

const SectionHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const AddButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  border-radius: 999px;
  background-color: ${LOG_PRIMARY_COLOR};
`;

const AddButtonLabel = styled.Text`
  font-size: 14px;
  font-weight: 700;
  margin-left: 8px;
  color: #111827;
`;

const Card = styled(View)`
  background-color: #ffffff;
  border-radius: 20px;
  shadow-color: #0f172a;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 2;
`;

const MealRow = styled.Pressable<{ $hasDivider: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: ${({ $hasDivider }) => ($hasDivider ? 1 : 0)}px;
  border-color: #f3f4f6;
`;

const MealIcon = styled(View)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
`;

const MealContent = styled(View)`
  flex: 1;
  margin-left: 12px;
`;

const MealLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const MealMeta = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;


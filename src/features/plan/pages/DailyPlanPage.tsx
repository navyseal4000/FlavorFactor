import { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { PLAN_PRIMARY_COLOR } from '../constants';
import { dailyPrepTasks, shoppingList } from '../mockData';

/**
 * Provides a focused view of today&apos;s preparation checklist and shopping needs.
 */
export function DailyPlanPage(): ReactElement {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
      <Section>
        <SectionHeader>
          <SectionTitle>Prep Checklist</SectionTitle>
        </SectionHeader>
        <Card>
          {dailyPrepTasks.map((task, index) => (
            <TaskRow key={task.id} $hasDivider={index < dailyPrepTasks.length - 1}>
              <StatusIcon $completed={task.completed}>
                <MaterialIcons
                  name={task.completed ? 'check' : 'radio-button-unchecked'}
                  size={18}
                  color={task.completed ? '#ffffff' : '#9ca3af'}
                />
              </StatusIcon>
              <TaskContent>
                <TaskLabel>{task.label}</TaskLabel>
                <TaskMeta>{task.relatedMeal}</TaskMeta>
              </TaskContent>
            </TaskRow>
          ))}
        </Card>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Shopping List</SectionTitle>
        </SectionHeader>
        <Card>
          {shoppingList.map((item, index) => (
            <ShoppingRow key={item.id} $hasDivider={index < shoppingList.length - 1}>
              <ShoppingContent>
                <ShoppingLabel>{item.label}</ShoppingLabel>
                <ShoppingMeta>{item.quantity}</ShoppingMeta>
              </ShoppingContent>
              <Tag>
                <TagLabel>{item.section}</TagLabel>
              </Tag>
            </ShoppingRow>
          ))}
        </Card>
      </Section>
    </ScrollView>
  );
}

const Section = styled(View)`
  padding: 20px 16px 0 16px;
`;

const SectionHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
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

const TaskRow = styled(View)<{ $hasDivider: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: ${({ $hasDivider }) => ($hasDivider ? 1 : 0)}px;
  border-color: #f3f4f6;
`;

const StatusIcon = styled(View)<{ $completed: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $completed }) => ($completed ? PLAN_PRIMARY_COLOR : '#f3f4f6')};
`;

const TaskContent = styled(View)`
  flex: 1;
  margin-left: 12px;
`;

const TaskLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const TaskMeta = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;

const ShoppingRow = styled(View)<{ $hasDivider: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: ${({ $hasDivider }) => ($hasDivider ? 1 : 0)}px;
  border-color: #f3f4f6;
`;

const ShoppingContent = styled(View)`
  flex: 1;
`;

const ShoppingLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const ShoppingMeta = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;

const Tag = styled(View)`
  padding-vertical: 6px;
  padding-horizontal: 12px;
  border-radius: 999px;
  background-color: rgba(102, 210, 255, 0.18);
`;

const TagLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #0284c7;
`;

import { ReactElement } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

import { triggerHomeImpact } from '../haptics';
import { quickActions } from '../mockData';

export function HomeQuickActionsPage(): ReactElement {
  const router = useRouter();

  function handleNavigate(href: string) {
    triggerHomeImpact();
    router.push(href as never);
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
      <Section>
        <SectionHeader>
          <SectionTitle>Shortcuts</SectionTitle>
          <SectionSubtext>Tap to jump where you left off</SectionSubtext>
        </SectionHeader>
        <ActionsGrid>
          {quickActions.map((action) => (
            <ActionCard
              key={action.id}
              onPress={() => handleNavigate(action.href)}
              accessibilityRole="button"
              style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.97 : 1 }] })}
            >
              <ActionIcon>
                <MaterialIcons name={action.icon} size={22} color="#0f172a" />
              </ActionIcon>
              <ActionLabel>{action.label}</ActionLabel>
              <ActionDescription>{action.description}</ActionDescription>
              <ActionCTA>Open</ActionCTA>
            </ActionCard>
          ))}
        </ActionsGrid>
      </Section>
    </ScrollView>
  );
}

const Section = styled(View)`
  padding: 20px 20px 0;
  gap: 16px;
`;

const SectionHeader = styled(View)`
  gap: 6px;
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

const ActionsGrid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 14px;
`;

const ActionCard = styled(Pressable)`
  width: 48%;
  min-height: 140px;
  border-radius: 18px;
  background-color: #ffffff;
  padding: 16px;
  gap: 10px;
  shadow-color: #0f172a;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 1;
`;

const ActionIcon = styled(View)`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  background-color: #e2e8f0;
  align-items: center;
  justify-content: center;
`;

const ActionLabel = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
`;

const ActionDescription = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
`;

const ActionCTA = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #1d4ed8;
`;
export default HomeQuickActionsPage;

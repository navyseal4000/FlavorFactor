import { ReactElement } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { triggerHomeImpact, triggerHomeSelection } from '../haptics';
import { homeNotifications } from '../mockData';

export function HomeNotificationsPage(): ReactElement {
  return (
    <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120, gap: 16 }}>
      {homeNotifications.map((notification) => (
        <Card key={notification.id} $read={notification.read}>
          <CardHeader>
            <Title>{notification.title}</Title>
            <Timestamp>{notification.timestamp}</Timestamp>
          </CardHeader>
          <Body>{notification.body}</Body>
          <Actions>
            <ActionButton
              accessibilityRole="button"
              onPress={() => triggerHomeSelection()}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <MaterialIcons name="done" size={16} color="#1d4ed8" />
              <ActionLabel>Mark read</ActionLabel>
            </ActionButton>
            <ActionButton
              accessibilityRole="button"
              onPress={() => triggerHomeImpact()}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <MaterialIcons name="delete-outline" size={16} color="#dc2626" />
              <ActionLabel style={{ color: '#dc2626' }}>Delete</ActionLabel>
            </ActionButton>
          </Actions>
        </Card>
      ))}
    </ScrollView>
  );
}

const Card = styled(View)<{ $read?: boolean }>`
  background-color: ${({ $read }) => ($read ? '#f8fafc' : '#ffffff')};
  border-radius: 18px;
  padding: 18px;
  gap: 12px;
  border-width: ${({ $read }) => ($read ? 1 : 0)}px;
  border-color: #e2e8f0;
  shadow-color: #0f172a;
  shadow-opacity: ${({ $read }) => ($read ? 0 : 0.05)};
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: ${({ $read }) => ($read ? 0 : 1)};
`;

const CardHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
`;

const Timestamp = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
`;

const Body = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: #1f2937;
  line-height: 20px;
`;

const Actions = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const ActionButton = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const ActionLabel = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #1d4ed8;
`;
export default HomeNotificationsPage;

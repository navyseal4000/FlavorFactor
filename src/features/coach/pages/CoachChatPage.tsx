import { ReactElement } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';

import { coachConversation, coachConversationMeta } from '../mockData';

/**
 * Chat threads surface context about the member relationship alongside the
 * conversational history so coaches can respond with confidence.
 */
export function CoachChatPage(): ReactElement {
  return (
    <Container>
      <MetaCard>
        <MetaName>{coachConversationMeta.memberName}</MetaName>
        <MetaDetail>{coachConversationMeta.goalSummary}</MetaDetail>
        <MetaDetail>{coachConversationMeta.cadence}</MetaDetail>
        <MetaNextCheckIn>
          Next check-in · {coachConversationMeta.nextCheckIn}
        </MetaNextCheckIn>
      </MetaCard>
      <FlatList
        data={coachConversation}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Separator />}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <MessageRow $sender={item.sender}>
            <MessageBubble $sender={item.sender}>
              <MessageAuthor>{item.author}</MessageAuthor>
              <MessageBody $sender={item.sender}>{item.body}</MessageBody>
              <MessageTimestamp $sender={item.sender}>
                {item.timestamp}
              </MessageTimestamp>
            </MessageBubble>
          </MessageRow>
        )}
      />
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  padding-top: 16px;
`;

const MetaCard = styled(View)`
  background-color: #ffffff;
  margin: 0 20px 16px 20px;
  padding: 16px;
  border-radius: 16px;
  gap: 6px;
  shadow-color: #94a3b8;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
  elevation: 1;
`;

const MetaName = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const MetaDetail = styled.Text`
  font-size: 13px;
  color: #4b5563;
`;

const MetaNextCheckIn = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #2563eb;
`;

const MessageRow = styled(View)<{ $sender: 'coach' | 'member' }>`
  flex-direction: row;
  justify-content: ${({ $sender }) => ($sender === 'coach' ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled(View)<{ $sender: 'coach' | 'member' }>`
  max-width: 80%;
  background-color: ${({ $sender }) => ($sender === 'coach' ? '#111827' : '#ffffff')};
  padding: 12px 14px;
  border-radius: 18px;
  border-bottom-right-radius: ${({ $sender }) => ($sender === 'coach' ? '4px' : '18px')};
  border-bottom-left-radius: ${({ $sender }) => ($sender === 'member' ? '4px' : '18px')};
  shadow-color: #94a3b8;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  shadow-offset: 0px 1px;
  elevation: 1;
  gap: 4px;
`;

const MessageAuthor = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: #a4ec13;
`;

const MessageBody = styled.Text<{ $sender: 'coach' | 'member' }>`
  font-size: 14px;
  color: ${({ $sender }) => ($sender === 'coach' ? '#f5f5f5' : '#111827')};
`;

const MessageTimestamp = styled.Text<{ $sender: 'coach' | 'member' }>`
  font-size: 11px;
  color: ${({ $sender }) => ($sender === 'coach' ? '#e5e7eb' : '#6b7280')};
`;

const Separator = styled(View)`
  height: 12px;
`;

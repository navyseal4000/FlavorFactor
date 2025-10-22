import React, { ReactElement } from 'react';
import { Pressable, ScrollView, Switch, View } from 'react-native';
import styled from 'styled-components/native';

import {
  PROFILE_ACCENT_COLOR,
  PROFILE_BORDER_COLOR,
  PROFILE_CARD_BACKGROUND,
  PROFILE_MUTED_TEXT_COLOR,
  PROFILE_SECTION_GAP,
  PROFILE_TEXT_COLOR,
} from '../constants';
import type { ProfileListItem, ProfileSection, ProfileStatusTone } from '../types';

interface ProfileSectionListProps {
  sections: ProfileSection[];
}

export function ProfileSectionList({ sections }: ProfileSectionListProps): ReactElement {
  return (
    <SectionScroll
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 20,
        gap: PROFILE_SECTION_GAP,
      }}
      showsVerticalScrollIndicator={false}
    >
      {sections.map((section) => (
        <SectionContainer key={section.id}>
          {section.title ? <SectionTitle>{section.title}</SectionTitle> : null}
          {section.description ? (
            <SectionDescription>{section.description}</SectionDescription>
          ) : null}
          <Card>
            {section.items.map((item, index) => (
              <RowWrapper key={item.id} $isLast={index === section.items.length - 1}>
                <RowContent>
                  {item.icon ? <IconWrapper>{item.icon}</IconWrapper> : null}
                  <RowText>
                    <RowTitle>{item.title}</RowTitle>
                    {item.description ? <RowDescription>{item.description}</RowDescription> : null}
                  </RowText>
                </RowContent>
                <RowAccessory>{renderAccessory(item)}</RowAccessory>
              </RowWrapper>
            ))}
          </Card>
        </SectionContainer>
      ))}
    </SectionScroll>
  );
}

function renderAccessory(item: ProfileListItem): ReactElement | null {
  switch (item.type) {
    case 'navigation':
      return (
        <MetaText accessibilityLabel={`${item.title} action`}>
          {item.meta ?? 'Open'}
        </MetaText>
      );
    case 'toggle':
      return (
        <Switch
          value={item.toggleValue}
          disabled
          trackColor={{ true: PROFILE_ACCENT_COLOR, false: '#d1d5db' }}
        />
      );
    case 'status':
      return (
        <StatusAccessory>
          <StatusPill $tone={item.statusTone}>{item.statusLabel}</StatusPill>
          {item.meta ? <StatusMeta>{item.meta}</StatusMeta> : null}
        </StatusAccessory>
      );
    default:
      return item.value || item.meta ? (
        <MetaText>{item.value ?? item.meta}</MetaText>
      ) : null;
  }
}

const SectionScroll = styled(ScrollView)`
  flex: 1;
`;

const SectionContainer = styled(View)`
  gap: 8px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${PROFILE_TEXT_COLOR};
`;

const SectionDescription = styled.Text`
  font-size: 14px;
  color: ${PROFILE_MUTED_TEXT_COLOR};
`;

const Card = styled(View)`
  background-color: ${PROFILE_CARD_BACKGROUND};
  border-radius: 16px;
  border-width: 1px;
  border-color: ${PROFILE_BORDER_COLOR};
  overflow: hidden;
`;

const RowWrapper = styled(Pressable)<{ $isLast: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  gap: 16px;
  border-bottom-width: ${({ $isLast }) => ($isLast ? 0 : 1)}px;
  border-color: ${PROFILE_BORDER_COLOR};
`;

const RowContent = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const IconWrapper = styled(View)`
  width: 28px;
  align-items: center;
`;

const RowText = styled(View)`
  flex: 1;
  gap: 4px;
`;

const RowTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${PROFILE_TEXT_COLOR};
`;

const RowDescription = styled.Text`
  font-size: 13px;
  color: ${PROFILE_MUTED_TEXT_COLOR};
`;

const RowAccessory = styled(View)`
  align-items: flex-end;
  min-width: 72px;
`;

const MetaText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${PROFILE_MUTED_TEXT_COLOR};
  text-align: right;
`;

const StatusAccessory = styled(View)`
  align-items: flex-end;
  gap: 4px;
`;

const StatusMeta = styled.Text`
  font-size: 11px;
  color: ${PROFILE_MUTED_TEXT_COLOR};
  text-align: right;
`;

const StatusPill = styled.Text<{ $tone?: ProfileStatusTone }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ $tone }) => getStatusTextColor($tone)};
  background-color: ${({ $tone }) => getStatusBackgroundColor($tone)};
`;

function getStatusTextColor(tone: ProfileStatusTone = 'default'): string {
  switch (tone) {
    case 'success':
      return '#166534';
    case 'warning':
      return '#92400e';
    case 'info':
      return '#1d4ed8';
    default:
      return PROFILE_MUTED_TEXT_COLOR;
  }
}

function getStatusBackgroundColor(tone: ProfileStatusTone = 'default'): string {
  switch (tone) {
    case 'success':
      return '#dcfce7';
    case 'warning':
      return '#fef3c7';
    case 'info':
      return '#dbeafe';
    default:
      return '#f3f4f6';
  }
}

import { ReactElement } from 'react';
import { Pressable, View } from 'react-native';
import styled from 'styled-components/native';

import { LOG_PRIMARY_COLOR } from '../constants';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: Array<SegmentedOption<T>>;
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>): ReactElement {
  return (
    <Container>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <SegmentButton
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            $active={isActive}
          >
            <SegmentLabel $active={isActive}>{option.label}</SegmentLabel>
          </SegmentButton>
        );
      })}
    </Container>
  );
}

const Container = styled(View)`
  flex-direction: row;
  background-color: #e5e7eb;
  border-radius: 999px;
  padding: 4px;
  align-self: center;
`;

const SegmentButton = styled(Pressable)<{ $active: boolean }>`
  padding-vertical: 6px;
  padding-horizontal: 16px;
  border-radius: 999px;
  background-color: ${({ $active }) => ($active ? '#ffffff' : 'transparent')};
  elevation: ${({ $active }) => ($active ? 2 : 0)};
`;

const SegmentLabel = styled.Text<{ $active: boolean }>`
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  color: ${({ $active }) => ($active ? '#111827' : '#6b7280')};
`;


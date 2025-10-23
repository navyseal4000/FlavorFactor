import { ReactElement } from 'react';
import { Pressable, View } from 'react-native';
import styled from 'styled-components/native';

import { palette, withOpacity } from '../../styles/palette';

export interface CarouselIndicatorsProps {
  count: number;
  activeIndex: number;
  labels?: string[];
  onSelect?: (index: number) => void;
}

export function CarouselIndicators({
  count,
  activeIndex,
  labels,
  onSelect,
}: CarouselIndicatorsProps): ReactElement {
  const indicators = Array.from({ length: count });

  return (
    <IndicatorRow accessibilityRole="tablist" accessibilityLabel="Carousel position">
      {indicators.map((_, index) => {
        const isActive = index === activeIndex;
        const label = labels?.[index] ?? `Slide ${index + 1}`;

        return (
          <IndicatorButton
            key={index}
            onPress={() => onSelect?.(index)}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: isActive }}
            accessibilityHint="Switch to this section"
            disabled={!onSelect}
          >
            <IndicatorDot $active={isActive} />
          </IndicatorButton>
        );
      })}
    </IndicatorRow>
  );
}

const IndicatorRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const IndicatorButton = styled(Pressable)`
  padding: 6px;
`;

const IndicatorDot = styled(View)<{ $active: boolean }>`
  height: 8px;
  border-radius: 999px;
  background-color: ${({ $active }) =>
    $active ? palette.brand.lime500 : withOpacity(palette.brand.lime500, 0.35)};
  width: ${({ $active }) => ($active ? 18 : 8)}px;
`;

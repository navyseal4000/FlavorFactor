import { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';

import { pantryInventory } from '../mockData';

/**
 * Renders the current pantry inventory grouped by category with low-stock
 * accents, giving parity with the pantry design mocks.
 */
export function PantryPage(): ReactElement {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
      <IntroSection>
        <IntroHeading>Pantry Inventory</IntroHeading>
        <IntroSubheading>
          Track staples and highlight what needs to be replenished before your
          next grocery run.
        </IntroSubheading>
      </IntroSection>
      {pantryInventory.map((category) => (
        <CategoryCard key={category.id}>
          <CategoryHeader>
            <CategoryLabel>{category.label}</CategoryLabel>
            <CategoryMeta>{category.items.length} items</CategoryMeta>
          </CategoryHeader>
          {category.items.map((item, index) => (
            <PantryRow key={item.id} $hasDivider={index < category.items.length - 1}>
              <PantryContent>
                <PantryLabel>{item.label}</PantryLabel>
                <PantryMeta>{item.quantity}</PantryMeta>
              </PantryContent>
              {item.lowStock ? <LowStockBadge>Low</LowStockBadge> : null}
            </PantryRow>
          ))}
        </CategoryCard>
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

const CategoryCard = styled(View)`
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

const CategoryHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CategoryLabel = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const CategoryMeta = styled.Text`
  font-size: 13px;
  color: #6b7280;
`;

const PantryRow = styled(View)<{ $hasDivider: boolean }>`
  flex-direction: row;
  align-items: center;
  padding-vertical: 12px;
  border-top-width: ${({ $hasDivider }) => ($hasDivider ? 1 : 0)}px;
  border-color: #f3f4f6;
`;

const PantryContent = styled(View)`
  flex: 1;
`;

const PantryLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const PantryMeta = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;

const LowStockBadge = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: #b91c1c;
  background-color: rgba(239, 68, 68, 0.12);
  padding-vertical: 4px;
  padding-horizontal: 10px;
  border-radius: 999px;
`;

import { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';

import { cartItems, cartSummary } from '../mockData';

/**
 * Summarises the current grocery cart prior to checkout.
 */
export function CartReviewPage(): ReactElement {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
      <Section>
        <SectionTitle>Delivery Details</SectionTitle>
        <SummaryCard>
          <SummaryRow>
            <SummaryLabel>Store</SummaryLabel>
            <SummaryValue>{cartSummary.store}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Window</SummaryLabel>
            <SummaryValue>{cartSummary.deliveryWindow}</SummaryValue>
          </SummaryRow>
        </SummaryCard>
      </Section>

      <Section>
        <SectionTitle>Cart Items</SectionTitle>
        <Card>
          {cartItems.map((item, index) => (
            <CartRow key={item.id} $hasDivider={index < cartItems.length - 1}>
              <CartContent>
                <CartLabel>{item.label}</CartLabel>
                <CartMeta>{item.quantity}</CartMeta>
              </CartContent>
              <CartPrice>${item.price.toFixed(2)}</CartPrice>
            </CartRow>
          ))}
        </Card>
      </Section>

      <Section>
        <SummaryCard>
          <TotalRow>
            <TotalLabel>Subtotal</TotalLabel>
            <TotalValue>${cartSummary.subtotal.toFixed(2)}</TotalValue>
          </TotalRow>
        </SummaryCard>
      </Section>
    </ScrollView>
  );
}

const Section = styled(View)`
  padding: 20px 16px 0 16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
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

const SummaryCard = styled(Card)`
  padding: 16px;
`;

const SummaryRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 6px;
`;

const SummaryLabel = styled.Text`
  font-size: 14px;
  color: #6b7280;
`;

const SummaryValue = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
`;

const CartRow = styled(View)<{ $hasDivider: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: ${({ $hasDivider }) => ($hasDivider ? 1 : 0)}px;
  border-color: #f3f4f6;
`;

const CartContent = styled(View)`
  flex: 1;
`;

const CartLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const CartMeta = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;

const CartPrice = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
`;

const TotalRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TotalLabel = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

const TotalValue = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

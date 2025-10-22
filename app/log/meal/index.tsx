import { ReactElement } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LOG_PRIMARY_COLOR } from '../../../src/features/log/constants';

const MACRO_ITEMS = [
  { label: 'Protein', value: '20g' },
  { label: 'Carbs', value: '50g' },
  { label: 'Fat', value: '15g' },
  { label: 'Total Calories', value: '450' },
];

const RECIPE_ITEMS = [
  { label: 'Flour', value: '200', unit: 'g' },
  { label: 'Sugar', value: '50', unit: 'g' },
  { label: 'Butter', value: '30', unit: 'g' },
];

const ADDITIONAL_ITEMS = [
  { label: 'Syrup', value: '30', unit: 'g' },
  { label: 'Berries', value: '50', unit: 'g' },
];

export default function LogMealScreen(): ReactElement {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  return (
    <Container>
      <Header>
        <IconButton onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={22} color="#374151" />
        </IconButton>
        <HeaderTitle>Pancake Breakfast</HeaderTitle>
        <View style={{ width: 40 }} />
      </Header>
      <ScrollView contentContainerStyle={{ paddingBottom: bottom + 140 }}>
        <Section>
          <SectionTitle>Macros</SectionTitle>
          <MacroGrid>
            {MACRO_ITEMS.map((item) => (
              <MacroCard key={item.label}>
                <MacroLabel>{item.label}</MacroLabel>
                <MacroValue>{item.value}</MacroValue>
              </MacroCard>
            ))}
          </MacroGrid>
        </Section>

        <Section>
          <MicronutrientsLink onPress={() => router.push('/log/meal/micronutrients' as never)}>
            <LinkLabel>Micronutrients</LinkLabel>
            <MaterialIcons name="chevron-right" size={22} color="#6b7280" />
          </MicronutrientsLink>
        </Section>

        <Section>
          <SectionTitle>Food Items</SectionTitle>
          <Accordion>
            <AccordionHeader>
              <AccordionTitle>Pancakes</AccordionTitle>
              <ToggleIcon>
                <MaterialIcons name="expand-more" size={22} color="#9ca3af" />
              </ToggleIcon>
            </AccordionHeader>
            <Divider />
            <AccordionBody>
              <BodyLabel>Modify total recipe amount:</BodyLabel>
              {RECIPE_ITEMS.map((item) => (
                <BodyRow key={item.label}>
                  <BodyText>{item.label}</BodyText>
                  <QuantityField>
                    <QuantityInput defaultValue={item.value} keyboardType="numeric" />
                    <QuantityUnit>{item.unit}</QuantityUnit>
                  </QuantityField>
                </BodyRow>
              ))}
            </AccordionBody>
          </Accordion>

          {ADDITIONAL_ITEMS.map((item) => (
            <ItemRow key={item.label}>
              <BodyText>{item.label}</BodyText>
              <QuantityField>
                <QuantityInput defaultValue={item.value} keyboardType="numeric" />
                <QuantityUnit>{item.unit}</QuantityUnit>
              </QuantityField>
            </ItemRow>
          ))}
        </Section>
      </ScrollView>
      <Footer style={{ paddingBottom: Math.max(bottom + 12, 24) }}>
        <PrimaryButton>
          <PrimaryButtonLabel>Confirm</PrimaryButtonLabel>
        </PrimaryButton>
        <SecondaryButton>
          <SecondaryButtonLabel>Track New Food</SecondaryButtonLabel>
        </SecondaryButton>
      </Footer>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #ffffff;
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom-width: 1px;
  border-color: #e5e7eb;
`;

const IconButton = styled.Pressable`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const Section = styled(View)`
  padding: 20px 16px 0 16px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
`;

const MacroGrid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const MacroCard = styled(View)`
  background-color: #f3f4f6;
  border-radius: 16px;
  padding: 16px;
  width: 48%;
`;

const MacroLabel = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
`;

const MacroValue = styled.Text`
  margin-top: 8px;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
`;

const MicronutrientsLink = styled.Pressable`
  margin-top: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: #e5e7eb;
  border-radius: 16px;
  padding: 16px;
  background-color: #ffffff;
`;

const LinkLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const Accordion = styled(View)`
  margin-top: 24px;
  border-width: 1px;
  border-color: #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  background-color: #ffffff;
`;

const AccordionHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const AccordionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const ToggleIcon = styled(View)`
  transform: rotate(90deg);
`;

const Divider = styled(View)`
  height: 1px;
  background-color: #e5e7eb;
`;

const AccordionBody = styled(View)`
  padding: 16px;
  gap: 16px;
`;

const BodyLabel = styled.Text`
  font-size: 13px;
  color: #6b7280;
`;

const BodyRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BodyText = styled.Text`
  font-size: 14px;
  color: #1f2937;
  font-weight: 600;
`;

const QuantityField = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const QuantityInput = styled(TextInput)`
  width: 72px;
  border-width: 1px;
  border-color: #e5e7eb;
  border-radius: 12px;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  text-align: right;
  font-size: 14px;
  color: #374151;
`;

const QuantityUnit = styled.Text`
  font-size: 14px;
  color: #6b7280;
`;

const ItemRow = styled(View)`
  margin-top: 16px;
  padding: 16px;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #e5e7eb;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Footer = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  padding-horizontal: 16px;
  border-top-width: 1px;
  border-color: #e5e7eb;
  gap: 12px;
`;

const PrimaryButton = styled.Pressable`
  background-color: ${LOG_PRIMARY_COLOR};
  border-radius: 12px;
  padding-vertical: 14px;
  align-items: center;
`;

const PrimaryButtonLabel = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

const SecondaryButton = styled.Pressable`
  border-width: 1px;
  border-color: #d1d5db;
  border-radius: 12px;
  padding-vertical: 14px;
  align-items: center;
`;

const SecondaryButtonLabel = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

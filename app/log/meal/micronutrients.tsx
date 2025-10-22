import { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VITAMINS = [
  { name: 'Vitamin A', value: '150 mcg', percent: '17%' },
  { name: 'Vitamin C', value: '5 mg', percent: '6%' },
  { name: 'Vitamin D', value: '1 mcg', percent: '5%' },
  { name: 'Vitamin E', value: '1 mg', percent: '7%' },
  { name: 'Vitamin K', value: '10 mcg', percent: '8%' },
];

const MINERALS = [
  { name: 'Calcium', value: '100 mg', percent: '8%' },
  { name: 'Iron', value: '1 mg', percent: '6%' },
  { name: 'Magnesium', value: '10 mg', percent: '2%' },
  { name: 'Sodium', value: '200 mg', percent: '9%' },
];

export default function MicronutrientsScreen(): ReactElement {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  return (
    <Container>
      <Header>
        <IconButton onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={20} color="#111827" />
        </IconButton>
        <HeaderTitle>Micronutrient Breakdown</HeaderTitle>
        <View style={{ width: 32 }} />
      </Header>
      <ScrollView contentContainerStyle={{ paddingBottom: bottom + 48 }}>
        <Section>
          <SectionTitle>Vitamins</SectionTitle>
          <MetricList>
            {VITAMINS.map((item) => (
              <MetricRow key={item.name}>
                <MetricName>{item.name}</MetricName>
                <MetricDetail>
                  <MetricValue>{item.value}</MetricValue>
                  <MetricPercent>{item.percent} DV</MetricPercent>
                </MetricDetail>
                <ProgressBar>
                  <ProgressFill style={{ width: item.percent }} />
                </ProgressBar>
              </MetricRow>
            ))}
          </MetricList>
        </Section>
        <Section>
          <SectionTitle>Minerals</SectionTitle>
          <MetricList>
            {MINERALS.map((item) => (
              <MetricRow key={item.name}>
                <MetricName>{item.name}</MetricName>
                <MetricDetail>
                  <MetricValue>{item.value}</MetricValue>
                  <MetricPercent>{item.percent} DV</MetricPercent>
                </MetricDetail>
                <ProgressBar>
                  <ProgressFill style={{ width: item.percent }} />
                </ProgressBar>
              </MetricRow>
            ))}
          </MetricList>
        </Section>
      </ScrollView>
      <Footer>
        <FooterNote>
          *Daily Value (DV) based on a 2,000 calorie diet. Your daily values may be higher or lower
          depending on your calorie needs.
        </FooterNote>
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
  background-color: #ffffff;
`;

const IconButton = styled.Pressable`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const Section = styled(View)`
  padding: 24px 16px 0 16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
`;

const MetricList = styled(View)`
  gap: 16px;
`;

const MetricRow = styled(View)`
  gap: 10px;
`;

const MetricName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
`;

const MetricDetail = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MetricValue = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const MetricPercent = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
`;

const ProgressBar = styled(View)`
  height: 8px;
  border-radius: 999px;
  background-color: #e5e7eb;
  overflow: hidden;
`;

const ProgressFill = styled(View)`
  height: 100%;
  border-radius: 999px;
  background-color: #a4ec13;
`;

const Footer = styled(View)`
  padding: 16px;
  border-top-width: 1px;
  border-color: #e5e7eb;
  background-color: #ffffff;
`;

const FooterNote = styled.Text`
  font-size: 12px;
  color: #6b7280;
  text-align: center;
`;



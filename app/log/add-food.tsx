import { ReactElement } from 'react';
import { Image, ScrollView, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LOG_PRIMARY_COLOR } from '../../src/features/log/constants';
import { quickAddFoods, recentFoods } from '../../src/features/log/mockData';

export default function AddFoodScreen(): ReactElement {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  return (
    <Container>
      <Header>
        <IconButton onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={22} color="#111827" />
        </IconButton>
        <HeaderTitle>Add Food</HeaderTitle>
        <View style={{ width: 40 }} />
      </Header>
      <ScrollView contentContainerStyle={{ paddingBottom: bottom + 120 }}>
        <Section>
          <SearchField>
            <MaterialIcons name="search" size={22} color="#7c8961" />
            <SearchInput
              placeholder="Search for food"
              placeholderTextColor="#7c8961"
              autoCorrect={false}
            />
            <IconButton>
              <MaterialIcons name="qr-code" size={22} color="#7c8961" />
            </IconButton>
          </SearchField>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>Quick Add</SectionTitle>
            <SectionLink>See all</SectionLink>
          </SectionHeader>
          <ChipRow>
            {quickAddFoods.map((item) => (
              <Chip key={item}>
                <ChipLabel>{item}</ChipLabel>
              </Chip>
            ))}
          </ChipRow>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>Recent</SectionTitle>
            <SectionLink>See all</SectionLink>
          </SectionHeader>
          <ListCard>
            {recentFoods.map((food, index) => (
              <RecentRow key={food.id} $hasDivider={index < recentFoods.length - 1}>
                <RecentImage source={{ uri: food.imageUrl }} />
                <RecentInfo>
                  <RecentName>{food.name}</RecentName>
                  <RecentDetails>{food.details}</RecentDetails>
                </RecentInfo>
                <MaterialIcons name="add-circle" size={24} color="#9ca3af" />
              </RecentRow>
            ))}
          </ListCard>
        </Section>
      </ScrollView>
      <Footer style={{ paddingBottom: Math.max(bottom + 12, 24) }}>
        <PrimaryButton>
          <PrimaryButtonLabel>Add Food</PrimaryButtonLabel>
        </PrimaryButton>
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

const SearchField = styled(View)`
  flex-direction: row;
  align-items: center;
  border-radius: 24px;
  padding: 12px 16px;
  background-color: #f3f4f0;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  margin-left: 12px;
  font-size: 16px;
  color: #111827;
`;

const SectionHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const SectionLink = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${LOG_PRIMARY_COLOR};
`;

const ChipRow = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const Chip = styled.Pressable`
  background-color: #f3f4f0;
  border-radius: 999px;
  padding: 8px 16px;
`;

const ChipLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const ListCard = styled(View)`
  background-color: #ffffff;
  border-radius: 20px;
  border-width: 1px;
  border-color: #f3f4f6;
  overflow: hidden;
`;

const RecentRow = styled(View)<{ $hasDivider: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border-bottom-width: ${({ $hasDivider }) => ($hasDivider ? 1 : 0)}px;
  border-color: #f3f4f6;
`;

const RecentImage = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  margin-right: 16px;
`;

const RecentInfo = styled(View)`
  flex: 1;
`;

const RecentName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const RecentDetails = styled.Text`
  margin-top: 4px;
  font-size: 13px;
  color: #7c8961;
`;

const Footer = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffffcc;
  padding-horizontal: 16px;
  border-top-width: 1px;
  border-color: #e5e7eb;
`;

const PrimaryButton = styled.Pressable`
  background-color: ${LOG_PRIMARY_COLOR};
  border-radius: 32px;
  padding-vertical: 16px;
  align-items: center;
  justify-content: center;
  shadow-color: #bef264;
  shadow-opacity: 0.4;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 2;
`;

const PrimaryButtonLabel = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;




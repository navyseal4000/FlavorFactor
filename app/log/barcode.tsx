import { ReactElement } from 'react';
import { Image, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BarcodeScanScreen(): ReactElement {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <Container>
      <Header style={{ paddingTop: Math.max(top, 16) }}>
        <BackButton onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={22} color="#111827" />
          <BackLabel>Back</BackLabel>
        </BackButton>
        <HeaderTitle>Scan Barcode</HeaderTitle>
        <View style={{ width: 70 }} />
      </Header>
      <Body>
        <Instruction>Align the barcode within the frame to scan automatically.</Instruction>
        <ScannerFrame>
          <MaterialIcons name="qr-code-scanner" size={160} color="#111827" />
        </ScannerFrame>
        <PlaceholderImage
          source={{ uri: 'https://media.giphy.com/media/l0HUpt2s9Pclgt9Vm/giphy.gif' }}
          resizeMode="contain"
        />
      </Body>
      <Footer style={{ paddingBottom: Math.max(bottom + 16, 32) }}>
        <SupportText>Having trouble? Enter the barcode digits manually.</SupportText>
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

const BackButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const BackLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const Body = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  gap: 24px;
`;

const Instruction = styled.Text`
  font-size: 16px;
  color: #4b5563;
  text-align: center;
`;

const ScannerFrame = styled(View)`
  width: 220px;
  height: 220px;
  border-width: 2px;
  border-color: #a4ec13;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
`;

const PlaceholderImage = styled(Image)`
  width: 220px;
  height: 140px;
`;

const Footer = styled(View)`
  padding: 0 24px;
`;

const SupportText = styled.Text`
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`;

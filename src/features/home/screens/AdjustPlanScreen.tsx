import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, Modal, Pressable, ScrollView, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { HOME_PRIMARY_COLOR } from '../constants';
import { triggerHomeNotification, triggerHomeSelection } from '../haptics';
import {
  habitFocuses,
  macroBreakdown,
  planFocusOptions,
  scheduleWindows,
} from '../mockData';

export function AdjustPlanScreen(): ReactElement {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const initialFocusId = useMemo(
    () => planFocusOptions.find((option) => option.isPrimary)?.id ?? planFocusOptions[0].id,
    [],
  );
  const [selectedFocusId, setSelectedFocusId] = useState<string>(initialFocusId);
  const [macroTargets, setMacroTargets] = useState<Record<string, string>>(() =>
    macroBreakdown.reduce<Record<string, string>>((acc, macro) => {
      acc[macro.id] = String(macro.target);
      return acc;
    }, {}),
  );
  const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>(
    scheduleWindows.length > 0 ? [scheduleWindows[0].id] : [],
  );
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const isSaveEnabled = useMemo(
    () => Object.values(macroTargets).every((value) => value.length > 0),
    [macroTargets],
  );
  const [showHelpModal, setShowHelpModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Container style={{ opacity: fadeAnim }}>
      <Header style={{ paddingTop: Math.max(top, 16) }}>
        <IconButton
          onPress={() => {
            triggerHomeSelection();
            router.back();
          }}
          accessibilityLabel="Go back"
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <MaterialIcons name="arrow-back" size={22} color="#111827" />
        </IconButton>
        <HeaderTitle>Adjust Plan</HeaderTitle>
        <IconButton
          accessibilityLabel="Get help"
          onPress={() => {
            triggerHomeSelection();
            setShowHelpModal(true);
          }}
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <MaterialIcons name="help-outline" size={22} color="#111827" />
        </IconButton>
      </Header>
      <ScrollView contentContainerStyle={{ paddingBottom: bottom + 160 }}>
        <Section>
          <SectionLabel>Goal Focus</SectionLabel>
          <FocusRow>
            {planFocusOptions.map((option) => (
              <FocusCard
                key={option.id}
                accessibilityRole="radio"
                accessibilityState={{ selected: option.id === selectedFocusId }}
                onPress={() => {
                  triggerHomeSelection();
                  setSelectedFocusId(option.id);
                }}
                $active={option.id === selectedFocusId}
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  },
                ]}
              >
                <FocusHeader>
                  <FocusTitle>{option.title}</FocusTitle>
                  <MaterialIcons
                    name={option.id === selectedFocusId ? 'check-circle' : 'radio-button-unchecked'}
                    size={18}
                    color={option.id === selectedFocusId ? '#2563eb' : '#94a3b8'}
                  />
                </FocusHeader>
                {option.isPrimary && (
                  <FocusBadge>
                    <MaterialIcons name="star" size={12} color="#0f172a" />
                    <FocusBadgeLabel>Primary</FocusBadgeLabel>
                  </FocusBadge>
                )}
                <FocusDescription>{option.description}</FocusDescription>
              </FocusCard>
            ))}
          </FocusRow>
        </Section>

        <Section>
          <SectionLabel>Macro Targets</SectionLabel>
          <Card>
            {macroBreakdown.map((macro, index) => (
              <MacroRow key={macro.id} $hasDivider={index < macroBreakdown.length - 1}>
                <MacroSummary>
                  <MacroIcon style={{ backgroundColor: macro.color }}>
                    <MaterialIcons name="pie-chart-outline" size={18} color="#0f172a" />
                  </MacroIcon>
                  <View>
                    <MacroTitle>{macro.label}</MacroTitle>
                    <MacroMeta>{macro.target} g goal</MacroMeta>
                  </View>
                </MacroSummary>
                <MacroInput
                  value={macroTargets[macro.id]}
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    setMacroTargets((prev) => ({
                      ...prev,
                      [macro.id]: value.replace(/[^0-9]/g, ''),
                    }))
                  }
                  returnKeyType="done"
                />
              </MacroRow>
            ))}
          </Card>
        </Section>

        <Section>
          <SectionLabel>Scheduling</SectionLabel>
          <Card>
            {scheduleWindows.map((window, index) => (
              <ScheduleRow
                key={window.id}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selectedScheduleIds.includes(window.id) }}
                onPress={() => {
                  triggerHomeSelection();
                  setSelectedScheduleIds((prev) =>
                    prev.includes(window.id)
                      ? prev.filter((id) => id !== window.id)
                      : [...prev, window.id],
                  );
                }}
                $hasDivider={index < scheduleWindows.length - 1}
                $selected={selectedScheduleIds.includes(window.id)}
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.99 : 1 }],
                  },
                ]}
              >
                <ScheduleIcon>
                  <MaterialIcons name={window.icon} size={20} color="#1f2937" />
                </ScheduleIcon>
                <ScheduleInfo>
                  <ScheduleLabel>{window.label}</ScheduleLabel>
                  <ScheduleDetails>{window.duration}</ScheduleDetails>
                </ScheduleInfo>
                <MaterialIcons
                  name={
                    selectedScheduleIds.includes(window.id)
                      ? 'check-circle'
                      : 'radio-button-unchecked'
                  }
                  size={20}
                  color={selectedScheduleIds.includes(window.id) ? '#2563eb' : '#94a3b8'}
                />
              </ScheduleRow>
            ))}
          </Card>
        </Section>

        <Section>
          <SectionLabel>Habits to Support</SectionLabel>
          <HabitList horizontal showsHorizontalScrollIndicator={false}>
            {habitFocuses.map((habit) => (
              <HabitCard
                key={habit.id}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selectedHabits.includes(habit.id) }}
                onPress={() => {
                  triggerHomeSelection();
                  setSelectedHabits((prev) =>
                    prev.includes(habit.id)
                      ? prev.filter((id) => id !== habit.id)
                      : [...prev, habit.id],
                  );
                }}
                $selected={selectedHabits.includes(habit.id)}
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.99 : 1 }],
                  },
                ]}
              >
                <HabitHeader>
                  <HabitIcon style={{ backgroundColor: habit.accentColor }}>
                    <MaterialIcons name={habit.icon} size={20} color="#0f172a" />
                  </HabitIcon>
                  <HabitText>
                    <HabitLabel>{habit.label}</HabitLabel>
                    <HabitStreak>{habit.streakLabel}</HabitStreak>
                  </HabitText>
                  <MaterialIcons
                    name={
                      selectedHabits.includes(habit.id)
                        ? 'check-circle'
                        : 'radio-button-unchecked'
                    }
                    size={18}
                    color={selectedHabits.includes(habit.id) ? '#2563eb' : '#94a3b8'}
                  />
                </HabitHeader>
                <HabitHelper>{habit.helperText}</HabitHelper>
              </HabitCard>
            ))}
          </HabitList>
        </Section>
      </ScrollView>
      <Footer style={{ paddingBottom: Math.max(bottom + 16, 28) }}>
        <FooterCard>
          <FooterTitle>Save as next week&apos;s template?</FooterTitle>
          <FooterSubtext>Applies starting Monday, can be reverted anytime.</FooterSubtext>
        </FooterCard>
        <PrimaryButton
          disabled={!isSaveEnabled}
          $disabled={!isSaveEnabled}
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed && isSaveEnabled ? 0.97 : 1 }],
            },
          ]}
          onPress={() => {
            triggerHomeNotification();
            Alert.alert('Plan updated', 'Your preferences have been saved.');
            router.back();
          }}
        >
          <PrimaryButtonLabel>Update Plan</PrimaryButtonLabel>
        </PrimaryButton>
      </Footer>
      <Modal
        transparent
        visible={showHelpModal}
        animationType="fade"
        onRequestClose={() => setShowHelpModal(false)}
      >
        <HelpModalBackdrop>
          <BackdropPressable
            accessibilityRole="button"
            accessibilityLabel="Close help dialog"
            onPress={() => {
              triggerHomeSelection();
              setShowHelpModal(false);
            }}
          />
          <HelpCard>
            <HelpCloseButton
              onPress={() => {
                triggerHomeSelection();
                setShowHelpModal(false);
              }}
              accessibilityLabel="Close"
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <MaterialIcons name="close" size={20} color="#111827" />
            </HelpCloseButton>
            <HelpTitle>What updates the plan?</HelpTitle>
            <HelpBody>
              Choose the focus that matches your current goals, fine-tune macro targets, and select
              schedule windows or supporting habits. These preferences shape the recommendations you
              see across Home and Log.
            </HelpBody>
            <HelpBody>
              Saving as a template will apply the new targets for the upcoming week while keeping
              your existing history intact.
            </HelpBody>
          </HelpCard>
        </HelpModalBackdrop>
      </Modal>
    </Container>
  );
}

const Container = styled(Animated.View)`
  flex: 1;
  background-color: #f8fafc;
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 12px;
`;

const IconButton = styled(Pressable)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #e2e8f0;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
`;

const Section = styled(View)`
  padding: 20px 20px 0;
  gap: 16px;
`;

const SectionLabel = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
`;

const FocusRow = styled(View)`
  gap: 12px;
`;

const FocusCard = styled(Pressable)<{ $active?: boolean }>`
  background-color: ${({ $active }) => ($active ? '#dbeafe' : '#ffffff')};
  border-radius: 18px;
  padding: 18px;
  gap: 8px;
  border-width: 1px;
  border-color: ${({ $active }) => ($active ? '#2563eb' : '#e2e8f0')};
  shadow-color: ${({ $active }) => ($active ? '#1d4ed8' : '#0f172a')};
  shadow-opacity: ${({ $active }) => ($active ? 0.18 : 0.06)};
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: ${({ $active }) => ($active ? 2 : 1)};
`;

const FocusHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FocusTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
`;

const FocusBadge = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  border-radius: 999px;
  background-color: #bfdbfe;
  padding: 4px 8px;
`;

const FocusBadgeLabel = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
`;

const FocusDescription = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  line-height: 18px;
`;

const Card = styled(View)`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 18px;
  gap: 16px;
  shadow-color: #0f172a;
  shadow-opacity: 0.05;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 1;
`;

const MacroRow = styled(View)<{ $hasDivider: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: ${({ $hasDivider }) => ($hasDivider ? 16 : 0)}px;
  border-bottom-width: ${({ $hasDivider }) => ($hasDivider ? 1 : 0)}px;
  border-color: #e2e8f0;
`;

const MacroSummary = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const MacroIcon = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: #dbeafe;
`;

const MacroTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
`;

const MacroMeta = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
`;

const MacroInput = styled(TextInput)`
  width: 64px;
  height: 44px;
  border-radius: 12px;
  border-width: 1px;
  border-color: #cbd5f5;
  padding: 0 12px;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  text-align: center;
  background-color: #f8fafc;
`;

const ScheduleRow = styled(Pressable)<{ $hasDivider: boolean; $selected: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 14px;
  padding: 12px;
  margin-bottom: ${({ $hasDivider }) => ($hasDivider ? 12 : 0)}px;
  border-width: 1px;
  border-color: ${({ $selected }) => ($selected ? '#a5b4fc' : '#e2e8f0')};
  background-color: ${({ $selected }) => ($selected ? '#eef2ff' : '#ffffff')};
  border-radius: 16px;
`;

const ScheduleIcon = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: #e0f2fe;
`;

const ScheduleInfo = styled(View)`
  flex: 1;
`;

const ScheduleLabel = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
`;

const ScheduleDetails = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #475569;
`;

const HabitList = styled(ScrollView)`
  flex-grow: 0;
`;

const HabitCard = styled(Pressable)<{ $selected: boolean }>`
  width: 200px;
  border-radius: 18px;
  background-color: ${({ $selected }) => ($selected ? '#eef2ff' : '#ffffff')};
  padding: 16px;
  margin-right: 12px;
  gap: 8px;
  shadow-color: #0f172a;
  shadow-opacity: 0.05;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 1;
  border-width: 1px;
  border-color: ${({ $selected }) => ($selected ? '#6366f1' : '#e2e8f0')};
`;

const HabitHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const HabitIcon = styled(View)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

const HabitText = styled(View)`
  flex: 1;
  gap: 4px;
`;

const HabitLabel = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
`;

const HabitStreak = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #0ea5e9;
`;

const HabitHelper = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #475569;
  line-height: 18px;
`;

const Footer = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  background-color: #ffffffdd;
  border-top-width: 1px;
  border-color: #e2e8f0;
  gap: 16px;
`;

const FooterCard = styled(View)`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 18px;
  gap: 6px;
  border-width: 1px;
  border-color: #e2e8f0;
  shadow-color: #0f172a;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 2;
`;

const FooterTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
`;

const FooterSubtext = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
`;

const PrimaryButton = styled(Pressable)<{ $disabled?: boolean }>`
  background-color: ${({ $disabled }) => ($disabled ? '#cbd5f5' : HOME_PRIMARY_COLOR)};
  border-radius: 16px;
  padding-vertical: 16px;
  align-items: center;
  justify-content: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;

const PrimaryButtonLabel = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
`;

const HelpModalBackdrop = styled(View)`
  flex: 1;
  background-color: rgba(17, 24, 39, 0.6);
  justify-content: center;
  padding: 32px 24px;
`;

const BackdropPressable = styled(Pressable)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const HelpCard = styled(View)`
  background-color: #ffffff;
  border-radius: 24px;
  padding: 24px;
  gap: 16px;
  shadow-color: #0f172a;
  shadow-opacity: 0.1;
  shadow-radius: 20px;
  shadow-offset: 0px 10px;
  elevation: 6;
`;

const HelpCloseButton = styled(Pressable)`
  align-self: flex-end;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9;
`;

const HelpTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
`;

const HelpBody = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: #475569;
`;
export default AdjustPlanScreen;

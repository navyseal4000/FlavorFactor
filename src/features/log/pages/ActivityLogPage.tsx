import { ReactElement } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { ActivityTrendChart } from '../components/ActivityTrendChart';
import { LOG_PRIMARY_COLOR } from '../constants';
import { syncedMetrics, todayActivities, yesterdayActivities } from '../mockData';

export function ActivityLogPage(): ReactElement {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
      <Section>
        <SectionHeader>
          <SectionTitle>Today</SectionTitle>
          <PrimaryPill>
            <MaterialIcons name="add" size={18} color="#111827" style={{ marginRight: 6 }} />
            <PrimaryPillLabel>Add Activity</PrimaryPillLabel>
          </PrimaryPill>
        </SectionHeader>
        <Card>
          <CardContent>
            {todayActivities.map((activity, index) => (
              <ActivityRow key={activity.id} $hasDivider={index < todayActivities.length - 1}>
                <ActivityIcon style={{ backgroundColor: activity.iconBackground }}>
                  <MaterialIcons name={activity.icon} size={22} color={activity.iconTint} />
                </ActivityIcon>
                <ActivityInfo>
                  <ActivityLabel>{activity.label}</ActivityLabel>
                  <ActivityMeta>
                    {activity.durationMinutes} min - {activity.calories} kcal
                  </ActivityMeta>
                </ActivityInfo>
                <MaterialIcons name="chevron-right" size={22} color="#9ca3af" />
              </ActivityRow>
            ))}
          </CardContent>
          <CardFooter>
            <FooterHeading>Synced Data</FooterHeading>
            {syncedMetrics.slice(0, 1).map((metric) => (
              <SyncedRow key={metric.id}>
                <ActivityIcon style={{ backgroundColor: '#dbeafe' }}>
                  <MaterialIcons name="directions-walk" size={22} color="#2563eb" />
                </ActivityIcon>
                <ActivityInfo>
                  <ActivityLabel>{metric.label}</ActivityLabel>
                  <ActivityMeta>{metric.value}</ActivityMeta>
                </ActivityInfo>
                <SyncedValue>{metric.calories} kcal</SyncedValue>
              </SyncedRow>
            ))}
          </CardFooter>
        </Card>
      </Section>

      <Section>
        <SectionTitle>Weekly Summary</SectionTitle>
        <Card style={{ marginTop: 16 }}>
          <SummaryHeader>
            <SummaryColumn>
              <SummaryLabel>Total Calories Burned</SummaryLabel>
              <SummaryValue>2,430</SummaryValue>
            </SummaryColumn>
            <SummaryTrend>
              <MaterialIcons name="trending-up" size={18} color="#16a34a" />
              <SummaryTrendLabel>8%</SummaryTrendLabel>
            </SummaryTrend>
          </SummaryHeader>
          <ChartWrapper>
            <ActivityTrendChart />
          </ChartWrapper>
          <SummaryGrid>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, index) => (
              <SummaryCard key={label} $span={index === 6}>
                <SummaryCardLabel>{label}</SummaryCardLabel>
                <SummaryCardValue>
                  {['320', '280', '410', '360', '400', '480', '280'][index]} kcal
                </SummaryCardValue>
              </SummaryCard>
            ))}
          </SummaryGrid>
        </Card>
      </Section>

      <Section>
        <SectionTitle>Add New Activity</SectionTitle>
        <Card style={{ marginTop: 16 }}>
          <SearchField>
            <MaterialIcons name="search" size={20} color="#9ca3af" />
            <SearchInput placeholder="Search for an activity..." />
          </SearchField>
          <FormRow>
            <FormField>
              <FieldLabel>Duration (min)</FieldLabel>
              <StyledInput keyboardType="numeric" defaultValue="30" />
            </FormField>
            <FormField>
              <FieldLabel>Intensity</FieldLabel>
              <StyledInput defaultValue="Medium" />
            </FormField>
          </FormRow>
          <PrimaryButton>
            <PrimaryButtonLabel>Log Activity</PrimaryButtonLabel>
          </PrimaryButton>
        </Card>
      </Section>

      <Section>
        <SectionTitle>Yesterday</SectionTitle>
        <Card style={{ marginTop: 16 }}>
          <CardContent>
            {yesterdayActivities.map((activity, index) => (
              <ActivityRow
                key={activity.id}
                $hasDivider={index < yesterdayActivities.length - 1}
              >
                <ActivityIcon style={{ backgroundColor: activity.iconBackground }}>
                  <MaterialIcons name={activity.icon} size={22} color={activity.iconTint} />
                </ActivityIcon>
                <ActivityInfo>
                  <ActivityLabel>{activity.label}</ActivityLabel>
                  <ActivityMeta>
                    {activity.durationMinutes} min - {activity.calories} kcal
                  </ActivityMeta>
                </ActivityInfo>
                <MaterialIcons name="chevron-right" size={22} color="#9ca3af" />
              </ActivityRow>
            ))}
          </CardContent>
          <CardFooter>
            <FooterHeading>Synced Data</FooterHeading>
            {syncedMetrics.slice(1).map((metric) => (
              <SyncedRow key={metric.id}>
                <ActivityIcon style={{ backgroundColor: '#dbeafe' }}>
                  <MaterialIcons name="directions-walk" size={22} color="#2563eb" />
                </ActivityIcon>
                <ActivityInfo>
                  <ActivityLabel>{metric.label}</ActivityLabel>
                  <ActivityMeta>{metric.value}</ActivityMeta>
                </ActivityInfo>
                <SyncedValue>{metric.calories} kcal</SyncedValue>
              </SyncedRow>
            ))}
          </CardFooter>
        </Card>
      </Section>
    </ScrollView>
  );
}

const Section = styled(View)`
  padding: 20px 16px 0 16px;
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

const PrimaryPill = styled.Pressable`
  flex-direction: row;
  align-items: center;
  background-color: ${LOG_PRIMARY_COLOR};
  border-radius: 999px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
`;

const PrimaryPillLabel = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #111827;
`;

const Card = styled(View)`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 12px 16px 16px 16px;
  shadow-color: #0f172a;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 2;
`;

const CardContent = styled(View)`
  margin-bottom: 12px;
`;

const ActivityRow = styled(View)<{ $hasDivider: boolean }>`
  flex-direction: row;
  align-items: center;
  padding-vertical: 12px;
  border-bottom-width: ${({ $hasDivider }) => ($hasDivider ? 1 : 0)}px;
  border-color: #f3f4f6;
`;

const ActivityIcon = styled(View)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const ActivityInfo = styled(View)`
  flex: 1;
`;

const ActivityLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const ActivityMeta = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
`;

const SyncedValue = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const CardFooter = styled(View)`
  border-top-width: 1px;
  border-color: #f3f4f6;
  padding-top: 12px;
  gap: 12px;
`;

const FooterHeading = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
`;

const SyncedRow = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const SummaryHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SummaryColumn = styled(View)`
  gap: 4px;
`;

const SummaryLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
`;

const SummaryValue = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
`;

const SummaryTrend = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const SummaryTrendLabel = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #16a34a;
`;

const ChartWrapper = styled(View)`
  height: 200px;
  margin-top: 16px;
`;

const SummaryGrid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
`;

const SummaryCard = styled(View)<{ $span: boolean }>`
  width: ${({ $span }) => ($span ? '100%' : '31%')};
  background-color: #f3f4f6;
  border-radius: 16px;
  padding: 12px;
  align-items: center;
`;

const SummaryCardLabel = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
`;

const SummaryCardValue = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #111827;
`;

const SearchField = styled(View)`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #e5e7eb;
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 16px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 8px;
  font-size: 14px;
  color: #1f2937;
`;

const FormRow = styled(View)`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
`;

const FormField = styled(View)`
  flex: 1;
`;

const FieldLabel = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 6px;
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

const StyledInput = styled(TextInput)`
  border-width: 1px;
  border-color: #e5e7eb;
  border-radius: 12px;
  padding-vertical: 12px;
  padding-horizontal: 12px;
  font-size: 14px;
  color: #1f2937;
`;


/// <reference types="node" />

import { strict as assert } from 'node:assert';

import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import type { ReactTestInstance } from 'react-test-renderer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AccountSettingsScreen } from '../src/features/profile/screens/AccountSettingsScreen';
import { CoreSettingsScreen } from '../src/features/profile/screens/CoreSettingsScreen';
import { DataConnectionsScreen } from '../src/features/profile/screens/DataConnectionsScreen';
import { NotificationsSettingsScreen } from '../src/features/profile/screens/NotificationsSettingsScreen';

const INITIAL_METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 24, bottom: 16, left: 0, right: 0 },
};

function renderWithSafeArea(element: React.ReactElement) {
  let renderer: TestRenderer.ReactTestRenderer | undefined;
  act(() => {
    renderer = TestRenderer.create(
      <SafeAreaProvider initialMetrics={INITIAL_METRICS}>{element}</SafeAreaProvider>,
    );
  });
  if (!renderer) {
    throw new Error('Failed to render component under test');
  }
  return renderer;
}

function findByText(root: TestRenderer.ReactTestInstance, text: string): ReactTestInstance {
  return root.find(
    (node: ReactTestInstance) => typeof node.props?.children === 'string' && node.props.children === text,
  );
}

export function runProfileScreenTests(): void {
  // Account screen defaults to the overview tab.
  const accountRenderer = renderWithSafeArea(<AccountSettingsScreen showBottomNav={false} />);
  const overviewNameNode = findByText(accountRenderer.root, 'Leslie Alexander');
  assert(overviewNameNode, 'Expected account overview to render member name');

  const securityTabButton = accountRenderer.root.findByProps({ testID: 'profile-tab-security' });
  act(() => {
    securityTabButton.props.onPress();
  });
  const securityToggle = findByText(accountRenderer.root, 'Two-factor authentication');
  assert(securityToggle, 'Expected security tab content after switching tabs');

  // Core settings should include the measurement units row.
  const coreRenderer = renderWithSafeArea(<CoreSettingsScreen showBottomNav={false} />);
  const weightUnitsRow = findByText(coreRenderer.root, 'Weight units');
  assert(weightUnitsRow, 'Expected core settings to list weight units option');

  // Notifications screen renders switches for push meal reminders.
  const notificationsRenderer = renderWithSafeArea(
    <NotificationsSettingsScreen showBottomNav={false} />,
  );
  const mealToggleLabel = findByText(notificationsRenderer.root, 'Meal logging');
  assert(mealToggleLabel, 'Expected notifications page to include meal logging toggle');

  // Data connections show a status pill for Apple Health.
  const dataRenderer = renderWithSafeArea(<DataConnectionsScreen showBottomNav={false} />);
  const appleHealthRow = findByText(dataRenderer.root, 'Apple Health');
  assert(appleHealthRow, 'Expected data connections to list Apple Health integration');

  console.info('Profile screen smoke tests passed.');
}

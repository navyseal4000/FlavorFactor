import Module from 'node:module';
import { strict as assert } from 'node:assert';
import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';

// Ensure JSX compiled with the legacy React Native transform can resolve the global React symbol.
(globalThis as { React?: typeof React }).React = React;

const originalRequire = Module.prototype.require;
const capturedBottomNavProps: unknown[] = [];

Module.prototype.require = function patchedRequire(specifier: string) {
  if (specifier === 'react-native') {
    const ReactNamespace = require('react');
    class MockAnimatedValue {
      private current: number;

      constructor(initial: number) {
        this.current = initial;
      }

      setValue(value: number) {
        this.current = value;
      }

      interpolate({ outputRange }: { inputRange: number[]; outputRange: number[] }) {
        return outputRange[0] ?? 0;
      }
    }

    const Animated = {
      Value: MockAnimatedValue,
      timing: (value: MockAnimatedValue, { toValue }: { toValue: number }) => ({
        start: (callback?: (result: { finished: boolean }) => void) => {
          value.setValue(toValue);
          callback?.({ finished: true });
        },
      }),
      View: (props: React.PropsWithChildren<Record<string, unknown>>) =>
        ReactNamespace.createElement('div', props, props.children),
    };

    const Pressable = ({ onPress, children, ...rest }: any) =>
      ReactNamespace.createElement(
        'button',
        {
          ...rest,
          onClick: () => onPress?.(),
        },
        children,
      );

    const ScrollView = ({ children, ...rest }: any) =>
      ReactNamespace.createElement('div', rest, children);

    const FlatList = ({ data = [], renderItem, ItemSeparatorComponent, ...rest }: any) => {
      const items = (data as any[]).flatMap((item, index) => {
        const rendered = renderItem({ item, index });
        const separator = ItemSeparatorComponent ?
          ReactNamespace.createElement(ItemSeparatorComponent, { key: `${index}-sep` }) :
          null;
        return [
          ReactNamespace.cloneElement(rendered, { key: item.id ?? index }),
          separator,
        ];
      });
      return ReactNamespace.createElement('div', rest, items);
    };

    return {
      View: (props: any) => ReactNamespace.createElement('div', props, props.children),
      Text: (props: any) => ReactNamespace.createElement('span', props, props.children),
      Pressable,
      ScrollView,
      FlatList,
      Animated,
      useWindowDimensions: () => ({ width: 375, height: 812 }),
      StyleSheet: { create: (styles: unknown) => styles },
    };
  }

  if (specifier.startsWith('react-native/')) {
    return {};
  }

  if (specifier === 'react-native-safe-area-context') {
    const ReactNamespace = require('react');
    return {
      SafeAreaProvider: ({ children }: React.PropsWithChildren) =>
        ReactNamespace.createElement(ReactNamespace.Fragment, null, children),
      useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    };
  }

  if (specifier.startsWith('react-native-safe-area-context/')) {
    return {};
  }

  if (specifier === 'expo-router') {
    return {
      useRouter: () => ({ replace: () => undefined }),
      usePathname: () => '/coach/progress',
    };
  }

  if (specifier === '@expo/vector-icons') {
    const ReactNamespace = require('react');
    return {
      MaterialIcons: ({ name, color, size }: { name: string; color?: string; size?: number }) =>
        ReactNamespace.createElement('span', { 'data-icon': name, style: { color, fontSize: size } }),
    };
  }

  if (specifier.endsWith('/components/navigation/BottomNav')) {
    return {
      BottomNav: (props: unknown) => {
        capturedBottomNavProps.push(props);
        return null;
      },
    };
  }

  return originalRequire.apply(this, [specifier]);
};

async function testCoachLayout(): Promise<void> {
  const { CoachLayout } = await import('../../src/features/coach/components/CoachLayout');

  capturedBottomNavProps.length = 0;

  const SafeAreaProviderMock = ({ children }: React.PropsWithChildren) => (
    <React.Fragment>{children}</React.Fragment>
  );

  let tree: TestRenderer.ReactTestRenderer;
  await act(async () => {
    tree = TestRenderer.create(
      <SafeAreaProviderMock>
        <CoachLayout activeTab="progress">
          <React.Fragment />
        </CoachLayout>
      </SafeAreaProviderMock>,
    );
  });

  const header = tree!.root.findAll((node) => {
    if (node.props.accessibilityRole !== 'header') return false;
    const child = node.props.children;
    if (Array.isArray(child)) {
      return child.includes('Coach');
    }
    return child === 'Coach';
  });
  assert.ok(header.length >= 1, 'renders the Coach header title');

  assert.ok(capturedBottomNavProps.length > 0, 'BottomNav rendered with captured props');
  const [bottomNavProps] = capturedBottomNavProps as Array<{ activeKey?: string }>;
  assert.equal(bottomNavProps.activeKey, 'coach', 'BottomNav is pinned to the coach tab');
}

async function testCoachProgressTabs(): Promise<void> {
  const { CoachProgressPage } = await import('../../src/features/coach/pages/CoachProgressPage');

  let tree: TestRenderer.ReactTestRenderer;
  await act(async () => {
    tree = TestRenderer.create(<CoachProgressPage />);
  });
  const insightTabs = tree!.root.findAll(
    (node) => node.props.accessibilityLabel === 'Insights section',
  );
  const memberTabs = tree!.root.findAll(
    (node) => node.props.accessibilityLabel === 'Members section',
  );
  assert.ok(insightTabs.length > 0, 'progress page exposes an insights section tab');
  assert.ok(memberTabs.length > 0, 'progress page exposes a members section tab');
  const [insightsTab] = insightTabs;
  const [membersTab] = memberTabs;

  assert.equal(
    insightsTab.props.accessibilityState.selected,
    true,
    'insights tab is active by default',
  );

  await act(async () => {
    membersTab.props.onPress();
  });

  const refreshedMembersTab = tree!
    .root
    .findAll((node) => node.props.accessibilityLabel === 'Members section')[0];
  assert.equal(refreshedMembersTab.props.accessibilityState.selected, true, 'members tab becomes selected after press');
}

async function testCoachChatMessages(): Promise<void> {
  const { CoachChatPage } = await import('../../src/features/coach/pages/CoachChatPage');
  const { coachConversation } = await import('../../src/features/coach/mockData');

  let tree: TestRenderer.ReactTestRenderer;
  await act(async () => {
    tree = TestRenderer.create(<CoachChatPage />);
  });
  const firstMessageBody = tree!.root.findAll(
    (node) => node.props.children === coachConversation[0].body,
  );
  assert.ok(firstMessageBody.length > 0, 'renders mock conversation content');
}

export async function runCoachScreenTests(): Promise<void> {
  try {
    await testCoachLayout();
    await testCoachProgressTabs();
    await testCoachChatMessages();
  } finally {
    Module.prototype.require = originalRequire;
  }
}

import { ReactElement } from 'react';
import { Pressable, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { palette, textColors } from '../../styles/palette';

type NavKey = 'home' | 'plan' | 'log' | 'coach' | 'profile';

export interface BottomNavItem {
  key: NavKey;
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  href: string;
}

export interface BottomNavProps {
  items?: BottomNavItem[];
  activeKey?: NavKey;
}

const DEFAULT_ITEMS: BottomNavItem[] = [
  { key: 'home', label: 'Home', icon: 'home', href: '/home' },
  { key: 'plan', label: 'Plan', icon: 'calendar-month', href: '/plan/plan-shop-dashboard-weekly' },
  { key: 'log', label: 'Log', icon: 'edit-note', href: '/log' },
  { key: 'coach', label: 'Coach', icon: 'chat', href: '/coach/progress' },
  { key: 'profile', label: 'Profile', icon: 'person', href: '/settings/account' },
];

export function BottomNav({ items = DEFAULT_ITEMS, activeKey }: BottomNavProps): ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const { bottom } = useSafeAreaInsets();

  const currentKey =
    activeKey ??
    items.find((item) => pathname?.startsWith(item.href))?.key ??
    ('log' as NavKey);

  function handlePress(item: BottomNavItem) {
    if (pathname === item.href) return;
    router.replace(item.href as never);
  }

  return (
    <Container style={{ paddingBottom: Math.max(bottom, 12) }}>
      <NavBar>
        {items.map((item) => {
          const isActive = item.key === currentKey;
          return (
            <NavItem
              key={item.key}
              onPress={() => handlePress(item)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <MaterialIcons
                name={item.icon}
                size={24}
                color={isActive ? palette.brand.lime500 : textColors.secondary}
                style={{ marginBottom: 4 }}
              />
              <Label $active={isActive}>{item.label}</Label>
            </NavItem>
          );
        })}
      </NavBar>
    </Container>
  );
}

const Container = styled(View)`
  background-color: #ffffff;
  border-top-width: 1px;
  border-color: #e5e7eb;
`;

const NavBar = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 8px 12px 0 12px;
`;

const NavItem = styled(Pressable)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 6px;
  gap: 2px;
`;

const Label = styled.Text<{ $active: boolean }>`
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? '600' : '500')};
  color: ${({ $active }) => ($active ? textColors.primary : textColors.secondary)};
`;


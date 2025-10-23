import { ReactElement, useEffect, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { palette, textColors } from '../../styles/palette';
import { dailyPrepTasks } from '../../features/plan/mockData';
import { coachActionItems } from '../../features/coach/mockData';

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
  { key: 'coach', label: 'Support', icon: 'support-agent', href: '/coach/progress' },
  { key: 'profile', label: 'Settings', icon: 'settings', href: '/settings/account' },
];

const lastVisitedPathByKey: Partial<Record<NavKey, string>> = {};

export function BottomNav({ items = DEFAULT_ITEMS, activeKey }: BottomNavProps): ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const { bottom } = useSafeAreaInsets();
  const badgeMeta = useNavBadgeMeta();
  const itemsByKey = useMemo(
    () => items.reduce<Record<NavKey, BottomNavItem>>((acc, item) => {
      acc[item.key] = item;
      return acc;
    }, {} as Record<NavKey, BottomNavItem>),
    [items],
  );

  const currentKey =
    (items.find((item) => matchesHref(pathname, item.href))?.key as NavKey | undefined) ??
    activeKey ??
    ('home' as NavKey);

  useEffect(() => {
    if (!pathname || !currentKey) return;
    const navItem = itemsByKey[currentKey];
    if (!navItem) return;
    if (!matchesHref(pathname, navItem.href)) return;
    lastVisitedPathByKey[currentKey] = pathname;
  }, [pathname, currentKey, itemsByKey]);

  function handlePress(item: BottomNavItem) {
    const storedPath = lastVisitedPathByKey[item.key];
    const hasValidStored = storedPath ? matchesHref(storedPath, item.href) : false;
    const targetPath = hasValidStored ? storedPath! : item.href;

    if (pathname === targetPath) {
      if (targetPath !== item.href) {
        router.replace(item.href as never);
      }
      return;
    }

    router.replace(targetPath as never);
  }

  return (
    <Container style={{ paddingBottom: Math.max(bottom, 12) }}>
      <NavBar>
        {items.map((item) => {
          const isActive = item.key === currentKey;
          const badge = badgeMeta[item.key];
          const accessibilityLabel = badge?.count
            ? `${item.label}, ${badge.count} outstanding ${badge.noun}`
            : item.label;

          return (
            <NavItem
              key={item.key}
              onPress={() => handlePress(item)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={accessibilityLabel}
            >
              <IconContainer>
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={isActive ? palette.brand.lime500 : textColors.secondary}
                  style={{ marginBottom: 4 }}
                />
                {badge?.count ? (
                  <BadgeContainer>
                    <BadgeText>
                      {badge.count > 9 ? '9+' : badge.count}
                    </BadgeText>
                  </BadgeContainer>
                ) : null}
              </IconContainer>
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

const IconContainer = styled(View)`
  position: relative;
  align-items: center;
  justify-content: center;
`;

const BadgeContainer = styled(View)`
  position: absolute;
  top: -2px;
  right: -10px;
  min-width: 18px;
  padding: 1px 5px;
  border-radius: 10px;
  background-color: ${palette.brand.lime500};
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled.Text`
  font-size: 10px;
  font-weight: 700;
  color: #111827;
`;

function useNavBadgeMeta(): Record<NavKey, { count: number; noun: string } | undefined> {
  return useMemo(() => {
    const outstandingPrep = dailyPrepTasks.filter((task) => !task.completed).length;
    const outstandingSupport = coachActionItems.length;

    return {
      home: undefined,
      plan: outstandingPrep
        ? { count: outstandingPrep, noun: outstandingPrep === 1 ? 'task' : 'tasks' }
        : undefined,
      log: undefined,
      coach: outstandingSupport
        ? { count: outstandingSupport, noun: outstandingSupport === 1 ? 'follow-up' : 'follow-ups' }
        : undefined,
      profile: undefined,
    };
  }, []);
}

function matchesHref(path: string | null | undefined, href: string): boolean {
  if (!path) return false;
  if (path === href) return true;

  const segments = href.split('/').filter(Boolean);
  if (segments.length === 0) {
    return path === '/';
  }

  const base = `/${segments[0]}`;
  if (path === base) return true;
  return path.startsWith(`${base}/`);
}


import { Link } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { designManifest, type DesignCategory } from '@modules/design/manifest';
import { Text } from '@common/typography';

const CATEGORY_TITLES: Record<DesignCategory, string> = {
  home: 'Home',
  onboarding: 'Onboarding',
  log: 'Tracking & Logging',
  plan: 'Plan & Shop',
  settings: 'Settings',
  coach: 'Coach Tools',
};

export default function DesignLibraryScreen() {
  const grouped = useMemo(() => {
    return designManifest.reduce<Record<DesignCategory, typeof designManifest>>(
      (acc, entry) => {
        acc[entry.category] = acc[entry.category] || [];
        acc[entry.category].push(entry);
        return acc;
      },
      {
        home: [],
        onboarding: [],
        log: [],
        plan: [],
        settings: [],
        coach: [],
      },
    );
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text
        size={32}
        color="gray800"
        align="center"
      >
        Design Library
      </Text>
      <Text
        size={16}
        color="gray"
        align="center"
        marginTop={12}
      >
        Explore exported prototypes for every major screen in the application.
      </Text>
      <View style={styles.groups}>
        {(Object.keys(CATEGORY_TITLES) as DesignCategory[]).map((category) => {
          const screens = grouped[category];

          return (
            <View
              key={category}
              style={styles.group}
            >
              <Text
                size={24}
                color="gray800"
              >
                {CATEGORY_TITLES[category]}
              </Text>
              <View style={styles.links}>
                {screens.map((screen) => (
                  <Link
                    key={screen.route}
                    href={screen.route}
                    style={styles.link}
                  >
                    <Text
                      size={20}
                      color="primary"
                    >
                      {screen.title}
                    </Text>
                    {screen.description ? (
                      <Text
                        size={16}
                        color="gray"
                      >
                        {screen.description}
                      </Text>
                    ) : null}
                  </Link>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  group: {
    gap: 16,
  },
  groups: {
    gap: 32,
    marginTop: 32,
  },
  link: {
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  links: {
    gap: 12,
  },
});

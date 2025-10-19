import { Link } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { designManifest } from '@modules/design/manifest';
import { Text } from '@common/typography';

export default function SettingsDirectoryScreen() {
  const settingsScreens = useMemo(
    () => designManifest.filter((entry) => entry.category === 'settings'),
    [],
  );

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
        Settings Library
      </Text>
      <Text
        size={16}
        color="gray"
        align="center"
        marginTop={12}
      >
        Choose a screen to open its interactive prototype or screenshot.
      </Text>
      <View style={styles.list}>
        {settingsScreens.map((screen) => (
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
            <Text
              size={16}
              color="gray"
            >
              {screen.description ?? 'Preview the detailed configuration flow.'}
            </Text>
          </Link>
        ))}
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
  link: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  list: {
    gap: 16,
    marginTop: 24,
  },
});

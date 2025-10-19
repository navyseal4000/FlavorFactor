import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Asset } from 'expo-asset';
import WebViewComponent from 'react-native-webview';

import { Button } from '@common/interaction';
import { Text } from '@common/typography';

export type DesignPreviewMode = 'html' | 'image';

export type DesignPreviewProps = {
  /**
   * Local HTML asset generated from the provided design specification.
   * The asset must be statically analyzable by Metro, so pass the raw
   * result of a `require()` call (e.g. `require('../../design/foo.html')`).
   */
  asset: number;
  /**
   * Optional static PNG screenshot of the screen. When provided, users can
   * switch between the HTML prototype and the screenshot representation.
   */
  fallbackImage?: number;
  /**
   * Descriptive title rendered at the top of the preview. The title also helps
   * automated tests verify that the expected screen is loaded.
   */
  title: string;
  /**
   * Optional summary that gives additional context about how to interpret the
   * prototype.
   */
  description?: string;
};

/**
 * DesignPreview renders HTML prototypes that were exported from the design
 * team. The component downloads the static asset, exposes an optional PNG
 * fallback, and surfaces a toggle so that contributors can switch between
 * different representations of the same UI concept.
 */
export function DesignPreview({
  asset,
  fallbackImage,
  title,
  description,
}: DesignPreviewProps) {
  const [mode, setMode] = useState<DesignPreviewMode>('html');
  const [uri, setUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAsset() {
      setIsLoading(true);
      setError(null);

      try {
        const htmlAsset = Asset.fromModule(asset);
        if (!htmlAsset.localUri) {
          await htmlAsset.downloadAsync();
        }

        if (isMounted) {
          setUri(htmlAsset.localUri ?? htmlAsset.uri);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadAsset();

    return () => {
      isMounted = false;
    };
  }, [asset]);

  useEffect(() => {
    if (mode === 'image' && !fallbackImage) {
      setMode('html');
    }
  }, [mode, fallbackImage]);

  const toggleLabel = useMemo(() => {
    return mode === 'html' ? 'View Screenshot' : 'View Interactive Mock';
  }, [mode]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text
          size={24}
          color="gray800"
        >
          {title}
        </Text>
        {description ? (
          <Text
            size={16}
            color="gray"
            marginTop={8}
          >
            {description}
          </Text>
        ) : null}
        {fallbackImage ? (
          <Button
            variant="secondary"
            style={styles.toggleButton}
            onPress={() => {
              setMode((prev) => (prev === 'html' ? 'image' : 'html'));
            }}
          >
            {toggleLabel}
          </Button>
        ) : null}
      </View>
      <View style={styles.previewArea}>
        {isLoading ? (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" />
          </View>
        ) : error ? (
          <View style={styles.centerContent}>
            <Text
              size={16}
              color="gray"
              align="center"
            >
              {`Unable to load the prototype.\n${error}`}
            </Text>
            {fallbackImage ? (
              <Button
                style={styles.retryButton}
                variant="secondary"
                onPress={() => {
                  setMode('image');
                }}
              >
                View Screenshot
              </Button>
            ) : null}
          </View>
        ) : mode === 'image' && fallbackImage ? (
          <ScrollView
            contentContainerStyle={styles.imageScrollContent}
            style={styles.flex}
            maximumZoomScale={3}
            minimumZoomScale={1}
          >
            <Image
              source={fallbackImage}
              resizeMode="contain"
              style={styles.image}
            />
          </ScrollView>
        ) : uri ? (
          <WebViewComponent
            source={{ uri }}
            originWhitelist={['*']}
            style={styles.flex}
            startInLoadingState
          />
        ) : (
          <View style={styles.centerContent}>
            <Text
              size={16}
              color="gray"
            >
              No preview available.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  image: {
    aspectRatio: 9 / 16,
    width: '100%',
  },
  imageScrollContent: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  previewArea: {
    borderTopColor: '#E2E8F0',
    borderTopWidth: StyleSheet.hairlineWidth,
    flex: 1,
  },
  retryButton: {
    marginTop: 16,
  },
  screen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  toggleButton: {
    alignSelf: 'flex-start',
    marginTop: 16,
  },
});

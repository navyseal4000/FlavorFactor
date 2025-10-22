import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Asset } from 'expo-asset';
import WebViewComponent from 'react-native-webview';
import { useRouter } from 'expo-router';

import { Button } from '@common/interaction';
import { Text } from '@common/typography';

export type DesignPreviewProps = {
  /**
   * Local HTML asset generated from the provided design specification.
   * The asset must be statically analyzable by Metro, so pass the raw
   * result of a `require()` call (e.g. `require('../../design/foo.html')`).
   */
  asset: number;
  /**
   * Optional static PNG screenshot of the screen. Currently unused now that we always render HTML.
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
  /**
   * When provided, renders a footer button that navigates to the supplied route.
   */
  nextRoute?: string;
  /**
   * Custom label for the footer button when `nextRoute` is present.
   */
  nextLabel?: string;
};

/**
 * DesignPreview renders HTML prototypes that were exported from the design
 * team. The component downloads the static asset and presents it in a WebView.
 */
export function DesignPreview({
  asset,
  fallbackImage: _fallbackImage,
  title,
  description,
  nextRoute,
  nextLabel,
}: DesignPreviewProps) {
  const [uri, setUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  function handleContinue() {
    if (!nextRoute || isNavigating) return;

    setIsNavigating(true);
    Promise.resolve(router.replace(nextRoute))
      .catch((navigationError) => {
        console.error('Failed to navigate to next onboarding step', navigationError);
      })
      .finally(() => {
        setIsNavigating(false);
      });
  }

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
          </View>
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
      {nextRoute ? (
        <View style={styles.footer}>
          <Button
            onPress={handleContinue}
            isDisabled={isLoading || isNavigating}
            isLoading={isNavigating}
            style={styles.footerButton}
          >
            {nextLabel || 'Continue'}
          </Button>
        </View>
      ) : null}
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
  footer: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E2E8F0',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  footerButton: {
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  previewArea: {
    borderTopColor: '#E2E8F0',
    borderTopWidth: StyleSheet.hairlineWidth,
    flex: 1,
  },
  screen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

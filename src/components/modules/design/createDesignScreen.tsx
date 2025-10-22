import type { ComponentType } from 'react';

import { DesignPreview, DesignPreviewProps } from './DesignPreview';

/**
 * Helper factory that allows each Expo Router screen to render a `DesignPreview`
 * without repeating boilerplate. Screens simply call this function with their
 * statically analyzable assets and we take care of the remainder.
 */
export function createDesignScreen(
  asset: DesignPreviewProps['asset'],
  title: DesignPreviewProps['title'],
  options: Pick<DesignPreviewProps, 'fallbackImage' | 'description' | 'nextRoute' | 'nextLabel'> = {},
): ComponentType {
  const Screen = () => (
    <DesignPreview
      asset={asset}
      title={title}
      fallbackImage={options.fallbackImage}
      description={options.description}
      nextRoute={options.nextRoute}
      nextLabel={options.nextLabel}
    />
  );

  Screen.displayName = `${title.replace(/\s+/g, '')}DesignScreen`;

  return Screen;
}

/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Analytics and Trends.html'),
  'Analytics & Trends',
  {
    fallbackImage: require('../../assets/design/settings/Analytics and Trends.png'),
  },
);

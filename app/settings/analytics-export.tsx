/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Analytics and Trends - Export Data.html'),
  'Analytics & Trends – Export',
  {
    fallbackImage: require('../../assets/design/settings/Analytics and Trends - Export Data.png'),
  },
);

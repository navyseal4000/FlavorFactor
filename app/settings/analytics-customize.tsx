/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Analytics and Trends - Customize Analytics View.html'),
  'Analytics & Trends – Customise',
  {
    fallbackImage: require('../../assets/design/settings/Analytics and Trends - Customize Analytics View.png'),
  },
);

/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Core Settings.html'),
  'Core Settings',
  {
    fallbackImage: require('../../assets/design/settings/Core Settings.png'),
  },
);

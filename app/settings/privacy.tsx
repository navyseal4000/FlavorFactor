/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Privacy Settings.html'),
  'Privacy Settings',
  {
    fallbackImage: require('../../assets/design/settings/Privacy Settings.png'),
  },
);

/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Account Settings.html'),
  'Account Settings',
  {
    fallbackImage: require('../../assets/design/settings/Account Settings.png'),
  },
);

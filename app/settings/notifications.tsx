/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Notifications Settings.html'),
  'Notification Settings',
  {
    fallbackImage: require('../../assets/design/settings/Notifications Settings.png'),
  },
);

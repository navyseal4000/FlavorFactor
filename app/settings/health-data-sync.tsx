/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Health Data Sync.html'),
  'Health Data Sync',
  {
    fallbackImage: require('../../assets/design/settings/Health Data Sync.png'),
  },
);

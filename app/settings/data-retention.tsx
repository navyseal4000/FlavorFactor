/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Data Retention Policy.html'),
  'Data Retention Policy',
  {
    fallbackImage: require('../../assets/design/settings/Data Retention Policy.png'),
  },
);

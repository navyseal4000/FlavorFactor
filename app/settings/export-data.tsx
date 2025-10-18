/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Export Your Data.html'),
  'Export Your Data',
  {
    fallbackImage: require('../../assets/design/settings/Export Your Data.png'),
  },
);

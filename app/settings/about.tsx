/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/About.html'),
  'About',
  {
    fallbackImage: require('../../assets/design/settings/About.png'),
  },
);

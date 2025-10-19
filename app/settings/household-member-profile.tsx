/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Household Member Profile.html'),
  'Household Member Profile',
  {
    fallbackImage: require('../../assets/design/settings/Household Member Profile.png'),
  },
);

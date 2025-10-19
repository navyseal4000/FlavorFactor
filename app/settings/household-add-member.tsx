/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Household Add Member Profile.html'),
  'Household – Add Member Profile',
  {
    fallbackImage: require('../../assets/design/settings/Household Add Member Profile.png'),
  },
);

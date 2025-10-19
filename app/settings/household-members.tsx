/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Household Members.html'),
  'Household Members',
  {
    fallbackImage: require('../../assets/design/settings/Household Members.png'),
  },
);

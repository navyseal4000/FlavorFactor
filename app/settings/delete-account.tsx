/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Delete Account.html'),
  'Delete Account',
  {
    fallbackImage: require('../../assets/design/settings/Delete Account.png'),
  },
);

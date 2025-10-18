/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/settings/Household & GLP-1 Settings.html'),
  'Household & GLP-1 Settings',
  {
    fallbackImage: require('../../assets/design/settings/Household & GLP-1 Settings.png'),
  },
);

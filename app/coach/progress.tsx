/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/coach/Coach Progress Screen.html'),
  'Coach Progress Screen',
  {
    fallbackImage: require('../../assets/design/coach/Coach Progress Screen.png'),
    description: 'Progress reporting for coaches tracking member outcomes.',
  },
);

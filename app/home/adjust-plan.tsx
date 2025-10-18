/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/home/Adjust Plan.html'),
  'Adjust Plan',
  {
    fallbackImage: require('../../assets/design/home/Adjust Plan.png'),
    description: 'Flow for adjusting nutrition goals and recommended meals.',
  },
);

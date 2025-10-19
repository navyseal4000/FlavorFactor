/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/log/Tracking & Logging - Weight (1 Month).html'),
  'Weight Trend – 1 Month',
  {
    fallbackImage: require('../../assets/design/log/Tracking & Logging - Weight (1 Month).png'),
    description: 'Monthly weight tracking overview.',
  },
);

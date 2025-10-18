/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/log/Tracking & Logging - Activity.html'),
  'Activity Tracking',
  {
    fallbackImage: require('../../assets/design/log/Tracking & Logging - Activity.png'),
    description: 'Activity tracking summary cards and charts.',
  },
);

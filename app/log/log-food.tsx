/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/log/Log Food.html'),
  'Log Food',
  {
    fallbackImage: require('../../assets/design/log/Log Food.png'),
    description: 'Daily food logging interface.',
  },
);

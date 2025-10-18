/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/log/Log Food Add Food.html'),
  'Log Food – Add Food',
  {
    fallbackImage: require('../../assets/design/log/Log Food Add Food.png'),
    description: 'Search and add items to a meal log.',
  },
);

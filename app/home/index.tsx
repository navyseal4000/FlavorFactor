/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/home/Home Dashboard.html'),
  'Home Dashboard',
  {
    fallbackImage: require('../../assets/design/home/Home Dashboard.png'),
    description: 'Primary dashboard summarising progress and actionable shortcuts.',
  },
);

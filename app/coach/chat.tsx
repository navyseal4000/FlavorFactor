/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/coach/Coach Chat View.html'),
  'Coach Chat View',
  {
    fallbackImage: require('../../assets/design/coach/Coach Chat View.png'),
    description: 'Two-way communication with assigned coach.',
  },
);

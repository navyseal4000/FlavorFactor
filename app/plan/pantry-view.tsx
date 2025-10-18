/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/plan/Pantry View.html'),
  'Pantry View',
  {
    fallbackImage: require('../../assets/design/plan/Pantry View.png'),
    description: 'Inventory of pantry items to guide shopping.',
  },
);

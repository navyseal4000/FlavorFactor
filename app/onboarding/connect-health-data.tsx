/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/onboarding/Onboarding - Connect Health Data.html'),
  'Onboarding – Connect Health Data',
  {
    fallbackImage: require('../../assets/design/onboarding/Onboarding - Connect Health Data.png'),
    description: 'Promotes connecting external devices and health services.',
  },
);

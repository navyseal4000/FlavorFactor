/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/onboarding/Onboarding - Generate Plan.html'),
  'Onboarding – Generate Plan',
  {
    fallbackImage: require('../../assets/design/onboarding/Onboarding - Generate Plan.png'),
    description: 'Summary view before generating a personalised plan.',
  },
);

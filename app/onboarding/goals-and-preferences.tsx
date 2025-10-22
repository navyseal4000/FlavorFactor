/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/onboarding/Onboarding - Goals and Preferences.html'),
  'Onboarding - Goals and Preferences',
  {
    fallbackImage: require('../../assets/design/onboarding/Onboarding - Goals and Preferences.png'),
    description: 'Collects motivation, targets, and taste preferences.',
    nextRoute: '/onboarding/weigh-in-reminders',
    nextLabel: 'Next: Weigh-In Reminders',
  },
);

/* eslint-disable @typescript-eslint/no-var-requires */
import { createDesignScreen } from '@modules/design';

export default createDesignScreen(
  require('../../assets/design/onboarding/Onboarding - Weigh-In Reminders.html'),
  'Onboarding - Weigh-In Reminders',
  {
    fallbackImage: require('../../assets/design/onboarding/Onboarding - Weigh-In Reminders.png'),
    description: 'Schedules reminders that help members stay accountable.',
    nextRoute: '/onboarding/connect-health-data',
    nextLabel: 'Next: Connect Health Data',
  },
);

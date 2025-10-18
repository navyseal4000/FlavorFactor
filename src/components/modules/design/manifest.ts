export type DesignCategory =
  | 'home'
  | 'onboarding'
  | 'log'
  | 'plan'
  | 'settings'
  | 'coach';

export type DesignManifestEntry = {
  category: DesignCategory;
  /** Route that opens the corresponding Expo Router screen. */
  route: string;
  /** Human friendly title displayed across listings. */
  title: string;
  /** Optional descriptive copy that helps readers understand the goal. */
  description?: string;
  /** Relative path to the exported HTML asset. */
  htmlFile: string;
  /** Relative path to the exported PNG asset. */
  pngFile?: string;
};

/**
 * Centralised manifest for every exported UI prototype. The metadata enables
 * navigation menus, documentation, and automated tests to stay in sync with the
 * files that live under the `/assets/design` directory.
 */
export const designManifest: DesignManifestEntry[] = [
  {
    category: 'home',
    route: '/home',
    title: 'Home Dashboard',
    description: 'Primary dashboard summarising progress and quick actions.',
    htmlFile: 'assets/design/home/Home Dashboard.html',
    pngFile: 'assets/design/home/Home Dashboard.png',
  },
  {
    category: 'home',
    route: '/home/adjust-plan',
    title: 'Adjust Plan',
    description: 'Flow for adjusting nutrition goals and recommended meals.',
    htmlFile: 'assets/design/home/Adjust Plan.html',
    pngFile: 'assets/design/home/Adjust Plan.png',
  },
  {
    category: 'onboarding',
    route: '/onboarding/goals-and-preferences',
    title: 'Onboarding – Goals and Preferences',
    description: 'Collects motivation, targets, and taste preferences.',
    htmlFile: 'assets/design/onboarding/Onboarding - Goals and Preferences.html',
    pngFile: 'assets/design/onboarding/Onboarding - Goals and Preferences.png',
  },
  {
    category: 'onboarding',
    route: '/onboarding/weigh-in-reminders',
    title: 'Onboarding – Weigh-In Reminders',
    description: 'Schedules reminders that help members stay accountable.',
    htmlFile: 'assets/design/onboarding/Onboarding - Weigh-In Reminders.html',
    pngFile: 'assets/design/onboarding/Onboarding - Weigh-In Reminders.png',
  },
  {
    category: 'onboarding',
    route: '/onboarding/generate-plan',
    title: 'Onboarding – Generate Plan',
    description: 'Summary view before generating a personalised plan.',
    htmlFile: 'assets/design/onboarding/Onboarding - Generate Plan.html',
    pngFile: 'assets/design/onboarding/Onboarding - Generate Plan.png',
  },
  {
    category: 'onboarding',
    route: '/onboarding/connect-health-data',
    title: 'Onboarding – Connect Health Data',
    description: 'Promotes connecting external devices and health services.',
    htmlFile: 'assets/design/onboarding/Onboarding - Connect Health Data.html',
    pngFile: 'assets/design/onboarding/Onboarding - Connect Health Data.png',
  },
  {
    category: 'log',
    route: '/log/log-meal-micronutrients',
    title: 'Log Meal – Micronutrients',
    description: 'Detailed nutrient breakdown for a tracked meal.',
    htmlFile: 'assets/design/log/Log Meal Micronutrients.html',
    pngFile: 'assets/design/log/Log Meal Micronutrients.png',
  },
  {
    category: 'log',
    route: '/log/weight-7-days',
    title: 'Weight Trend – 7 Days',
    description: 'Short term weight trend analytics.',
    htmlFile: 'assets/design/log/Tracking & Logging - Weight (7 Days).html',
    pngFile: 'assets/design/log/Tracking & Logging - Weight (7 Days).png',
  },
  {
    category: 'log',
    route: '/log/weight-1-month',
    title: 'Weight Trend – 1 Month',
    description: 'Monthly weight tracking overview.',
    htmlFile: 'assets/design/log/Tracking & Logging - Weight (1 Month).html',
    pngFile: 'assets/design/log/Tracking & Logging - Weight (1 Month).png',
  },
  {
    category: 'log',
    route: '/log/weight-1-year',
    title: 'Weight Trend – 1 Year',
    description: 'Annualised weight history with progress markers.',
    htmlFile: 'assets/design/log/Tracking & Logging - Weight (1 Year).html',
    pngFile: 'assets/design/log/Tracking & Logging - Weight (1 Year).png',
  },
  {
    category: 'log',
    route: '/log/log-food-add',
    title: 'Log Food – Add Food',
    description: 'Search and add items to a meal log.',
    htmlFile: 'assets/design/log/Log Food Add Food.html',
    pngFile: 'assets/design/log/Log Food Add Food.png',
  },
  {
    category: 'log',
    route: '/log/log-food',
    title: 'Log Food',
    description: 'Daily food logging interface.',
    htmlFile: 'assets/design/log/Log Food.html',
    pngFile: 'assets/design/log/Log Food.png',
  },
  {
    category: 'log',
    route: '/log/log-meal',
    title: 'Log Meal',
    description: 'Quick meal logging workflow.',
    htmlFile: 'assets/design/log/Log Meal.html',
    pngFile: 'assets/design/log/Log Meal.png',
  },
  {
    category: 'log',
    route: '/log/activity',
    title: 'Activity Tracking',
    description: 'Activity tracking summary cards and charts.',
    htmlFile: 'assets/design/log/Tracking & Logging - Activity.html',
    pngFile: 'assets/design/log/Tracking & Logging - Activity.png',
  },
  {
    category: 'plan',
    route: '/plan/pantry-view',
    title: 'Pantry View',
    description: 'Inventory of pantry items to guide shopping.',
    htmlFile: 'assets/design/plan/Pantry View.html',
    pngFile: 'assets/design/plan/Pantry View.png',
  },
  {
    category: 'plan',
    route: '/plan/plan-shop-dashboard-daily',
    title: 'Plan & Shop Dashboard – Daily',
    description: 'Day level meal plan overview.',
    htmlFile: 'assets/design/plan/Plan & Shop Dashboard - Daily.html',
    pngFile: 'assets/design/plan/Plan & Shop Dashboard - Daily.png',
  },
  {
    category: 'plan',
    route: '/plan/plan-shop-cart-review',
    title: 'Plan & Shop – Cart Review',
    description: 'Checkout review for groceries and pantry restocks.',
    htmlFile: 'assets/design/plan/Plan & Shop - Cart Review.html',
    pngFile: 'assets/design/plan/Plan & Shop - Cart Review.png',
  },
  {
    category: 'plan',
    route: '/plan/plan-shop-dashboard-weekly',
    title: 'Plan & Shop Dashboard – Weekly',
    description: 'Weekly calendar of meals and shopping needs.',
    htmlFile: 'assets/design/plan/Plan & Shop Dashboard - Weekly.html',
    pngFile: 'assets/design/plan/Plan & Shop Dashboard - Weekly.png',
  },
  {
    category: 'settings',
    route: '/settings/privacy',
    title: 'Privacy Settings',
    htmlFile: 'assets/design/settings/Privacy Settings.html',
    pngFile: 'assets/design/settings/Privacy Settings.png',
  },
  {
    category: 'settings',
    route: '/settings/analytics-export',
    title: 'Analytics & Trends – Export',
    htmlFile: 'assets/design/settings/Analytics and Trends - Export Data.html',
    pngFile: 'assets/design/settings/Analytics and Trends - Export Data.png',
  },
  {
    category: 'settings',
    route: '/settings/account',
    title: 'Account Settings',
    htmlFile: 'assets/design/settings/Account Settings.html',
    pngFile: 'assets/design/settings/Account Settings.png',
  },
  {
    category: 'settings',
    route: '/settings/export-data',
    title: 'Export Your Data',
    htmlFile: 'assets/design/settings/Export Your Data.html',
    pngFile: 'assets/design/settings/Export Your Data.png',
  },
  {
    category: 'settings',
    route: '/settings/household-members',
    title: 'Household Members',
    htmlFile: 'assets/design/settings/Household Members.html',
    pngFile: 'assets/design/settings/Household Members.png',
  },
  {
    category: 'settings',
    route: '/settings/health-data-sync',
    title: 'Health Data Sync',
    htmlFile: 'assets/design/settings/Health Data Sync.html',
    pngFile: 'assets/design/settings/Health Data Sync.png',
  },
  {
    category: 'settings',
    route: '/settings/household-add-member',
    title: 'Household – Add Member Profile',
    htmlFile: 'assets/design/settings/Household Add Member Profile.html',
    pngFile: 'assets/design/settings/Household Add Member Profile.png',
  },
  {
    category: 'settings',
    route: '/settings/analytics-customize',
    title: 'Analytics & Trends – Customise',
    htmlFile:
      'assets/design/settings/Analytics and Trends - Customize Analytics View.html',
    pngFile:
      'assets/design/settings/Analytics and Trends - Customize Analytics View.png',
  },
  {
    category: 'settings',
    route: '/settings/core',
    title: 'Core Settings',
    htmlFile: 'assets/design/settings/Core Settings.html',
    pngFile: 'assets/design/settings/Core Settings.png',
  },
  {
    category: 'settings',
    route: '/settings/household-glp1',
    title: 'Household & GLP-1 Settings',
    htmlFile: 'assets/design/settings/Household & GLP-1 Settings.html',
    pngFile: 'assets/design/settings/Household & GLP-1 Settings.png',
  },
  {
    category: 'settings',
    route: '/settings/household-member-profile',
    title: 'Household Member Profile',
    htmlFile: 'assets/design/settings/Household Member Profile.html',
    pngFile: 'assets/design/settings/Household Member Profile.png',
  },
  {
    category: 'settings',
    route: '/settings/notifications',
    title: 'Notification Settings',
    htmlFile: 'assets/design/settings/Notifications Settings.html',
    pngFile: 'assets/design/settings/Notifications Settings.png',
  },
  {
    category: 'settings',
    route: '/settings/analytics',
    title: 'Analytics & Trends',
    htmlFile: 'assets/design/settings/Analytics and Trends.html',
    pngFile: 'assets/design/settings/Analytics and Trends.png',
  },
  {
    category: 'settings',
    route: '/settings/delete-account',
    title: 'Delete Account',
    htmlFile: 'assets/design/settings/Delete Account.html',
    pngFile: 'assets/design/settings/Delete Account.png',
  },
  {
    category: 'settings',
    route: '/settings/data-retention',
    title: 'Data Retention Policy',
    htmlFile: 'assets/design/settings/Data Retention Policy.html',
    pngFile: 'assets/design/settings/Data Retention Policy.png',
  },
  {
    category: 'settings',
    route: '/settings/about',
    title: 'About',
    htmlFile: 'assets/design/settings/About.html',
    pngFile: 'assets/design/settings/About.png',
  },
  {
    category: 'coach',
    route: '/coach/chat',
    title: 'Coach Chat View',
    description: 'Two-way communication with assigned coach.',
    htmlFile: 'assets/design/coach/Coach Chat View.html',
    pngFile: 'assets/design/coach/Coach Chat View.png',
  },
  {
    category: 'coach',
    route: '/coach/progress',
    title: 'Coach Progress Screen',
    description: 'Progress reporting for coaches tracking member outcomes.',
    htmlFile: 'assets/design/coach/Coach Progress Screen.html',
    pngFile: 'assets/design/coach/Coach Progress Screen.png',
  },
];

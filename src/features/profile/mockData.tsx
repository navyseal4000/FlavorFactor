import React, { type ReactElement } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { PROFILE_MUTED_TEXT_COLOR } from './constants';
import type {
  ProfileSection,
  ProfileTabScenes,
} from './types';

function createIcon(name: React.ComponentProps<typeof MaterialIcons>['name']): ReactElement {
  return <MaterialIcons name={name} size={20} color={PROFILE_MUTED_TEXT_COLOR} />;
}

const profileInfoSections: ProfileSection[] = [
  {
    id: 'profile-basics',
    title: 'Profile information',
    items: [
      {
        id: 'name',
        title: 'Full name',
        description: 'Used across coaching conversations and check-ins.',
        value: 'Leslie Alexander',
        icon: createIcon('badge'),
      },
      {
        id: 'email',
        title: 'Email',
        description: 'Where we send receipts and weekly summaries.',
        value: 'leslie.alexander@example.com',
        icon: createIcon('mail'),
      },
      {
        id: 'phone',
        title: 'Mobile number',
        description: 'For SMS reminders and two-factor login codes.',
        value: '+1 (555) 204-1032',
        icon: createIcon('phone-iphone'),
      },
    ],
  },
  {
    id: 'profile-membership',
    title: 'Membership',
    items: [
      {
        id: 'plan',
        title: 'Plan',
        description: 'Active subscription tier',
        value: 'Premium + Coaching',
        icon: createIcon('workspace-premium'),
      },
      {
        id: 'renewal',
        title: 'Renews on',
        description: 'Next billing cycle',
        value: 'March 28, 2025',
        icon: createIcon('event'),
      },
      {
        id: 'manage-subscription',
        type: 'navigation',
        title: 'Manage subscription',
        description: 'Update payment method or cancel your plan.',
        meta: 'Open billing portal',
        icon: createIcon('launch'),
      },
    ],
  },
];

const profileSecuritySections: ProfileSection[] = [
  {
    id: 'security-authentication',
    title: 'Authentication',
    description: 'Keep your account secure with up-to-date credentials.',
    items: [
      {
        id: 'password',
        type: 'navigation',
        title: 'Change password',
        description: 'Last updated 90 days ago',
        meta: 'Update',
        icon: createIcon('lock-reset'),
      },
      {
        id: 'two-factor',
        type: 'toggle',
        title: 'Two-factor authentication',
        description: 'Require a login code when signing in on new devices.',
        toggleValue: true,
        icon: createIcon('verified-user'),
      },
      {
        id: 'biometrics',
        type: 'toggle',
        title: 'Enable Face ID',
        description: 'Use biometrics for faster logins on this device.',
        toggleValue: false,
        icon: createIcon('face'),
      },
    ],
  },
  {
    id: 'security-alerts',
    title: 'Alerts',
    items: [
      {
        id: 'login-alerts',
        type: 'toggle',
        title: 'Login alerts',
        description: 'Get an email when someone signs in from a new device.',
        toggleValue: true,
        icon: createIcon('notifications-active'),
      },
      {
        id: 'weekly-summary',
        type: 'toggle',
        title: 'Weekly security summary',
        description: 'Digest of security events and active sessions.',
        toggleValue: false,
        icon: createIcon('rule-folder'),
      },
    ],
  },
];

const coreSettingsSections: ProfileSection[] = [
  {
    id: 'core-measurements',
    title: 'Measurements',
    description: 'Control how metrics are displayed across the app.',
    items: [
      {
        id: 'weight-units',
        type: 'navigation',
        title: 'Weight units',
        description: 'Switch between pounds or kilograms.',
        value: 'Pounds (lb)',
        meta: 'Change',
        icon: createIcon('scale'),
      },
      {
        id: 'energy-units',
        type: 'navigation',
        title: 'Energy units',
        description: 'Choose calories or kilojoules.',
        value: 'Calories (kcal)',
        meta: 'Change',
        icon: createIcon('local-fire-department'),
      },
      {
        id: 'glucose-units',
        type: 'navigation',
        title: 'Glucose units',
        description: 'Used in health data sync and reporting.',
        value: 'mg/dL',
        meta: 'Change',
        icon: createIcon('bloodtype'),
      },
    ],
  },
  {
    id: 'core-reminders',
    title: 'Reminders',
    description: 'Fine tune reminder cadence to match your schedule.',
    items: [
      {
        id: 'meal-reminders',
        type: 'toggle',
        title: 'Meal reminders',
        description: 'Prompt logging breakfast, lunch, and dinner.',
        toggleValue: true,
        icon: createIcon('restaurant-menu'),
      },
      {
        id: 'weigh-in-reminders',
        type: 'toggle',
        title: 'Weigh-in reminders',
        description: 'Encourage weekly progress check-ins.',
        toggleValue: true,
        icon: createIcon('monitor-weight'),
      },
      {
        id: 'coach-messages',
        type: 'toggle',
        title: 'Coach nudges',
        description: 'Allow your coach to send motivational reminders.',
        toggleValue: true,
        icon: createIcon('support-agent'),
      },
    ],
  },
];

const notificationSettingsSections: ProfileSection[] = [
  {
    id: 'notifications-push',
    title: 'Push notifications',
    description: 'Delivered instantly to your device.',
    items: [
      {
        id: 'push-meals',
        type: 'toggle',
        title: 'Meal logging',
        description: 'Reminders and confirmations for meal tracking.',
        toggleValue: true,
        icon: createIcon('ramen-dining'),
      },
      {
        id: 'push-activity',
        type: 'toggle',
        title: 'Activity sync',
        description: 'Highlights new activity detected from connected devices.',
        toggleValue: true,
        icon: createIcon('directions-run'),
      },
      {
        id: 'push-weight',
        type: 'toggle',
        title: 'Weight milestones',
        description: 'Celebrate streaks and progress milestones.',
        toggleValue: true,
        icon: createIcon('emoji-events'),
      },
    ],
  },
  {
    id: 'notifications-email',
    title: 'Email digests',
    description: 'Scheduled summaries you can read on your time.',
    items: [
      {
        id: 'email-weekly',
        type: 'toggle',
        title: 'Weekly summary',
        description: 'Nutrition, activity, and weight highlights.',
        toggleValue: true,
        icon: createIcon('move-up'),
      },
      {
        id: 'email-monthly',
        type: 'toggle',
        title: 'Monthly reflection',
        description: 'Longer term trends with coaching insights.',
        toggleValue: false,
        icon: createIcon('calendar-month'),
      },
      {
        id: 'email-program',
        type: 'toggle',
        title: 'Program announcements',
        description: 'Feature releases and upcoming events.',
        toggleValue: true,
        icon: createIcon('campaign'),
      },
    ],
  },
];

const privacySettingsSections: ProfileSection[] = [
  {
    id: 'privacy-sharing',
    title: 'Sharing preferences',
    description: 'Control who can view your information.',
    items: [
      {
        id: 'coach-access',
        type: 'status',
        title: 'Coach data access',
        description: 'Allows your assigned coach to review logs and check-ins.',
        statusLabel: 'Enabled',
        statusTone: 'success',
        icon: createIcon('supervisor-account'),
      },
      {
        id: 'household-access',
        type: 'status',
        title: 'Household visibility',
        description: 'Share progress snapshots with trusted household members.',
        statusLabel: 'Limited',
        statusTone: 'info',
        icon: createIcon('family-restroom'),
      },
      {
        id: 'community-privacy',
        type: 'status',
        title: 'Community privacy',
        description: 'Hide name and photo in public community spaces.',
        statusLabel: 'Hidden',
        statusTone: 'default',
        icon: createIcon('groups'),
      },
    ],
  },
  {
    id: 'privacy-download',
    title: 'Data access',
    description: 'Manage exported data and connected services.',
    items: [
      {
        id: 'data-export',
        type: 'navigation',
        title: 'Export your data',
        description: 'Download a snapshot of logs, metrics, and chat history.',
        meta: 'Start export',
        icon: createIcon('file-download'),
      },
      {
        id: 'connections',
        type: 'navigation',
        title: 'Connected services',
        description: 'Review devices and integrations with access.',
        meta: 'Manage',
        icon: createIcon('hub'),
      },
    ],
  },
];

const dataConnectionSections: ProfileSection[] = [
  {
    id: 'sync-status',
    title: 'Connected apps',
    description: 'Sync new data automatically to keep logs fresh.',
    items: [
      {
        id: 'apple-health',
        type: 'status',
        title: 'Apple Health',
        description: 'Weight, steps, heart rate',
        statusLabel: 'Connected',
        statusTone: 'success',
        meta: 'Last sync 2 hours ago',
        icon: createIcon('favorite'),
      },
      {
        id: 'fitbit',
        type: 'status',
        title: 'Fitbit',
        description: 'Activity and sleep',
        statusLabel: 'Syncing…',
        statusTone: 'info',
        meta: 'Importing data',
        icon: createIcon('watch'),
      },
      {
        id: 'oura',
        type: 'status',
        title: 'Oura Ring',
        description: 'Recovery and readiness scores',
        statusLabel: 'Disconnected',
        statusTone: 'warning',
        meta: 'Reconnect to resume sync',
        icon: createIcon('bedtime'),
      },
    ],
  },
  {
    id: 'sync-preferences',
    title: 'Sync preferences',
    items: [
      {
        id: 'background-sync',
        type: 'toggle',
        title: 'Sync in background',
        description: 'Allow automatic updates even when the app is closed.',
        toggleValue: true,
        icon: createIcon('autorenew'),
      },
      {
        id: 'cellular-sync',
        type: 'toggle',
        title: 'Use cellular data',
        description: 'Sync while on cellular networks.',
        toggleValue: false,
        icon: createIcon('signal-cellular-off'),
      },
    ],
  },
];

const analyticsSections: ProfileSection[] = [
  {
    id: 'analytics-overview',
    title: 'Analytics overview',
    description: 'Configure how insights are presented in weekly and monthly recaps.',
    items: [
      {
        id: 'primary-goal',
        type: 'navigation',
        title: 'Primary goal highlight',
        description: 'Select the top metric featured across analytics.',
        value: 'Weight trend',
        meta: 'Change',
        icon: createIcon('flag'),
      },
      {
        id: 'comparison-window',
        type: 'navigation',
        title: 'Comparison window',
        description: 'Choose the timeframe for benchmarking progress.',
        value: 'Past 30 days',
        meta: 'Change',
        icon: createIcon('compare'),
      },
    ],
  },
  {
    id: 'analytics-sharing',
    title: 'Sharing',
    description: 'Automatically share select analytics with your coach or household.',
    items: [
      {
        id: 'share-with-coach',
        type: 'toggle',
        title: 'Coach can view analytics',
        description: 'Gives your coach visibility into generated insights.',
        toggleValue: true,
        icon: createIcon('insights'),
      },
      {
        id: 'share-with-household',
        type: 'toggle',
        title: 'Share wins with household',
        description: 'Send monthly highlights to selected members.',
        toggleValue: false,
        icon: createIcon('diversity-3'),
      },
    ],
  },
];

const analyticsCustomizeSections: ProfileSection[] = [
  {
    id: 'analytics-widgets',
    title: 'Dashboard widgets',
    description: 'Toggle which widgets appear on the analytics home screen.',
    items: [
      {
        id: 'widget-weight',
        type: 'toggle',
        title: 'Weight trend',
        toggleValue: true,
        icon: createIcon('trending-down'),
      },
      {
        id: 'widget-macro',
        type: 'toggle',
        title: 'Macro balance',
        toggleValue: true,
        icon: createIcon('pie-chart'),
      },
      {
        id: 'widget-glucose',
        type: 'toggle',
        title: 'Glucose variability',
        toggleValue: false,
        icon: createIcon('polyline'),
      },
      {
        id: 'widget-activity',
        type: 'toggle',
        title: 'Activity vs. plan',
        toggleValue: true,
        icon: createIcon('directions-bike'),
      },
    ],
  },
  {
    id: 'analytics-order',
    title: 'Widget order',
    description: 'Adjust the order analytics are presented in the weekly digest.',
    items: [
      {
        id: 'widget-order',
        type: 'info',
        title: 'Current order',
        description: 'Weight trend → Macro balance → Activity vs. plan → Glucose variability',
        icon: createIcon('format-list-numbered'),
      },
      {
        id: 'widget-reorder',
        type: 'navigation',
        title: 'Reorder widgets',
        description: 'Drag and drop to prioritise the metrics that matter most.',
        meta: 'Open builder',
        icon: createIcon('drag-indicator'),
      },
    ],
  },
];

const analyticsExportSections: ProfileSection[] = [
  {
    id: 'analytics-export',
    title: 'Export analytics',
    description: 'Schedule exports to share trend reports with your care team.',
    items: [
      {
        id: 'export-frequency',
        type: 'navigation',
        title: 'Export frequency',
        description: 'Choose how often to export analytics summaries.',
        value: 'Monthly',
        meta: 'Change',
        icon: createIcon('schedule'),
      },
      {
        id: 'export-format',
        type: 'navigation',
        title: 'File format',
        description: 'Select between PDF or CSV exports.',
        value: 'PDF',
        meta: 'Change',
        icon: createIcon('picture-as-pdf'),
      },
      {
        id: 'export-destination',
        type: 'navigation',
        title: 'Deliver to',
        description: 'Email recipients or connected services.',
        value: 'leslie.alexander@example.com',
        meta: 'Edit',
        icon: createIcon('forward-to-inbox'),
      },
      {
        id: 'run-on-demand',
        type: 'navigation',
        title: 'Run export now',
        description: 'Generate the most recent analytics summary immediately.',
        meta: 'Generate',
        icon: createIcon('play-arrow'),
      },
    ],
  },
];

const exportDataSections: ProfileSection[] = [
  {
    id: 'export-overview',
    title: 'Data export',
    description: 'Create a download of your personal data across the platform.',
    items: [
      {
        id: 'export-scope',
        type: 'info',
        title: 'Included data',
        description: 'Logs, messages, analytics summaries, and device sync history.',
        icon: createIcon('inventory'),
      },
      {
        id: 'export-size',
        type: 'info',
        title: 'Estimated size',
        description: 'Last export was 14.2 MB',
        icon: createIcon('sd-storage'),
      },
      {
        id: 'export-request',
        type: 'navigation',
        title: 'Request new export',
        description: 'We will email a secure download link when it is ready.',
        meta: 'Start',
        icon: createIcon('cloud-download'),
      },
    ],
  },
];

const dataRetentionSections: ProfileSection[] = [
  {
    id: 'retention-policy',
    title: 'Retention policy',
    items: [
      {
        id: 'retention-summary',
        type: 'info',
        title: 'How long we retain data',
        description:
          'Active members retain full history. After cancellation logs are archived for 30 days before deletion.',
        icon: createIcon('history'),
      },
      {
        id: 'retention-export',
        type: 'info',
        title: 'Export before deletion',
        description:
          'We will email a reminder 7 days before permanent deletion so you can export a copy.',
        icon: createIcon('mark-email-unread'),
      },
    ],
  },
  {
    id: 'retention-preferences',
    title: 'Preferences',
    items: [
      {
        id: 'retention-extend',
        type: 'toggle',
        title: 'Extend retention to 90 days',
        description: 'Keep access longer after cancellation to reference progress.',
        toggleValue: false,
        icon: createIcon('hourglass-bottom'),
      },
      {
        id: 'retention-notify',
        type: 'toggle',
        title: 'Notify when data is deleted',
        description: 'Receive a confirmation when your account data is permanently removed.',
        toggleValue: true,
        icon: createIcon('notifications'),
      },
    ],
  },
];

const deleteAccountSections: ProfileSection[] = [
  {
    id: 'delete-overview',
    title: 'Delete account',
    description:
      'Deleting your account removes all logs, analytics, and chat history. This action cannot be undone.',
    items: [
      {
        id: 'delete-prerequisite',
        type: 'info',
        title: 'Before you delete',
        description: 'Download a copy of your data and settle outstanding coaching sessions.',
        icon: createIcon('fact-check'),
      },
      {
        id: 'delete-contact',
        type: 'navigation',
        title: 'Contact support',
        description: 'Our team can help transfer your plan or pause your membership.',
        meta: 'Get help',
        icon: createIcon('support-agent'),
      },
      {
        id: 'delete-action',
        type: 'navigation',
        title: 'Delete my account',
        description: 'We will confirm via email before removing your data.',
        meta: 'Start',
        icon: createIcon('delete-forever'),
      },
    ],
  },
];

const householdMembersSections: ProfileSection[] = [
  {
    id: 'household-members',
    title: 'Household members',
    items: [
      {
        id: 'member-sam',
        type: 'navigation',
        title: 'Sam Alexander',
        description: 'Partner · Access to meal plans and analytics summaries',
        meta: 'View profile',
        icon: createIcon('person'),
      },
      {
        id: 'member-mia',
        type: 'navigation',
        title: 'Mia Alexander',
        description: 'Daughter · Receives weekly wins digest',
        meta: 'View profile',
        icon: createIcon('face-retouching-natural'),
      },
    ],
  },
  {
    id: 'household-actions',
    title: 'Actions',
    items: [
      {
        id: 'add-member',
        type: 'navigation',
        title: 'Add member',
        description: 'Invite a household member to follow your progress.',
        meta: 'Invite',
        icon: createIcon('person-add-alt'),
      },
      {
        id: 'manage-permissions',
        type: 'navigation',
        title: 'Manage permissions',
        description: 'Adjust what each member can view or edit.',
        meta: 'Edit',
        icon: createIcon('admin-panel-settings'),
      },
    ],
  },
];

const householdMemberProfileSections: ProfileSection[] = [
  {
    id: 'member-profile',
    title: 'Member profile',
    items: [
      {
        id: 'member-name',
        type: 'info',
        title: 'Name',
        value: 'Sam Alexander',
        description: 'Partner',
        icon: createIcon('person'),
      },
      {
        id: 'member-email',
        type: 'info',
        title: 'Email',
        value: 'sam.alexander@example.com',
        icon: createIcon('mail-outline'),
      },
      {
        id: 'member-status',
        type: 'status',
        title: 'Status',
        statusLabel: 'Active',
        statusTone: 'success',
        description: 'Has accepted invitation and is receiving updates.',
        icon: createIcon('verified'),
      },
    ],
  },
  {
    id: 'member-permissions',
    title: 'Permissions',
    items: [
      {
        id: 'permission-meal-plans',
        type: 'toggle',
        title: 'View meal plans',
        toggleValue: true,
        icon: createIcon('menu-book'),
      },
      {
        id: 'permission-analytics',
        type: 'toggle',
        title: 'View analytics',
        toggleValue: true,
        icon: createIcon('leaderboard'),
      },
      {
        id: 'permission-log',
        type: 'toggle',
        title: 'Add to log',
        toggleValue: false,
        icon: createIcon('edit-note'),
      },
    ],
  },
];

const householdAddMemberSections: ProfileSection[] = [
  {
    id: 'add-member-steps',
    title: 'Invite a member',
    items: [
      {
        id: 'add-member-email',
        type: 'info',
        title: 'Invite by email',
        description: 'Send an invite link so they can create their profile.',
        icon: createIcon('alternate-email'),
      },
      {
        id: 'add-member-link',
        type: 'navigation',
        title: 'Copy invite link',
        description: 'Share via text or messaging apps.',
        meta: 'Copy link',
        icon: createIcon('link'),
      },
      {
        id: 'add-member-manage',
        type: 'navigation',
        title: 'Manage pending invites',
        description: 'See who has not yet accepted access.',
        meta: 'View',
        icon: createIcon('pending-actions'),
      },
    ],
  },
];

const householdGlp1Sections: ProfileSection[] = [
  {
    id: 'glp1-programme',
    title: 'GLP-1 program',
    items: [
      {
        id: 'glp1-eligibility',
        type: 'info',
        title: 'Eligibility',
        description: 'Your household currently meets GLP-1 sharing requirements.',
        icon: createIcon('workspace-premium'),
      },
      {
        id: 'glp1-provider',
        type: 'info',
        title: 'Prescribing provider',
        description: 'Northwell Health Group',
        icon: createIcon('local-hospital'),
      },
      {
        id: 'glp1-reminders',
        type: 'toggle',
        title: 'Medication reminders',
        description: 'Send weekly medication reminders to participating members.',
        toggleValue: true,
        icon: createIcon('alarm-on'),
      },
    ],
  },
  {
    id: 'glp1-contacts',
    title: 'Care team',
    items: [
      {
        id: 'glp1-pharmacist',
        type: 'navigation',
        title: 'Message pharmacist',
        description: 'Coordinate refills or report side effects.',
        meta: 'Message',
        icon: createIcon('local-pharmacy'),
      },
      {
        id: 'glp1-education',
        type: 'navigation',
        title: 'Educational resources',
        description: 'Review tips and guidelines for GLP-1 success.',
        meta: 'View',
        icon: createIcon('school'),
      },
    ],
  },
];

const aboutSections: ProfileSection[] = [
  {
    id: 'about-version',
    title: 'App information',
    items: [
      {
        id: 'version',
        type: 'info',
        title: 'Version',
        value: '2.14.0 (build 471)',
        description: 'Latest update 12 February 2025',
        icon: createIcon('info'),
      },
      {
        id: 'legal',
        type: 'navigation',
        title: 'Terms & privacy',
        description: 'Review how we collect and process your data.',
        meta: 'View documents',
        icon: createIcon('gavel'),
      },
      {
        id: 'support',
        type: 'navigation',
        title: 'Support centre',
        description: 'Browse FAQs or contact support.',
        meta: 'Open',
        icon: createIcon('help'),
      },
    ],
  },
  {
    id: 'about-licenses',
    title: 'Open source notices',
    items: [
      {
        id: 'licenses',
        type: 'navigation',
        title: 'View acknowledgements',
        description: 'Libraries and frameworks that power the app.',
        meta: 'View',
        icon: createIcon('article'),
      },
    ],
  },
];

export const accountTabScenes: ProfileTabScenes = {
  tabs: [
    { key: 'overview', label: 'Details' },
    { key: 'security', label: 'Security' },
  ],
  sectionsByTab: {
    overview: profileInfoSections,
    security: profileSecuritySections,
  },
};

export const profileMockData = {
  account: accountTabScenes,
  core: { title: 'Core settings', sections: coreSettingsSections },
  notifications: { title: 'Notification settings', sections: notificationSettingsSections },
  privacy: { title: 'Privacy settings', sections: privacySettingsSections },
  dataConnections: { title: 'Health data sync', sections: dataConnectionSections },
  analytics: { title: 'Analytics & trends', sections: analyticsSections },
  analyticsCustomize: {
    title: 'Customise analytics',
    sections: analyticsCustomizeSections,
  },
  analyticsExport: {
    title: 'Export analytics',
    sections: analyticsExportSections,
  },
  exportData: { title: 'Export your data', sections: exportDataSections },
  dataRetention: { title: 'Data retention', sections: dataRetentionSections },
  deleteAccount: { title: 'Delete account', sections: deleteAccountSections },
  householdMembers: { title: 'Household members', sections: householdMembersSections },
  householdMemberProfile: {
    title: 'Member profile',
    subtitle: 'Permissions and data sharing for Sam Alexander',
    sections: householdMemberProfileSections,
  },
  householdAddMember: { title: 'Invite member', sections: householdAddMemberSections },
  householdGlp1: { title: 'Household & GLP-1', sections: householdGlp1Sections },
  about: { title: 'About', sections: aboutSections },
} as const;

export type ProfileMockData = typeof profileMockData;

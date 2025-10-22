import { MaterialIconsGlyphs } from './types';

export interface MealEntry {
  id: string;
  label: string;
  calories: number;
  icon: MaterialIconsGlyphs;
  iconTint: string;
  iconBackground: string;
  time?: string;
}

export interface WeightSummary {
  weight: number;
  unit: string;
  delta: number;
  deltaDirection: 'up' | 'down';
  comparisonLabel: string;
}

export interface ActivityEntry {
  id: string;
  label: string;
  durationMinutes: number;
  calories: number;
  icon: MaterialIconsGlyphs;
  iconTint: string;
  iconBackground: string;
}

export interface RecentFood {
  id: string;
  name: string;
  details: string;
  imageUrl: string;
}

export const todayMeals: MealEntry[] = [
  {
    id: 'breakfast-today',
    label: 'Breakfast',
    calories: 1200,
    icon: 'egg-alt',
    iconTint: '#4d7c0f',
    iconBackground: '#d9f99d',
    time: '7:00 AM',
  },
  {
    id: 'lunch-today',
    label: 'Lunch',
    calories: 1500,
    icon: 'lunch-dining',
    iconTint: '#ea580c',
    iconBackground: '#fed7aa',
    time: '12:30 PM',
  },
  {
    id: 'dinner-today',
    label: 'Dinner',
    calories: 1800,
    icon: 'dinner-dining',
    iconTint: '#4338ca',
    iconBackground: '#e0e7ff',
    time: '6:30 PM',
  },
  {
    id: 'snacks-today',
    label: 'Snacks',
    calories: 200,
    icon: 'cookie',
    iconTint: '#db2777',
    iconBackground: '#fbcfe8',
    time: '9:00 PM',
  },
];

export const yesterdayMeals: MealEntry[] = [
  {
    id: 'breakfast-yesterday',
    label: 'Breakfast',
    calories: 1180,
    icon: 'egg-alt',
    iconTint: '#4d7c0f',
    iconBackground: '#d9f99d',
    time: '7:15 AM',
  },
  {
    id: 'lunch-yesterday',
    label: 'Lunch',
    calories: 1420,
    icon: 'lunch-dining',
    iconTint: '#ea580c',
    iconBackground: '#fed7aa',
    time: '1:00 PM',
  },
  {
    id: 'dinner-yesterday',
    label: 'Dinner',
    calories: 1750,
    icon: 'dinner-dining',
    iconTint: '#4338ca',
    iconBackground: '#e0e7ff',
    time: '6:00 PM',
  },
  {
    id: 'snacks-yesterday',
    label: 'Snacks',
    calories: 210,
    icon: 'cookie',
    iconTint: '#db2777',
    iconBackground: '#fbcfe8',
    time: '9:15 PM',
  },
];

export const weightSummaries: Record<
  '7d' | '30d' | '365d',
  WeightSummary & { chartVariant: '7d' | '30d' | '365d' }
> = {
  '7d': {
    weight: 150.2,
    unit: 'lbs',
    delta: -1.2,
    deltaDirection: 'down',
    comparisonLabel: 'vs last 7 days average',
    chartVariant: '7d',
  },
  '30d': {
    weight: 151.5,
    unit: 'lbs',
    delta: -3.5,
    deltaDirection: 'down',
    comparisonLabel: 'vs last month average',
    chartVariant: '30d',
  },
  '365d': {
    weight: 158.5,
    unit: 'lbs',
    delta: -7.3,
    deltaDirection: 'down',
    comparisonLabel: 'vs last year average',
    chartVariant: '365d',
  },
};

export const todayActivities: ActivityEntry[] = [
  {
    id: 'running-today',
    label: 'Running',
    durationMinutes: 30,
    calories: 300,
    icon: 'directions-run',
    iconTint: '#ea580c',
    iconBackground: '#fed7aa',
  },
];

export const yesterdayActivities: ActivityEntry[] = [
  {
    id: 'weights-yesterday',
    label: 'Weight Training',
    durationMinutes: 60,
    calories: 450,
    icon: 'fitness-center',
    iconTint: '#7c3aed',
    iconBackground: '#ddd6fe',
  },
  {
    id: 'swim-yesterday',
    label: 'Swimming',
    durationMinutes: 45,
    calories: 400,
    icon: 'pool',
    iconTint: '#0f766e',
    iconBackground: '#99f6e4',
  },
];

export const syncedMetrics = [
  { id: 'steps', label: 'Steps', value: '12,345 steps', calories: 185 },
  { id: 'steps-yesterday', label: 'Steps', value: '10,234 steps', calories: 155 },
];

export const quickAddFoods = ['Greek yogurt', 'Banana', 'Protein bar (Bear Bells)', 'Cheesecake'];

export const recentFoods: RecentFood[] = [
  {
    id: 'oatmeal',
    name: 'Oatmeal',
    details: '1 cup, 158 kcal',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBidlx9BB_3mcIks0oe1BPZbrZVtg8TrMA6uM2eres8URY9lD1QrtEPvn73_9S4ayN7TLHeLQpdRMlza2sRfb090ZP6Ak211AWRfQJvoglNSyVZ855zY4eHZkHRaSncidoHYaOhMsw8Nrr31Y0BtIwCz0T9NB5M2-3lkA6bKgPjumoXbMEUoInbWMZhBIzAZkSrawjOoLTEWJkTVG5CesQRFs_5pPEp_sEEr8RtVNvEnrbPvHKFKmHFDpApYmvz7pukAc1HY-9nPZRl',
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    details: '1 cup, 100 kcal',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDeD8-5rOc5Xy8J39a2fn4C6Ql6OvMElFr7PZah05iWxCNVp9GWRVobWth-YzgYjSXSlNaYnlLuglqqvIGW_VYdOwN9ZRxJ5DCo-363bfKGmgfF-BH9HVQmjhu_kzxrRyjdhf_G4XYUXeay2pRDS3tyUmymhD2klRXLB7_5dx0dFnFtRcog9aUtsjtsO78htTGpbY85qGoP_ulpIh_2V_S54GyA8bUPJEaiDkoIINfrAfIktaDQ9ppu41gOmmEvj0nmp5e6tL7MvvjP',
  },
  {
    id: 'berries',
    name: 'Mixed Berries',
    details: '1 cup, 85 kcal',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZYsBE3f-AJ4j61JxIsROpOBJKNW3IW8prJpcB3dTiKlD9bICtxwVIPzk-lTNkbhrLyHmcqukLS6oZtuFFuHB0QrAqHUS65vXG-aUo3Xn5oh6J5JXoHMQma37orOTxTM3teBojI-U3Eu9Avwo1upQD0_IWfxT-LIAW7QmBpwJVD-gtdHiOr_p9F7GK9yLenUrlTcdlO6BqrRAwkzOaYjGgFwUwb3j1aUN8Y__gOJf5GoMjPuHMEWD1ecLzzQ3XQo_NRbc5lgSWpoxd',
  },
  {
    id: 'almonds',
    name: 'Almonds',
    details: '1/4 cup, 207 kcal',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCganoGUShniBAl6uajP0xi0WgJ4HlyQdzg4WZngfATyKNzIlS-tO3dO5AKzsN0nhRKrNBLBdSKpY9_SHtUEWr6Gr2rKZcDrcnVrCzW9kwVNgZ9zuM3dRrEgNfSIIzqUPdiY2BPxkdTv1fhErsX1Mks5dFJevdl1E2GGU5JXNwQrXaDGHV2AeyNp4drVJOAheysemliCzDXPCoF-L9sHKSs6EhCGXcD1a8pkHhoSeKqkUJfXUv_egwgY2qEvltR4P9b_McuxJ-gKQ6',
  },
];


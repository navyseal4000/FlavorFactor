/**
 * Deterministic fixture data powering the interactive plan pages. Keeping the
 * content colocated with the feature makes the screens resilient to future
 * API integrations while providing predictable tests.
 */
export interface WeeklyMealPlanEntry {
  id: string;
  meal: string;
  recipeCount: number;
  primaryIngredient: string;
}

export interface WeeklyMealPlanDay {
  id: string;
  label: string;
  entries: WeeklyMealPlanEntry[];
}

export const weeklyMealPlan: WeeklyMealPlanDay[] = [
  {
    id: 'mon',
    label: 'Monday',
    entries: [
      { id: 'mon-breakfast', meal: 'Breakfast', recipeCount: 2, primaryIngredient: 'Oats' },
      { id: 'mon-lunch', meal: 'Lunch', recipeCount: 1, primaryIngredient: 'Salmon' },
      { id: 'mon-dinner', meal: 'Dinner', recipeCount: 2, primaryIngredient: 'Broccoli' },
    ],
  },
  {
    id: 'tue',
    label: 'Tuesday',
    entries: [
      { id: 'tue-breakfast', meal: 'Breakfast', recipeCount: 1, primaryIngredient: 'Greek Yogurt' },
      { id: 'tue-lunch', meal: 'Lunch', recipeCount: 2, primaryIngredient: 'Quinoa' },
      { id: 'tue-dinner', meal: 'Dinner', recipeCount: 1, primaryIngredient: 'Chicken Thigh' },
    ],
  },
  {
    id: 'wed',
    label: 'Wednesday',
    entries: [
      { id: 'wed-breakfast', meal: 'Breakfast', recipeCount: 1, primaryIngredient: 'Chia Seeds' },
      { id: 'wed-lunch', meal: 'Lunch', recipeCount: 1, primaryIngredient: 'Farro' },
      { id: 'wed-dinner', meal: 'Dinner', recipeCount: 2, primaryIngredient: 'Sweet Potato' },
    ],
  },
  {
    id: 'thu',
    label: 'Thursday',
    entries: [
      { id: 'thu-breakfast', meal: 'Breakfast', recipeCount: 1, primaryIngredient: 'Berries' },
      { id: 'thu-lunch', meal: 'Lunch', recipeCount: 2, primaryIngredient: 'Lentils' },
      { id: 'thu-dinner', meal: 'Dinner', recipeCount: 1, primaryIngredient: 'Cod' },
    ],
  },
  {
    id: 'fri',
    label: 'Friday',
    entries: [
      { id: 'fri-breakfast', meal: 'Breakfast', recipeCount: 2, primaryIngredient: 'Eggs' },
      { id: 'fri-lunch', meal: 'Lunch', recipeCount: 1, primaryIngredient: 'Turkey' },
      { id: 'fri-dinner', meal: 'Dinner', recipeCount: 2, primaryIngredient: 'Cauliflower' },
    ],
  },
  {
    id: 'sat',
    label: 'Saturday',
    entries: [
      { id: 'sat-breakfast', meal: 'Breakfast', recipeCount: 1, primaryIngredient: 'Protein Pancakes' },
      { id: 'sat-lunch', meal: 'Lunch', recipeCount: 1, primaryIngredient: 'Shrimp' },
      { id: 'sat-dinner', meal: 'Dinner', recipeCount: 1, primaryIngredient: 'Zucchini' },
    ],
  },
  {
    id: 'sun',
    label: 'Sunday',
    entries: [
      { id: 'sun-breakfast', meal: 'Breakfast', recipeCount: 1, primaryIngredient: 'Avocado' },
      { id: 'sun-lunch', meal: 'Lunch', recipeCount: 2, primaryIngredient: 'Brown Rice' },
      { id: 'sun-dinner', meal: 'Dinner', recipeCount: 1, primaryIngredient: 'Sirloin' },
    ],
  },
];

export interface DailyPrepTask {
  id: string;
  label: string;
  completed: boolean;
  relatedMeal: string;
}

export const dailyPrepTasks: DailyPrepTask[] = [
  { id: 'thaw-salmon', label: 'Thaw salmon fillets', completed: true, relatedMeal: 'Tuesday Lunch' },
  { id: 'marinate-chicken', label: 'Marinate chicken thighs', completed: false, relatedMeal: 'Tuesday Dinner' },
  { id: 'prep-grains', label: 'Cook quinoa for salads', completed: false, relatedMeal: 'Midweek Lunches' },
  { id: 'wash-produce', label: 'Wash leafy greens', completed: true, relatedMeal: 'Snacks' },
];

export interface ShoppingListItem {
  id: string;
  label: string;
  quantity: string;
  section: 'Produce' | 'Protein' | 'Pantry' | 'Frozen';
}

export const shoppingList: ShoppingListItem[] = [
  { id: 'broccoli', label: 'Broccoli crowns', quantity: '3 heads', section: 'Produce' },
  { id: 'berries', label: 'Fresh berries', quantity: '2 pints', section: 'Produce' },
  { id: 'salmon', label: 'Wild salmon', quantity: '4 fillets', section: 'Protein' },
  { id: 'chicken', label: 'Chicken thighs', quantity: '2 lbs', section: 'Protein' },
  { id: 'quinoa', label: 'Tri-color quinoa', quantity: '1 bag', section: 'Pantry' },
  { id: 'frozen-fruit', label: 'Frozen mango', quantity: '1 bag', section: 'Frozen' },
];

export interface PantryCategory {
  id: string;
  label: string;
  items: Array<{ id: string; label: string; quantity: string; lowStock: boolean }>;
}

export const pantryInventory: PantryCategory[] = [
  {
    id: 'dry-goods',
    label: 'Dry Goods',
    items: [
      { id: 'oats', label: 'Rolled oats', quantity: '1.5 lbs', lowStock: false },
      { id: 'rice', label: 'Brown rice', quantity: '0.5 lbs', lowStock: true },
      { id: 'lentils', label: 'French lentils', quantity: '2 lbs', lowStock: false },
    ],
  },
  {
    id: 'spices',
    label: 'Spices & Seasoning',
    items: [
      { id: 'turmeric', label: 'Turmeric', quantity: 'Full jar', lowStock: false },
      { id: 'cumin', label: 'Ground cumin', quantity: 'Low', lowStock: true },
      { id: 'smoked-paprika', label: 'Smoked paprika', quantity: 'Half jar', lowStock: false },
    ],
  },
  {
    id: 'snacks',
    label: 'Snacks',
    items: [
      { id: 'almonds', label: 'Roasted almonds', quantity: '12 oz', lowStock: false },
      { id: 'protein-bars', label: 'Protein bars', quantity: '3 bars', lowStock: true },
    ],
  },
];

export interface CartItem {
  id: string;
  label: string;
  quantity: string;
  price: number;
}

export const cartItems: CartItem[] = [
  { id: 'avocado', label: 'Avocados', quantity: '4 count', price: 5.5 },
  { id: 'yogurt', label: 'Greek yogurt', quantity: '32 oz tub', price: 6.25 },
  { id: 'sirloin', label: 'Grass-fed sirloin', quantity: '1.2 lbs', price: 14.2 },
  { id: 'greens', label: 'Spring mix', quantity: '1 container', price: 4.1 },
];

export const cartSummary = {
  subtotal: cartItems.reduce((total, item) => total + item.price, 0),
  deliveryWindow: 'Tomorrow, 4-6pm',
  store: 'Neighborhood Market',
};

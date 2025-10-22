import { strict as assert } from 'node:assert';

import { PLAN_NAV_ROUTES } from '../src/features/plan/constants';
import {
  cartItems,
  cartSummary,
  dailyPrepTasks,
  pantryInventory,
  shoppingList,
  weeklyMealPlan,
} from '../src/features/plan/mockData';
import { PLAN_TAB_SEQUENCE, createTranslateOutputRange } from '../src/features/plan/utils/carousel';

/**
 * Lightweight assertions that exercise the pure logic backing the new plan
 * carousel and page data. They run in Node without requiring a React Native
 * environment and serve as regression coverage until dedicated UI tests land.
 */
export function runPlanFeatureTests(): void {
  assert.deepEqual(PLAN_TAB_SEQUENCE, ['weekly', 'daily', 'pantry', 'cart']);

  const width = 360;
  const expectedRange = PLAN_TAB_SEQUENCE.map((_, index) => -index * width);
  assert.deepEqual(createTranslateOutputRange(width), expectedRange);

  assert.equal(Object.keys(PLAN_NAV_ROUTES).length, PLAN_TAB_SEQUENCE.length);

  const days = weeklyMealPlan.map((day) => day.label);
  assert.equal(new Set(days).size, weeklyMealPlan.length);

  const incompleteTasks = dailyPrepTasks.filter((task) => !task.completed);
  assert.ok(incompleteTasks.length > 0, 'Expected at least one incomplete prep task.');

  const lowStockItems = pantryInventory.flatMap((category) =>
    category.items.filter((item) => item.lowStock),
  );
  assert.ok(lowStockItems.length > 0, 'Expected pantry inventory to flag low stock items.');

  const totalShoppingSections = new Set(shoppingList.map((item) => item.section));
  assert.ok(totalShoppingSections.size >= 3, 'Expected multiple shopping list sections.');

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  assert.equal(Math.round(subtotal * 100), Math.round(cartSummary.subtotal * 100));
}

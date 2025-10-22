import { PlanTabKey } from '../constants';

/**
 * Ordered list of plan tabs, exported for reuse and testing.
 */
export const PLAN_TAB_SEQUENCE: PlanTabKey[] = ['weekly', 'daily', 'pantry', 'cart'];

/**
 * Produces the interpolation output range used by the plan carousel animation.
 * Separating the math allows us to validate the behaviour in Node-based tests
 * without invoking React Native's Animated API.
 */
export function createTranslateOutputRange(width: number): number[] {
  return PLAN_TAB_SEQUENCE.map((_, index) => -index * width);
}

import React, { forwardRef } from 'react';

type PrimitiveProps = React.PropsWithChildren<Record<string, unknown>>;
function createPrimitive(element: string) {
  return forwardRef<unknown, PrimitiveProps>(({ children, ...rest }, ref) =>
    React.createElement(element, { ref, ...rest }, children as React.ReactNode),
  );
}

export const View = createPrimitive('div');
export const Text = createPrimitive('span');
export const ScrollView = createPrimitive('div');
export const Pressable = createPrimitive('button');
export const TextInput = createPrimitive('input');
export const Switch = ({ value, disabled }: { value: boolean; disabled?: boolean }) => (
  <input type="checkbox" checked={value} disabled={disabled} readOnly />
);

export const Animated = {
  View,
  timing: () => ({ start: (callback?: () => void) => callback?.() }),
  Value: class {
    private value: number;

    constructor(initial: number) {
      this.value = initial;
    }

    setValue(next: number) {
      this.value = next;
    }

    interpolate() {
      return this.value;
    }
  },
};

export function useWindowDimensions() {
  return { width: 390, height: 844, scale: 1, fontScale: 1 };
}

export const StyleSheet = {
  hairlineWidth: 1,
  create<T>(styles: T): T {
    return styles;
  },
};

export const Platform = {
  OS: 'web',
  select<T>(options: { [key: string]: T }): T | undefined {
    return options.default ?? options.web;
  },
};

export const Dimensions = {
  get: () => ({ width: 390, height: 844, scale: 1, fontScale: 1 }),
};

export default {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Switch,
  Animated,
  useWindowDimensions,
  StyleSheet,
  Platform,
  Dimensions,
};

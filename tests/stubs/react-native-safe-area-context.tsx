import React, { createContext, useContext } from 'react';

type Insets = { top: number; bottom: number; left: number; right: number };

const SafeAreaContext = createContext<Insets>({ top: 0, bottom: 0, left: 0, right: 0 });

interface ProviderProps {
  children: React.ReactNode;
  initialMetrics?: { insets: Insets };
}

export function SafeAreaProvider({ children, initialMetrics }: ProviderProps): React.ReactElement {
  const value = initialMetrics?.insets ?? { top: 0, bottom: 0, left: 0, right: 0 };
  return <SafeAreaContext.Provider value={value}>{children}</SafeAreaContext.Provider>;
}

export function useSafeAreaInsets(): Insets {
  return useContext(SafeAreaContext);
}

export const SafeAreaView = ({ children }: { children: React.ReactNode }) => <>{children}</>;

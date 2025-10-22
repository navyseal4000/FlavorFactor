export function useRouter() {
  return {
    replace: () => undefined,
    back: () => undefined,
  };
}

export function useSegments(): string[] {
  return [];
}

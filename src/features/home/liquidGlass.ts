import { Platform } from 'react-native';

export function getIosMajorVersion(): number {
  if (Platform.OS !== 'ios') return 0;
  const version = Platform.Version;
  if (typeof version === 'string') {
    const [major] = version.split('.');
    const parsed = Number.parseInt(major, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  if (typeof version === 'number') {
    return Math.trunc(version);
  }
  return 0;
}

export const supportsLiquidGlass = Platform.OS === 'ios' && getIosMajorVersion() >= 26;

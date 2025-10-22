import Module from 'module';
import path from 'node:path';

const originalRequire = Module.prototype.require;

Module.prototype.require = function patchedRequire(id: string) {
  if (id === 'react-native') {
    return originalRequire.call(this, path.join(__dirname, 'stubs/react-native'));
  }

  if (id === 'react-native-safe-area-context') {
    return originalRequire.call(this, path.join(__dirname, 'stubs/react-native-safe-area-context'));
  }

  if (id === '@expo/vector-icons' || id === '@expo/vector-icons/MaterialIcons') {
    return originalRequire.call(this, path.join(__dirname, 'stubs/expo-vector-icons'));
  }

  if (id === 'expo-router') {
    return originalRequire.call(this, path.join(__dirname, 'stubs/expo-router'));
  }

  return originalRequire.apply(this, [id]);
};

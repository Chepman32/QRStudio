import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock @shopify/react-native-skia
jest.mock('@shopify/react-native-skia', () => ({
  Skia: {},
  Canvas: 'Canvas',
  Circle: 'Circle',
  Group: 'Group',
  Path: 'Path',
  RoundedRect: 'RoundedRect',
  Shadow: 'Shadow',
  LinearGradient: 'LinearGradient',
  vec: jest.fn(),
  useValue: jest.fn(),
  useTouchHandler: jest.fn(),
}));

// Silence warnings
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@database': './src/database',
          '@services': './src/services',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@types': './src/types',
          '@theme': './src/theme',
          '@assets': './src/assets',
        },
      },
    ],
    'react-native-reanimated/plugin', // Must be last
  ],
};

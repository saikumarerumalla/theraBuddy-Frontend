module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@constants': './src/constants',
            '@screens': './src/screens',
            '@store': './src/store',
            '@api': './src/api',
            '@navigation': './src/navigation',
            '@types': './src/types',
            '@utils': './src/utils',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  unstable_enableSymlinks: true,
  unstable_enablePackageExports: true,
};

config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
};

module.exports = config;
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = async function(env, argv) {
  /**
   * There is a bug in expo-cli that prevents prodenv from being set.
   * Ref: https://github.com/expo/expo-cli/issues/919
   *
   * The following will force webpack to bundle in production mode
   */
  if (process.env.BUILD_ENV === 'production') {
    env.mode = 'production';
    env.development = false;
    env.production = true;
  }

  const config = await createExpoWebpackConfigAsync(env, argv);

  config.plugins.push(
    process.env.ANALYZE ? new BundleAnalyzerPlugin() : () => null,
  );

  // config.plugins.push(
  //   new CopyWebpackPlugin([
  //     { from: __dirname + '/web/favicon.ico' },
  //     { from: __dirname + '/web/preview.png' },
  //   ]),
  // );

  return config;
};

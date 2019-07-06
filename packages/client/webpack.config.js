const createExpoWebpackConfig = require('@expo/webpack-config');

// workaround for working rnw web build, see https://github.com/expo/expo/issues/4545#issuecomment-504742710
// should be removed later
module.exports = (env, argv) => {
  const config = createExpoWebpackConfig(env, argv);
  return config.then(c => {
    c.plugins = c.plugins.filter(
      x => x.constructor.name !== 'WebpackDeepScopeAnalysisPlugin',
    );
    return c;
  });
};

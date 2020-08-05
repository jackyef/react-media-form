const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      // enable CSS modules
      postcss({
        modules: true,
      })
    );
    return config;
  },
};
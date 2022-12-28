const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    const pugRule = config.module.rule('pug');

    // IMPORTANT: clear all existing pug loader settings
    // defaults pug loader in Vue is `pug-plain-loader`
    pugRule.uses.clear();
    pugRule.oneOfs.clear();
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.pug$/,
          oneOf: [
            // allow <template lang="pug"> in Vue components
            {
              resourceQuery: /^\?vue/u,
              loader: '@webdiscus/pug-loader',
              options: {
                method: 'html', // render Pug into pure HTML string
              },
            },
            // allow import of Pug in JS/TS and for "other cases", if a file hasn't the extension `.vue`
            {
              loader: '@webdiscus/pug-loader',
              options: {
                method: 'compile', // compile Pug into template function
              },
            },
          ],
        },
      ],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/variables.scss";
        `,
      },
    },
  },
});

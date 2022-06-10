const path = require('path');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const SocialTags = require('social-tags-webpack-plugin');
const seo = require('./seo');

const routes = ['/', '/services', '/courses'];

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes,
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      // We need to inject a value so we're able to
      // detect if the page is currently pre-rendered.
      inject: {},
      // Our view component is rendered after the API
      // request has fetched all the necessary data,
      // so we create a snapshot of the page after the
      // `data-view` attribute exists in the DOM.
      renderAfterDocumentEvent: 'render-event',
    }),
  }),
  new SocialTags({
    appUrl: seo.url,
    facebook: {
      'og:url': seo.url,
      'og:type': seo.type,
      'og:title': seo.title,
      'og:description': seo.description,
      'og:site_name': seo.siteName,
      'og:locale': seo.locale,
      'og:article:author': seo.author,
      'og:image': './public/elevendogs.png',
    },
    twitter: {
      'twitter:card': 'summary',
      'twitter:url': seo.url,
      'twitter:title': seo.title,
      'twitter:description': seo.description,
      'twitter:image': './public/elevendogs.png',
    },
  }),
];

module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
        `,
      },
    },
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...productionPlugins);
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      title: seo.title,
      description: seo.description,
      hiddenTitle: seo.hiddenTitle,
    },
  },
  pluginOptions: {
    sitemap: {
      outputDir: './dist',
      baseURL: seo.url,
      urls: routes,
      pretty: true,
      defaults: {
        lastmod: new Date(),
        priority: 1,
      },
    },
  },
};

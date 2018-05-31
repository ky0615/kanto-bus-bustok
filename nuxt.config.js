const { ENV } = require('./configs/env')
const title = '関東バスのPASMOバス特典チケットを計算するやつ'
const description = '関東バスでのバス特典チケットと定期、どちらがお得なのか計算できるサイトです。'

module.exports = {
  srcDir: 'app',

  router: {
    base: ENV.BASE_URL
  },

  render: {
    gzip: false
  },

  /*
  ** Headers of the page
  */
  head: {
    title: title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { name: 'twitter:creator', content: '@dll7' },
      { name: 'og:title', content: title },
      { name: 'twitter:title', content: title },
      { name: 'og:description', content: description },
      { name: 'twitter:description', content: description },
      { name: 'og:type', content: 'website' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            formatter: require('eslint/lib/formatters/codeframe')
          }
        })
      }
    }
  },

  css: [
    { src: '~assets/scss/app.scss', lang: 'scss' }
  ],

  modules: [
    // Simple usage
    ['@nuxtjs/google-analytics', {
      id: 'UA-26824920-4'
    }]
  ]
}

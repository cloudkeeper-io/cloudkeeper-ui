const withSourceMaps = require('@zeit/next-source-maps')
const withTypeScript = require('@zeit/next-typescript')
const withImages = require('next-images')

module.exports = withImages(withSourceMaps(withTypeScript({
  assetPrefix: process.env.BASE_PATH || '',
  publicRuntimeConfig: {
    basePath: process.env.BASE_PATH || '',
  },
})))

const serverless = require('serverless-http')
const express = require('express')
const next = require('next')

const app = next({ dev: false, dir: './src' })
const handle = app.getRequestHandler()

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'binary/octet-stream',
  'image/jpeg',
  'image/png',
  'image/gif',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
  'image/x-icon',
  'image/svg+xml',
  'application/font-woff2',
  'application/font-woff',
  'font/woff',
  'font/woff2',
]

exports.handler = (evt, ctx, callback) => {
  app.prepare()
    .then(() => {
      const server = express()
      const router = express.Router()
      router.get('*', (req, res) => handle(req, res))
      server.use('/prod', router)

      server.get('*', (req, res) => handle(req, res))

      const handler = serverless(server, { binary: binaryMimeTypes })
      return handler(evt, ctx, callback)
    })
}

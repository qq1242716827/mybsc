// eslint-disable-next-line @typescript-eslint/no-var-requires
const proxy = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    '/arkdrop.json',
    proxy.createProxyMiddleware({
      target: 'https://www.fengli.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/arkdrop.json': ''
      }
    })
  ),
    app.use(
      '/tokenlist.json',
      proxy.createProxyMiddleware({
        target: 'https://www.fengli.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/tokenlist.json': ''
        }
      })
    )
}

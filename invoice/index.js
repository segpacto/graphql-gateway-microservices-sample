const server = require('./src/server')
const { port } = require('./src/config')

server.then(app => {
  app.listen(port, () => {
    console.log(`Service running at port: ${port}`)
  })
})

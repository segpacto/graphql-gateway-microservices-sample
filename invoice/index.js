const server = require('./src/server')
const PORT = process.env.PORT || 3001

server.then(app => {
  app.listen(PORT, () => {
    console.log('Service running at port: ' + PORT)
  })
})
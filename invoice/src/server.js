const express = require('express')
const swaggerUi = require('swagger-ui-express')

const swagger = require('@apidevtools/swagger-express-middleware')
const path = require('path')

const app = express()
app.set('etag', false)

const router = express.Router()

const swaggerSpec = path.join(__dirname, '../swagger.json')
const swaggerJSON = require(swaggerSpec)
const config = require('./config')

module.exports = new Promise((resolve, reject) => {
  swagger(swaggerSpec, app, (err, middleware) => {
    const { basePATH, swaggerUrl, swaggerUiPath } = config

    if (err) {
      reject(err)
    }
    app.use(
      swaggerUiPath,
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
          url: swaggerUrl
        }
      })
    )

    //swagger json
    app.get(`${basePATH}/swagger`, (req, res) => res.json(swaggerJSON))

    app.use(
      middleware.metadata(),
      middleware.CORS(),
      middleware.parseRequest(),
      middleware.validateRequest()
    )

    require('./controllers/invoice-controller')(router)

    app.use(basePATH, router)

    resolve(app)
  })
})

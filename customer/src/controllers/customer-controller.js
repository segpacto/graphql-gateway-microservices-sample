const customerFixtures = require('./../fixtures/customer-fixtures')

module.exports = (router) => {
  router.post('/customers/search', async (req, res) => {
    const { body: {name} } = req

    const result = customerFixtures.filter(customer => customer.firstName === name)

    res.send({
      data: result,
      totalCount: result.length
    })
  })

  router.get('/customers/:customerId', async (req, res) => {
    const { customerId } = req.pathParams

    const result = customerFixtures.find(customer => customer.customerId === customerId)
    
    if (!result) {
        return res.sendStatus(404)
    }

    res.send(result)
  })
}

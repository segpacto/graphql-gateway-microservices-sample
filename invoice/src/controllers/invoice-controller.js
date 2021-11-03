const invoiceFixtures = require('./../fixtures/invoice-fixtures')

module.exports = (router) => {

  router.get('/invoices/customer/:customerId', async (req, res) => {
    const { customerId } = req.pathParams

    const result = invoiceFixtures.filter(invoice => invoice.customerId === customerId)

    res.send(result)
  })

  router.get('/invoices/:invoiceId', async (req, res) => {
    const { invoiceId } = req.pathParams

    const result = invoiceFixtures.find(invoice => invoice.invoiceNumber === invoiceId)
    
    if (!result) {
        return res.sendStatus(404)
    }

    res.send(result)
  })
}

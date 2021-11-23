const ENV = process.env

module.exports = {
  port: 5000,
  customerApi: {
    name: 'customerApi',
    url: ENV.CUSTOMER_API_URL || 'http://localhost:3000/customer-api/swagger'
  },
  invoiceApi: {
    name: 'invoiceApi',
    url: ENV.INVOICE_API_URL || 'http://localhost:3001/invoice-api/swagger'
  }
}

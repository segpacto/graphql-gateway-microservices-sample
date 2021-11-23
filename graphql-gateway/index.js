require('dotenv').config()

const gateway = require('gql-gateway')

const { customerApi, invoiceApi, port } = require('./config')

const endpointsList = [
  { name: customerApi.name, url: customerApi.url },
  { name: invoiceApi.name, url: invoiceApi.url }
]

const localSchema = `
  extend type Customer {
    invoices: [Invoice]
  }
  extend type Invoice {
    customer: Customer
  }
`

const resolvers = {
  Customer: {
    invoices: {
      fragment: '... on Customer {customerId}',
      async resolve (invoice, args, context, info) {
        const schema = await context.resolveSchema('invoiceApi')

        return info.mergeInfo.delegateToSchema({
          schema,
          operation: 'query',
          fieldName: 'getInvoicesByCustomerId',
          args: { customerId: invoice.customerId },
          context,
          info
        })
      }
    }
  },
  Invoice: {
    customer: {
      fragment: '... on Invoice {customerId}',
      async resolve (customer, args, context, info) {
        const schema = await context.resolveSchema('customerApi')

        return info.mergeInfo.delegateToSchema({
          schema,
          operation: 'query',
          fieldName: 'getCustomerById',
          args: { customerId: customer.customerId },
          context,
          info
        })
      }
    }
  }
}

gateway({ endpointsList, resolvers, localSchema })
  .then(server => server.listen(port))
  .then(console.log(`Service is now running at port: ${port}`))
  .catch(err => console.log(err))

# graphql-gateway-microservices-sample
This Repository contains three microservices, from these two are REST services and one graphql gateway . All implemented in NodeJs.
The idea is to demonstrate how to implement a GraphQL Gateway using REST microservices documented with OpenApi/Swagger.
Using the mocked data from the REST microservices, graphql is able to establish relations between the data that belongs to different services.

## Runnning all services
To run all services
```sh
docker-compose up --build # Build, initialize and publish the services
docker-compose up # Start services if were build previously
```
Can be accessed visually accessing to [`http://localhost:5000`](http://localhost:5000) to create Queries, Mutations and access all Types autogenerated from the microservices

### Queries and Mutations samples
Performs a search of customers by name, also includes per customer a list of invoices.
```graphql
mutation customersSearch {
  searchCustomerByName(body: {name: "John"}) {
    data {
      customerId
      firstName
      lastName
      invoices {
        amount
        invoiceDate
        customerId
      }
    }
  }
}
```
Get a customer by Id and the associated invoices
```graphql
query {
  getCustomerById(customerId: "1") {
    firstName
    invoices {
      amount
      customerType
      invoiceNumber
    }
  }
}
```
Retrieve an invoice by Id and returning the associated customer
```graphql
query {
  getInvoiceById(invoiceId: "10") {
    amount
    invoiceNumber
    invoiceDate
    customer {
      firstName
      lastName
      email
    }
  }
}
```

## Running services independently
### Customer-Api
Contains the follwowing endpoints:
`POST /customers/search # Customers search, Returns a list of Customers`
`GET /customers/{customerId} #Find a customer by ID, Return a Customer`

The service can be found under the directory [`/customer`](https://github.com/segpacto/graphql-gateway-microservices-sample/tree/master/customer).

Running standalone service:
```sh
npm install
npm run start
```
Can be accessed visually accessing to [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)
To use the [Swagger-UI](https://swagger.io/tools/swagger-ui/) to create the requests directly from the web, on [`/customer/swagger.json`](https://github.com/segpacto/graphql-gateway-microservices-sample/blob/master/customer/swagger.json) set the property `host` to `localhost:3000`

### Invoice-Api
Contains the follwowing endpoints:
`GET /invoices/customer/{customerId} # Find invoices by customer ID, Returns a list of Invoices`
`GET /invoices/{invoiceId} # Find an invoice by ID, Returns an Invoice`

The service can be found under the directory [`/invoice`](https://github.com/segpacto/graphql-gateway-microservices-sample/tree/master/invoice).
Running standalone service:
```sh
npm install
npm run start
```
Can be accessed visually accessing to [`http://localhost:3001/api-docs`](http://localhost:3001/api-docs)
To use the [Swagger-UI](https://swagger.io/tools/swagger-ui/) to create the requests directly from the web, on [`/invoice/swagger.json`](https://github.com/segpacto/graphql-gateway-microservices-sample/blob/master/invoice/swagger.json) set the property `host` to `localhost:3001`

### GraphQL-Gateway
The service can be found under the directory [`/graphql-gateway`](https://github.com/segpacto/graphql-gateway-microservices-sample/tree/master/graphql-gateway).
The service uses under the hood the package [gql-gateway](https://www.npmjs.com/package/gql-gateway). To learn how to establish [data relations](https://github.com/segpacto/graphql-gateway-microservices-sample/blob/master/graphql-gateway/index.js) take a deeper look at  the gql-gateway [README](https://github.com/segpacto/gql-gateway#readme).

Running standalone service:
```sh
npm install
npm run start
```
Can be accessed visually accessing to [`http://localhost:5000`](http://localhost:5000)
To start this service the [OpenApi/Swagger](https://swagger.io/docs/specification/about/) documentation endpoints should be reachable, and to create Queries and Mutations
those services should be accessible.
On the OpenAPI/Swagger documentation of each service the `host` and `basePath` should be properly configured, this is what indicates to this service where to direct all the requests.




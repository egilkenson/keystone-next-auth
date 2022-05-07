import Cookies from 'cookies'
import { GraphQLClient } from 'graphql-request'

/**
 * Pass an API request to the GraphQL server with sessionToken from cookies
 *
 * @param {Object } req - the request object, containing sessionToken cookie
 * @param {string} query - the GraphQL query or mutation string
 * @param {Object} variables - any variables to be passed with the GraphQL request
 *
 * @returns {Promise<any>} - response from the GraphQL query or mutation
 *
 * @link https://github.com/prisma-labs/graphql-request#passing-headers-in-each-request
 */
export function fetchProtectedRoute(req, query, variables = {}) {
  const cookies = new Cookies(req)
  const receivedToken = cookies.get('sessionToken')

  const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL)
  const requestHeaders = {
    ...req.headers,
    authorization: `Bearer ${receivedToken}`
  }
  return client.request(query, variables, requestHeaders)
}

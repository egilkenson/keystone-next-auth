/**
 * API endpoint for retrieving current user details
 *
 * @link https://nextjs.org/docs/api-routes/introduction
 */

import { gql } from 'graphql-request'
import { fetchProtectedRoute } from '../../lib/fetchProtectedRoute'

const CURRENT_USER_QUERY = gql`
    query CURRENT_USER_QUERY {
        authenticatedItem {
            ...on User {
                id
                email
                name
            }
        }
    }
`

/**
 * Get authenticated user data from the GraphQL server
 *
 * @param {Object} req - the request object, containing cookies with sessionToken
 * @returns {Promise<any>} - the current user or error message
 */
export async function getUser(req) {
  return await fetchProtectedRoute(req, CURRENT_USER_QUERY)
    .then(data => data.authenticatedItem)
    .catch(error => {
      return {
        status: 'failed',
        message: 'Could not connect to authentication server.',
        error
      }
    })
}

export default async function handler (req, res) {
  const user = await getUser(req)
  if (user) {
    // user contains user info or failed status + error message
    res.status(200).json(user)
  } else {
    // if there is no user or error, then there is no authenticated user
    // associated with the sessionToken that was included in the request
    res.status(200).json({ status: 'failed', message: 'User not found.' })
  }
}

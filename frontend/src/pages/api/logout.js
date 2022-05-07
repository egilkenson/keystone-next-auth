/**
 * API endpoint for logout functionality
 *
 * @link https://nextjs.org/docs/api-routes/introduction
 */

import { gql } from 'graphql-request'
import Cookies from 'cookies'
import { fetchProtectedRoute } from '../../lib/fetchProtectedRoute'

const LOGOUT_MUTATION = gql`
    mutation LOGIN_MUTATION {
        endSession
    }
`;

/**
 * Run endSession mutation on the GraphQL server
 *
 * @param {Object} req - the request object, containing cookies with sessionToken
 * @returns {Promise<any>} - always Object with endSession property, even if there is no session
 */
export async function endSession(req) {
  return await fetchProtectedRoute(req, LOGOUT_MUTATION).then(data => data)
}

/**
 * Ends session on GraphQL server and deletes cookie if successful
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response to be returned
 * @returns {Promise<void>} - the HTTP response
 */
export default async function handler (req, res) {
  const logout = await endSession(req)
  if (logout.endSession) {
    const cookies = new Cookies(req, res)
    // setting value to null will delete the cookie
    cookies.set('sessionToken', null)
    res.status(200).json({ status: 'success', message: 'User logged out.' })
  } else {
    res.status(200).json({ status: 'failed', message: 'Could not connect to authentication server.' })
  }
}

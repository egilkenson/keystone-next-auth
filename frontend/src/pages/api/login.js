/**
 * API endpoint for login functionality
 *
 * @link https://nextjs.org/docs/api-routes/introduction
 */

import { gql, request } from 'graphql-request'
import Cookies from 'cookies'

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                    id
                    email
                }
                sessionToken
            }
            ... on UserAuthenticationWithPasswordFailure {
                message
            }
        }
    }
`;

/**
 * Run authenticate user mutation on the GraphQL server
 *
 * @param {Object} req - the request object, containing the login form data in the body
 * @returns {Promise<any>} - the authenticated user or error message
 */
export async function logUserIn(req) {
  const { email, password } = req.body
  return await request(process.env.NEXT_PUBLIC_GRAPHQL, LOGIN_MUTATION, {
    email,
    password,
  } ).then(data => data.authenticateUserWithPassword)
}

/**
 * Authenticates user using incoming request body and sets a session cookie if successful
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response to be returned
 * @returns {Promise<void>} - the HTTP response
 */
export default async function handler (req, res) {
  const login = await logUserIn(req)
  if (login?.item) {
    const cookies = new Cookies(req, res)
    let expires = new Date()
    expires.setDate(expires.getDate() + 30)
    cookies.set('sessionToken', login.sessionToken,
      {
        httpOnly: true,
        expires,
      })
    res.status(200).json(login)
  } else if (login?.message) {
    // if the keystone server responds with a failure message
    res.status(200).json({ status: 'failed', message: login.message })
  } else {
    // if there's no response from the server
    res.status(200).json({ status: 'failed', message: 'Could not connect to authentication provider.' })
  }
}

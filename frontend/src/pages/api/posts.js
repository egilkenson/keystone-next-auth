/**
 * API endpoint for fetching posts
 *
 * @link https://nextjs.org/docs/api-routes/introduction
 */

import { gql, request } from 'graphql-request'

const POSTS_QUERY = gql`
    query POSTS_QUERY {
        posts {
            id
            title
            content {
                document
            }
        }
    }
`

/**
 * Get all records in the posts table from the GraphQL server
 *
 * @returns {Promise<any>} - the collection of posts
 */
export async function getPosts() {
  return await request(process.env.NEXT_PUBLIC_GRAPHQL, POSTS_QUERY ).then(data => data.posts)
}

/**
 * Gets the posts and returns them
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response to be returned
 * @returns {Promise<void>} - the HTTP response
 */
export default async function handler(req, res) {
  const posts = await getPosts()
  if (posts) {
    res.status(200).json(posts)
  } else {
    res.status(200).json({ status: 'failed', message: 'Could not get posts from database.' })
  }
}

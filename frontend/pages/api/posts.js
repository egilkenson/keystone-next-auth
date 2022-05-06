// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { gql, request } from 'graphql-request'

const POSTS_QUERY = gql`
    query POSTS_QUERY {
        posts {
            title
            content {
                document
            }
        }
    }
`

export default function handler(req, res) {
  request('http://localhost:3000/api/graphql', POSTS_QUERY ).then((data) => {
    res.status(200).json(data)
  }).catch((error) => {
    res.status(400).error(error)
  })

}

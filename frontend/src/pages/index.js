import Head from 'next/head'
import { getPosts } from './api/posts'
import { getUser } from './api/user'
import LogIn from '../components/LogIn'
import LogOut from '../components/LogOut'
import ClientSideUser from '../components/ClientSideUser'
import ServerSideUser from '../components/ServerSideUser'
import PostsList from '../components/PostsList'
import styles from '../styles/Home.module.css'

export default function Home ({ posts, user }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSR With Authenticated API</title>
        <meta name="description" content="api hot potato test"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Proxying KeystoneJS GraphQL with NextJS APIs
        </h1>
        {user ? (
          <LogOut/>
        ) : (
          <LogIn/>
        )}

        <ServerSideUser user={user}/>
        <ClientSideUser/>
        <PostsList posts={posts}/>
      </main>

    </div>
  )
}

export async function getServerSideProps (context) {
  const posts = await getPosts()
  const user = await getUser(context.req)
  return { props: { posts, user } }
}

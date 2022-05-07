export default function PostsList({posts}) {
    return (
      <div>
        <h2>Posts (Public API, SSR)</h2>
        {posts.map(post => (
          <article key={post.id}>
            <h3>{post.title}</h3>
          </article>
        ))}
      </div>
    )
}

import useSWR from 'swr'

export default function ClientSideUser() {
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data: user, error } = useSWR('/api/user', fetcher)

  if (error) return <div>Failed to load users</div>
  if (!user) return <div>Loading...</div>
  if (user.status === 'failed') return (
    <div>
      <p>No authenticated user found via CSR API.</p>
    </div>
  )

  return (
    <div>
      <h2>
        Client Side User
      </h2>
        <p>{user.name} - {user.email}</p>
    </div>
  )
}

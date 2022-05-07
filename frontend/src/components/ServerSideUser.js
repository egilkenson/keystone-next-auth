export default function ServerSideUser({ user }) {

  if (!user) return (
    <div>
      <p>No authenticated user found during SSR.</p>
    </div>
  )

  return (
    <div>
      <h2>Server Side User</h2>
      <p>{user.name} - {user.email}</p>
    </div>
  );
}

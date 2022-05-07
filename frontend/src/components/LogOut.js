import { useRouter } from 'next/router'

export default function LogOut () {
  const router = useRouter()

  async function handleLogout () {
    try {
      await fetch(
        'http://localhost:3030/api/logout', {
          method: 'post',
        }).then(data => data.json())
      await router.push('/')
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <button onClick={handleLogout}>Log Out</button>
  )

}

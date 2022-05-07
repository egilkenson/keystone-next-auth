import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function LogIn () {
  const [status, setStatus] = useState('')
  const { handleSubmit, register } = useForm()
  const router = useRouter()

  async function onSubmit (data) {
    try {
      const loggedInUser = await fetch(
        'http://localhost:3030/api/login', {
          method: 'post',
          body: JSON.stringify({
            email: data.email,
            password: data.password
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          },
        }).then(data => data.json())
      if (loggedInUser?.status === 'failed') {
        setStatus(loggedInUser.message)
      } else {
        setStatus(`Logged in as ${loggedInUser.item.email}...`)
        await router.push('/')
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email Address
        <input type="email" name="email" {...register('email', { required: true })} />
      </label>
      <label htmlFor="password">Password
        <input type="password" name="password" {...register('password', { required: true })}/>
      </label>
      <button type="submit">Sign In</button>
      <div className="form-status">{status}</div>
    </form>
  )

}

'use client'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signin_service, signout_service } from '@/services/shipping.services'
import { FormEvent, useEffect, useState } from 'react'
import './UserStatsWidget.css'
import { redis } from '@/lib/redis'

export default function UserStatsWidget() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isAuth, setIsAuth] = useState(false)

  const is_Token_Available = async () => {
    const token = await redis.get('shipping-token')
    if (!token) {
      return null
    }
    return token
  }
  useEffect(() => {
    is_Token_Available().then((v) => {
      if (v) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
    })
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setIsError(false)
    setIsAuth(false)

    const formData = new FormData(e.currentTarget)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const response = await signin_service({ email, password })
      await redis.set('shipping-token', JSON.stringify(response.token))
      if (response) {
        setIsAuth(true)
      }
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    const token = await is_Token_Available()
    if (!token) {
      return
    }
    await signout_service(typeof token === 'string' ? token : '')
    await redis.set('shipping-token', '')
    setIsAuth(false)
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Shipping Sign In</h2>

        {!isAuth && (
          <>
            <Input type="email" placeholder="Email" name="email" required />
            <Input type="password" placeholder="Password" name="password" required />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Continue'}
            </Button>
          </>
        )}

        {isError && <p className="error">Login failed. Please try again.</p>}

        {isAuth && <p className="success">Login successful</p>}
      </form>
      {isAuth && (
        <Button onClick={handleLogout} className="logout">
          Logout
        </Button>
      )}
    </div>
  )
}

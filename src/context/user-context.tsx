'use client'

import { User } from '@/api/getOrders'
import { createContext, ReactNode, useContext, useState } from 'react'

interface UserContextType {
  user: User | undefined
  handleSetUser: (user: User) => void
}

export const UserContext = createContext({} as UserContextType)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>()

  function handleSetUser(user: User) {
    console.log('??', user)
    setUser(user)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        handleSetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

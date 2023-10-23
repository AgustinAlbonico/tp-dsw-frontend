import { useState, useContext, createContext } from 'react'

type AuthUser = {
  email: string
  name: string
}

export type UserContextType = {
  user: any
  setUser: any
}

type UserContextProviderType = {
  children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType)

const UserContextProvider = ({
  children,
}: UserContextProviderType): JSX.Element => {
  const [user, setUser] = useState<AuthUser | null>({
    email: '',
    name: '',
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

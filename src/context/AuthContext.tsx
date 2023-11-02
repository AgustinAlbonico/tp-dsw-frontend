import { createContext, useState } from 'react'

export type UserContextType = {
  user: any
  setUser: any
}

type UserContextProviderType = {
  children: React.ReactNode
}

type AuthUser = {
  id_usuario: number
  email: string
}

export const AuthContext = createContext({} as UserContextType)

export const AuthContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<AuthUser | null>(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

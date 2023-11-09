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
  nombre: string
  apellido: string
}

const AuthContext = createContext({} as UserContextType)

export const AuthContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<AuthUser | null>({
    id_usuario: 1,
    email: 'agusitasdasd',
    nombre: 'Agustin',
    apellido: 'Albonico',
  })

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

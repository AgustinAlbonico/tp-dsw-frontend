import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export type UserContextType = {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
  isLoading: boolean
}

type UserContextProviderType = {
  children: React.ReactNode
}

type AuthUser = {
  id_usuario: number
  email: string
  nombre: string
  apellido: string
  password: string
  rol: string
  emailtoken: string
  verificado: boolean
  fecha_nacimiento: Date
}

const backend_url: string = import.meta.env.VITE_BACKEND_URL

export const AuthContext = createContext({} as UserContextType)

const AuthContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkLogin = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`${backend_url}/user/info`)
      setUser(data)
    } catch (error) {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

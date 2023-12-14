import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export type UserContextType = {
  user: any;
  setUser: any;
};

type UserContextProviderType = {
  children: React.ReactNode;
};

type AuthUser = {
  id_usuario?: number;
  email?: string;
  nombre?: string;
  apellido?: string;
};

const AuthContext = createContext({} as UserContextType);

export const AuthContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const checkLogin = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/user/info');
      setUser(data);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

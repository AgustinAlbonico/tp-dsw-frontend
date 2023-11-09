import { useContext, useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthContextProvider } from './context/AuthContext.tsx'

function App() {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Outlet />
        <ToastContainer />
      </AuthContextProvider>
    </>
  )
}

export default App

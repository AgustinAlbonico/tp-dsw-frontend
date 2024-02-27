import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AuthContextProvider from './context/AuthContext'
import WhatsappButton from './components/WhatsappButton/WhatsappButton'

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <Outlet />
      <WhatsappButton/>
      <ToastContainer />
    </AuthContextProvider>
  )
}

export default App

import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AiOutlineHome } from 'react-icons/ai'
import { BsPeople } from 'react-icons/bs'
import { HiOutlineInboxIn } from 'react-icons/hi'
import Button from './Button'
import Logo from '../assets/logo_1.svg'

interface MobileNavbarProps {
  setMobileNav: (param: boolean) => void
}

const backend_url: string = import.meta.env.VITE_BACKEND_URL

const MobileNavbar: React.FC<MobileNavbarProps> = ({ setMobileNav }) => {
  const navigate = useNavigate()

  const { user, setUser } = useAuth()

  const handleLogout = async () => {
    setMobileNav(false)
    const confirma = window.confirm('Desea cerrar sesion?')
    if (confirma) {
      await axios.get(`${backend_url}/user/logout`)
      toast.success('Sesion cerrada correctamente',{autoClose: 1000})
      setTimeout(() => {
        setUser(null)
        navigate('/')
      }, 2000)
    }
  }

  return (
    <nav className='bg-white w-full h-full flex flex-col justify-between'>
      <ul className='text-center h-full flex flex-col items-center justify-start gap-y-6 py-16'>
        <li className='w-[70%]'>
          <Link
            to='/'
            className='text-xl font-bold justify-between flex w-full'
          >
            <AiOutlineHome size='28' />
            <p>Inicio</p>
            <p></p>
          </Link>
        </li>
        <li className='w-[70%]'>
          <a href='#' className='text-xl font-bold justify-between flex w-full'>
            <BsPeople size='28' />
            <p>Nosotros</p>
            <p></p>
          </a>
        </li>
        <li className='w-[70%]'>
          <a href='#' className='text-xl font-bold justify-between flex w-full'>
            <HiOutlineInboxIn size='28' />
            <p>Contacto</p>
            <p></p>
          </a>
        </li>
        <li className='w-[70%] '>
          <a href='#' className='text-xl font-bold justify-between flex w-full'>
            <HiOutlineInboxIn size='28' />
            <p>Nosotros</p>
            <p></p>
          </a>
        </li>
        <div className='w-[80%] mx-auto h-[1px] bg-neutral-800 ' />
        {!user ? (
          <>
            <Button
              text='Iniciar sesion'
              color='bg-green-400'
              to='/login'
              sizex='w-48'
              sizey='h-12'
              onClick={() => {
                setMobileNav(false)
              }}
            />
            <Button
              text='Registrarse'
              color='bg-red-400'
              to='/register'
              sizex='w-48'
              sizey='h-12'
              onClick={() => setMobileNav(false)}
            />
          </>
        ) : user.rol === 'USUARIO' ? (
          <>
            <Button
              text='Mi perfil'
              color='bg-blue-400'
              to='/profile'
              sizex='w-48'
              sizey='h-12'
              onClick={() => setMobileNav(false)}
            />
            <Button
              text='Mis reservas'
              color='bg-slate-600'
              to='/mis-reservas'
              sizex='w-48'
              sizey='h-12'
              onClick={() => setMobileNav(false)}
            />
            <Button
              text='Cerrar sesion'
              color='bg-red-400'
              sizex='w-48'
              sizey='h-12'
              onClick={handleLogout}
            />
          </>
        ) : (
          <>
            <Button
              text='Panel ADMIN'
              color='bg-blue-400'
              to='/admin'
              sizex='w-48'
              sizey='h-12'
              onClick={() => setMobileNav(false)}
            />
            <Button
              text='Cerrar sesion'
              color='bg-red-400'
              sizex='w-48'
              sizey='h-12'
              onClick={handleLogout}
            />
          </>
        )}
      </ul>
      <a href='/' className='mb-10'>
        <div className='w-[90%] mx-auto h-[1px] bg-neutral-800 mb-2' />
        <img src={Logo} alt='' className='w-[90%] mx-auto' />
        <div className='w-[90%] mx-auto h-[1px] bg-neutral-800 mt-2' />
      </a>
      <p className='text-gray-500 text-xs w-[90%] mx-auto mb-8 pl-3'>
        © Copyright 2023. Todos los derechos reservados.
      </p>
    </nav>
  )
}

export default MobileNavbar

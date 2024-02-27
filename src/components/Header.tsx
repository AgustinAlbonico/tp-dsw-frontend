import { useState, useEffect } from 'react'
import Logo from '../assets/mas-chica.svg'
import { RxTextAlignJustify, RxCross1 } from 'react-icons/rx'
import MobileNavbar from './MobileNavbar'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import { toast } from 'react-toastify'
import clsx from 'clsx'

const backend_url: string = import.meta.env.VITE_BACKEND_URL

const Header = (): JSX.Element => {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  const [mobileNav, setMobileNav] = useState(false)
  const [bg, setBg] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) setBg(true)
      else if (!mobileNav) setBg(false)
    })
  }, [])

  useEffect(() => {
    return mobileNav ? setBg(true) : setBg(false)
  }, [mobileNav])

  const handleLogout = async () => {
    const confirma = window.confirm('Desea cerrar sesion?')
    if (confirma) {
      await axios.get(`${backend_url}/user/logout`)
      toast.success('Sesion cerrada correctamente', { autoClose: 1000 })
      setTimeout(() => {
        setUser(null)
        navigate('/')
      }, 2000)
    }
  }

  return (
    <header
      className={`h-24 z-50 fixed left-0 w-full flex items-center transition-all duration-200 ${
        bg ? 'bg-slate-600' : 'bg-transparent'
      }`}
    >
      <div className='mx-auto w-full xl:w-[95%]'>
        <div className='flex justify-between items-center mx-auto px-8'>
          {/* Logo */}
          <Link to='/' className='w-'>
            <img src={Logo} alt='PitchBooking-Logo' className='h-16' />
          </Link>

          <div className='hidden md:flex gap-4 items-center text-md md:text-lg text-white font-primary uppercase xl:pl-20'>
            <a href='#inicio'>Inicio</a>
            <a href='#nosotros'>Nosotros</a>
            <a href='#servicios'>Servicios</a>
            <a href='#contacto'>Contacto</a>
          </div>

          <div className='hidden lg:block'>
            {!user ? (
              <Button
                text='Iniciar sesion'
                color='bg-green-400'
                to='/login'
                sizey='h-12'
                sizex='w-36'
              />
            ) : user.rol === 'USUARIO' ? (
              <div className='hidden lg:flex items-center flex-wrap gap-2'>
                <Button
                  text='Mi perfil'
                  color='bg-blue-400'
                  to='/profile'
                  sizex='w-24'
                  sizey='h-10'
                  fontSize='text-md'
                />
                <Button
                  text='Mis reservas'
                  color='bg-slate-600'
                  to='/mis-reservas'
                  sizex='w-24'
                  sizey='h-10'
                  fontSize='text-md'
                />
                <Button
                  text='Cerrar sesion'
                  color='bg-red-400'
                  sizex='w-24'
                  sizey='h-10'
                  fontSize='text-md'
                  onClick={handleLogout}
                />
              </div>
            ) : (
              <div className='flex gap-x-4'>
                <Button
                  text='Panel ADMIN'
                  color='bg-blue-400'
                  to='/admin'
                  sizex='w-32'
                  sizey='h-12'
                />
                <Button
                  text='Cerrar sesion'
                  color='bg-red-400'
                  sizex='w-32'
                  sizey='h-12'
                  onClick={handleLogout}
                />
              </div>
            )}
          </div>

          {/* Boton mobileNav */}
          <div
            className='text-white font-bold cursor-pointer lg:hidden'
            onClick={() => setMobileNav(!mobileNav)}
          >
            {mobileNav ? (
              <RxCross1 size='30' />
            ) : (
              <RxTextAlignJustify size='30' />
            )}
          </div>

          {/* Menu mobile */}
          <div
            className={clsx(
              'lg:hidden fixed bottom-0 w-full max-w-xs h-[100%] transition-all duration-300',
              mobileNav ? 'left-0' : '-left-full'
            )}
          >
            <MobileNavbar setMobileNav={setMobileNav} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

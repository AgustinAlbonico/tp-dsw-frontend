import Logo from '../assets/logo_1.svg'
import Button from './Button'
import { AiOutlineHome } from 'react-icons/ai'
import { BsPeople } from 'react-icons/bs'
import { HiOutlineInboxIn } from 'react-icons/hi'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'

const MobileNavbar = (): JSX.Element => {
  const { user } = useAuth()

  let a = false

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
        {!a ? (
          <>
            <Button text='Iniciar sesion' color='bg-green-400' to='/login' />
            <Button text='Registrarse' color='bg-red-400' to='/register' />
          </>
        ) : (
          <>
            <Button text='Mi perfil' color='bg-blue-400' to='/profile' />
            <Button text='Reservar' color='bg-purple-400' />
            <Button text='Mis reservas' color='bg-slate-600' />
            <Button text='Cerrar sesion' color='bg-red-400' />
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

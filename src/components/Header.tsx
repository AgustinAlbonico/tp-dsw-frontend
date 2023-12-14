import { useState, useEffect } from 'react';
import Logo from '../assets/mas-chica.svg';
import { RxTextAlignJustify, RxCross1 } from 'react-icons/rx';
import MobileNavbar from './MobileNavbar';
import { Link } from 'react-router-dom';
import Button from './Button';
import useAuth from '../hooks/useAuth';

const Header = (): JSX.Element => {
  const [mobileNav, setMobileNav] = useState(false);
  const [bg, setBg] = useState(false);
  const { user, setUser } = useAuth();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) setBg(true);
      else if (!mobileNav) setBg(false);
    });
  }, []);

  useEffect(() => {
    return mobileNav ? setBg(true) : setBg(false);
  }, [mobileNav]);

  return (
    <header
      className={`h-24 z-50 fixed left-0 w-full flex items-center transition-all duration-200 ${
        bg ? 'bg-slate-600' : 'bg-transparent'
      }`}
    >
      <div className='mx-auto w-[90%]'>
        <div className='flex justify-between items-center mx-auto px-8'>
          {/* Logo */}
          <Link to='/' className=''>
            <img src={Logo} alt='PitchBooking-Logo' className='h-16' />
          </Link>

          <div className='hidden md:flex gap-4 items-center text-xl text-white'>
            <a href='#inicio'>Inicio</a>
            <a href='#nosotros'>Nosotros</a>
            <a href='#servicios'>Servicios</a>
            <a href='#contacto'>Contacto</a>
            {!user ? (
              <Button
                text='Iniciar sesion'
                color='bg-green-400'
                to='/login'
                sizey={14}
              />
            ) : (
              <div className='flex items-center flex-wrap gap-2'>
                <Button
                  text='Mi perfil'
                  color='bg-blue-400'
                  to='/profile'
                  sizey={10}
                  sizex={56}
                />
                {/* <Button text='Reservar' color='bg-purple-400' /> */}
                <Button
                  text='Mis reservas'
                  color='bg-slate-600'
                  to='/mis-reservas'
                  sizey={10}
                />
                <Button
                  text='Cerrar sesion'
                  color='bg-red-400'
                  to='/logout'
                  sizey={10}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                />
              </div>
            )}
          </div>

          {/* Boton mobileNav */}
          <div
            className='text-white font-bold cursor-pointer md:hidden'
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
            className={`${
              mobileNav ? 'left-0' : '-left-full'
            } md:hidden fixed bottom-0 w-full max-w-xs h-[100%] transition-all`}
          >
            <MobileNavbar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

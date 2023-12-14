import { useState, useEffect } from 'react';
import Logo from '../assets/mas-chica.svg';
import { RxTextAlignJustify, RxCross1 } from 'react-icons/rx';
import MobileNavbar from './MobileNavbar';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';

const Header = (): JSX.Element => {
  const [mobileNav, setMobileNav] = useState(false);
  const [bg, setBg] = useState(false);

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
      <div className='container mx-auto'>
        <div className='flex justify-between items-center mx-auto px-8'>
          {/* Logo */}
          <Link to='/' className=''>
            <img src={Logo} alt='PitchBooking-Logo' className='h-16' />
          </Link>

          <div className='hidden md:flex gap-2 items-center w-'>
            <a href='#inicio'>Inicio</a>
            <a href='#nosotros'>Nosotros</a>
            <a href='#servicios'>Servicios</a>
            <a href='#contacto'>Contacto</a>
            <Button
              text='Iniciar sesion'
              color='bg-green-400'
              to='/login'
              sizex={10}
              sizey={14}
            />
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

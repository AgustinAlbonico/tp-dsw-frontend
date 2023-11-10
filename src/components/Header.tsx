import { useState, useEffect } from 'react'
import Logo from '../assets/mas-chica.svg'
import { RxTextAlignJustify, RxCross1 } from 'react-icons/rx'
import MobileNavbar from './MobileNavbar'
import { Link } from 'react-router-dom'

const Header = (): JSX.Element => {
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

  return (
    <div className='relative'>
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
    </div>
  )
}

export default Header

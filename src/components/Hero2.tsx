import Logo from '../assets/Logo2-sin-fondo.svg'

const Hero2 = (): JSX.Element => {
  return (
    <section>
      <div className='bg-hero2 h-[100vh] bg-cover z-10 bg-no-repeat opacity-[85%] relative w-full bg-gradient-to-br from-slate-700 to-slate-50 flex justify-center items-center'>
        <div className='container flex items-center justify-around h-fit flex-col md:flex-row'>
          <div className='flex flex-col items-center md:items-start order-2 md:order-1'>
            <h2 className='text-5xl font-bold text-[#19b04b] text-center md:text-left' >
              Reserva tu cancha <br />
              en Rosario <br />
              al instante!
            </h2>
            <p className='text-slate-100 text-2xl font-medium mt-4'>
              Reserva tu cancha <br /> favorita <br />
              desde tu casa.
            </p>
          </div>
          <img src={Logo} alt='Logo' className='xl:h-[28rem] h-64 order-1 md:order-2' />
        </div>
      </div>
      <div className='bg-black h-[100vh]'></div>
    </section>
  )
}

export default Hero2

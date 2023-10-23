import BackgroundImage from '../assets/hero2.jpg'
import FormCancha from './FormCancha'

const Hero2 = (): JSX.Element => {
  return (
    <section>
      <div className='bg-hero2 h-full bg-cover bg-no-repeat z-20 opacity-[85%] absolute w-full'>
        <div className='container px-8 flex flex-col flex-nowrap'>
          <h1 className='text-5xl font-bold text-[#19b04b] mt-24 py-6'>
            Reserva tu cancha <br /> al <br />
            instante!
          </h1>
          <p className='text-slate-100 text-2xl font-medium'>
            Reserva tu cancha <br /> favorita <br />
            desde tu casa.
          </p>
          <FormCancha />
        </div>
      </div>
    </section>
  )
}

export default Hero2

import FormCancha from '../components/FormCancha'

const Reservar = (): JSX.Element => {
  return (
    <section>
      <div className='h-screen w-full'>
        <div className='bg-hero2 h-full bg-cover bg-no-repeat z-20 opacity-[85%] w-full flex-col flex items-center justify-center px-8'>
          <div className=' flex flex-col items-center justify-center flex-nowrap bg-white w-full rounded-lg shadow-lg md:w-[50%] py-8'>
            <FormCancha />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reservar

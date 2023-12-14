import FormCancha from './FormCancha';

const Hero2 = (): JSX.Element => {
  return (
    <section>
      <div className='bg-hero2 h-[100vh] bg-cover z-10 bg-no-repeat opacity-[85%] relative w-full bg-gradient-to-br from-slate-700 to-slate-50'>
        <div className='container px-8 flex flex-col flex-nowrap mx-auto'>
          <h1 className='text-5xl font-bold text-[#19b04b] mt-24 py-6'>
            Reserva tu cancha en Rosario al instante!
          </h1>
          <p className='text-slate-100 text-2xl font-medium'>
            Reserva tu cancha <br /> favorita <br />
            desde tu casa.
          </p>
          <FormCancha />
        </div>
      </div>
      <div className='bg-black h-[100vh]'></div>
    </section>
  );
};

export default Hero2;

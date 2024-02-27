import Button from '../components/Button'

const AdminPanel = (): JSX.Element => {
  return (
    <section>
      <div className='h-screen w-full'>
        <div className='bg-hero2 h-full bg-cover bg-no-repeat z-20 opacity-[85%] w-full flex-col flex items-center justify-center px-8'>
          <div className='flex flex-col gap-y-8'>
            <Button
              color='bg-green-400'
              to='/reservas/hoy'
              sizex={'w-48'}
              sizey={'h-12'}
              text='Reservas de hoy'
            />
            <Button
              color='bg-blue-400'
              to='/cancha/cargar'
              sizex={'w-48'}
              sizey={'h-12'}
              text='Cargar cancha'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminPanel

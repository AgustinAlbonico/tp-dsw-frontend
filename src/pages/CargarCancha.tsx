import { useEffect, useState } from 'react'
import { MdOutlinePlace } from 'react-icons/md'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { IoPricetagOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import axios from 'axios'
import ModalInsert from '../components/ModalInsert'
import ModalUpdate from '../components/ModalUpdate'
import Button from '../components/Button'

interface Zona {
  cod_zona: number
  descripcion: string
}

interface TipoCancha {
  cod_tipo: number
  descripcion: string
}

interface Cancha {
  nro_cancha: number
  descripcion: string
  costo_por_turno: number
  calle: string
  nro_calle: number
  horario_apertura: Date
  horario_cierre: Date
  cod_tipo: number
  cod_zona: number
  tipo_cancha: TipoCancha
  zona: Zona
}

const backend_url: string = import.meta.env.VITE_BACKEND_URL

const CargarCancha = () => {
  const [showModalin, setShowModalin] = useState(false)
  const [showModalUpt, setShowModalUpt] = useState(false)
  const [canchas, setCanchas] = useState<Cancha[] | null>(null)
  const [editData, setEditData] = useState(null)

  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [cantPages, setCantPages] = useState(1)

  const handlePrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < cantPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const getCanchas = async () => {
    try {
      const canchasBd = await axios.get(
        `${backend_url}/cancha?page=${currentPage}`
      )
      setCanchas(canchasBd.data.canchas)
      setCantPages(canchasBd.data.cantPaginas)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCanchas()
  }, [currentPage])

  // insertar datos
  const addCancha = (cancha: Cancha) => {
    setCanchas([...canchas, cancha])
  }

  const deleteCancha = async (nro_cancha: number) => {
    try {
      const res = window.confirm('Seguro que desea eliminar la cancha?')
      if (res) {
        await axios.delete(`${backend_url}/cancha/${nro_cancha}`)
        setCurrentPage(1);
        toast.success('Cancha eliminada correctamente', {
          position: 'top-center',
          autoClose: 1000,
        })
      }
    } catch (error) {
      toast.error('Error al eliminar la cancha', {
        position: 'top-center',
        autoClose: 1000,
      })
    }
  }

  // // editar datos
  // const editCancha = (cancha) => {
  //   const newCanchas = canchas.map((el) =>
  //     el.nro_cancha === cancha.nro_cancha ? cancha : el
  //   )
  //   setCanchas(newCanchas)
  //   setEditData(null)
  // }

  // // eliminar datos
  // const deleteCancha = async (nro_cancha) => {
  //   const isDelete = window.confirm(
  //     `¿Estás seguro de eliminar la cancha ${nro_cancha}?`
  //   )
  //   if (isDelete) {
  //     const newCanchas = await axios.delete(
  //       `${backend_url}/cancha/${nro_cancha}`
  //     )
  //     setCanchas(newCanchas)
  //   }
  // }

  // abre el modal de actualizar y guarda la data del equipo a actualizar
  const modalupt = (i) => {
    setShowModalUpt(true)
    setEditData(i)
  }

  return (
    <section>
      <div className='h-screen w-full'>
        <div className='bg-hero2 h-full bg-cover bg-no-repeat z-20 opacity-[85%] w-full flex-col flex items-center justify-center px-8'>
          <div className='flex-col flex justify-center items-center w-full z-20 mt-14 lg:mt-0 gap-y-2'>
            <Button
              color='bg-green-400'
              sizex='w-48'
              sizey='h-12'
              text='Agregar cancha'
              onClick={() => setShowModalin(true)}
            />
            {showModalin && <ModalInsert setShowModalin={setShowModalin} setCurrentPage={setCurrentPage}/>}
            <div className='w-[100%] h-fit flex-col items-end'>
              {canchas?.map((item) => (
                <div
                  key={item.nro_cancha}
                  className='w-full lg:w-[90%] xl:w-[60%] bg-white my-2 mx-auto h-auto rounded-lg p-4 shadow-lg '
                >
                  <div className='font-bold'>
                    <header className='flex flex-col justify-center items-center text-xl'>
                      <h2>{item.descripcion}</h2>
                      <p className='h-[2px] bg-green-400 w-[90%] mt-1 rounded'></p>
                    </header>
                    <div className='flex items-center mt-4'>
                      <IoMdInformationCircleOutline size='24' />
                      <div className='flex-col flex mt-1 pl-4'>
                        <p className=''>Cancha Nro: {item.nro_cancha}</p>
                        <p className=''>
                          Tipo de cancha: {item.tipo_cancha.descripcion}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center mt-2'>
                      <MdOutlinePlace size='24' />
                      <div className='flex-col flex mt-1  pl-4'>
                        <p className=''>Zona: {item.zona.descripcion}</p>
                        <p className=''>
                          Direccion: {item.calle} {item.nro_calle}
                        </p>
                      </div>
                    </div>
                    <div className='flex-row flex mt-2 mb-4'>
                      <IoPricetagOutline size='22' />
                      <p className='pl-4'>
                        Costo por turno: ${item.costo_por_turno}
                      </p>
                    </div>
                    <p className='h-[2px] dark:bg-gray-300 rounded w-[95%] mt-1 roundedmb-1 mx-auto'></p>
                  </div>

                  <div className='flex justify-end mt-2'>
                    <button
                      className='w-10 h-9 bg-blue-600 text-white rounded-md flex justify-center items-center mr-2'
                      onClick={() => modalupt(item)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                        />
                      </svg>
                    </button>
                    {showModalUpt && (
                      <ModalUpdate
                        editData={editData}
                        editCancha={editCancha}
                        setShowModal={setShowModalUpt}
                      />
                    )}
                    <button
                      className='w-10 h-9 bg-red-600 text-white rounded-md flex justify-center items-center'
                      onClick={() => deleteCancha(item.nro_cancha)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <nav
              className='isolate inline-flex -space-x-px rounded-md shadow-sm '
              aria-label='Pagination'
            >
              <a
                href='#'
                className='relative inline-flex items-center rounded-l-md px-2 py-2 bg-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                onClick={handlePrev}
              >
                <svg
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>

              <a
                href='#'
                aria-current='page'
                className='relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {currentPage}
              </a>
              <a
                href='#'
                className='relative inline-flex items-center rounded-r-md px-2 py-2 bg-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                onClick={handleNext}
              >
                <svg
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CargarCancha

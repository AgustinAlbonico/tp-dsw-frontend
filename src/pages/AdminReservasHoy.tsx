// AdminReservasHoy.tsx

import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import axios from 'axios'

const backend_url: string = import.meta.env.VITE_BACKEND_URL

const AdminReservasHoy: React.FC = () => {
  const [reservasHoy, setReservasHoy] = useState<any[]>([])

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

  const [loading, setLoading] = useState(false)

  const fetchReservasHoy = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${backend_url}/reserva/hoy?page=${currentPage}`)
      const data = await response.data

      setReservasHoy(data.reservas)
      setCantPages(data.cant)
    } catch (error) {
      console.error('Error al obtener las reservas de hoy:', error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReservasHoy()
  }, [])

  useEffect(() => {
    fetchReservasHoy()
    console.log(reservasHoy)
  }, [currentPage])

  //useEffect()

  console.log(reservasHoy)

  return (
    <section>
      <div className='h-screen w-full'>
        <div className='bg-hero2 h-full bg-cover z-20 opacity-[85%] w-full flex-col flex justify-center items-center px-0'>
          <div className='bg-white w-[90%] sm:w-[80%] lg:w-[50%] rounded-2xl px-4 py-4 flex flex-col justify-center items-center gap-y-4'>
            <div className='flex flex-col items-center'>
              <p className='text-2xl font-bold text-center text-black leading-7'>
                Reservas para Hoy
              </p>
              <hr className='w-[90%] h-0.5 bg-gray-100 border-0 rounded dark:bg-green-700 my-2'></hr>
            </div>
            <div className='w-full'>
              {loading ? (
                <Spinner />
              ) : reservasHoy.length > 0 ? (
                <div className='w-full'>
                  <div className='w-full flex-col items-end'>
                    {reservasHoy.map((reserva) => (
                      <div
                        key={reserva.id_reserva}
                        className='w-full bg-white my-2 mx-auto h-auto rounded-lg p-2 shadow-lg'
                      >
                        <div className='font-bold'>
                          <header className='flex flex-col justify-center items-center text-xl'>
                            <h2>Cancha: {reserva.nro_cancha}</h2>
                            <p className='h-[2px] bg-green-400 w-[90%] mt-1 rounded'></p>
                          </header>
                          <div className='flex justify-center items-center mt-1 gap-x-6'>
                            <p className='px-1'>
                              <span className='text-lg underline'>Fecha:</span>{' '}
                              {reserva.fecha_turno.split('T')[0]}
                            </p>
                            <p className='px-1'>
                              <span className='text-lg underline'>
                                Hora Inicio:
                              </span>{' '}
                              {reserva.hora_turno.split('T')[1].split(':')[0] +
                                ':' +
                                reserva.hora_turno.split('T')[1].split(':')[1]}
                            </p>
                            <p className='px-1'>
                              <span className='text-lg underline'>Estado:</span>{' '}
                              {reserva.estado}
                            </p>
                            <p className='px-1'>
                              <span className='text-lg underline'>Usuario:</span>{' '}
                              {reserva.id_usuario}
                            </p>
                          </div>
                          {/* Otros detalles de la reserva */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='flex justify-center'>
                  <p className='text-black'>
                    No hay reservas programadas para hoy
                  </p>
                </div>
              )}
            </div>
            <div className='flex flex-col gap-y-8 md:flex-row items-center justify-around w-full mt-4'>
              <nav
                className='isolate inline-flex -space-x-px rounded-md shadow-sm '
                aria-label='Pagination'
              >
                <a
                  href='#'
                  className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
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
                  className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
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
      </div>
    </section>
  )
}

export default AdminReservasHoy

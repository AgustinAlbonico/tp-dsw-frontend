import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import ReactPaginate from 'react-paginate';

interface Reserva {
  nro_reserva: number;
  fecha_turno: Date;
  hora_turno: Date;
  fecha_hora_reserva: Date;
  estado: string;
  id_usuario: number;
  nro_cancha: number;
  cancha: Cancha;
}

interface Cancha {
  nro_cancha: number;
  descripcion: string;
  costo_por_turno: number;
  calle: string;
  nro_calle: number;
  horario_apertura: Date;
  horario_cierre: Date;
  cod_zona: number;
  cod_tipo: number;
}

const Reservas = (): JSX.Element => {
  const [reserva, setReserva] = useState<Reserva[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cantPages, setCantPages] = useState(1);

  const getReserva = async () => {
    setIsLoading(true);
    const { reservas, cant } = (
      await axios.get(`http://localhost:3000/api/reserva?page=${currentPage}`)
    ).data;
    setCantPages(cant);
    setReserva(reservas);
    setIsLoading(false);
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < cantPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const cancelarReserva = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const confirma = window.confirm('Seguro que desea cancelar la reserva?');
    if (confirma) {
      const dataId = (e.currentTarget as HTMLButtonElement).dataset.id;
      try {
        await axios.put(`http://localhost:3000/api/reserva/${dataId}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const compararFechas = (fecha_turno: any) => {
  //   const fechaActual = new Date().toLocaleDateString('es-ES', {
  //     timeZone: 'UTC',
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric',
  //   });
  //   const fechaTurno = new Date(fecha_turno).toLocaleDateString('es-ES', {
  //     timeZone: 'UTC',
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric',
  //   });
  //   console.log(fechaTurno);
  //   console.log(fechaActual);

  //   if (fechaTurno >= fechaActual) {
  //     console.log('fechaActual es menor fechaTurno');
  //     return true;
  //   } else if (fechaTurno < fechaActual) {
  //     console.log('fechaActual es mayor fechaTurno');
  //     return false;
  //   }
  // };

  useEffect(() => {
    getReserva();
  }, [currentPage]);

  return (
    <section>
      <div className='bg-hero2 h-screen bg-cover z-20 opacity-[85%] w-full flex-col flex justify-center items-center px-0'>
        <div className='bg-white w-[95%] min-h-60 h-auto mt-10 rounded-2xl flex flex-col justify-center items-center py-6 shadow-lg mx-20 min-w-[320px] px-2 md:w-[70%]'>
          <p className='text-4xl font-bold text-black'>Mis reservas</p>
          <hr className='w-60 h-0.5 bg-green-700 border-0 mt-2 mb-4'></hr>
          <div className='flex justify-center min-w-[320px]'>
            <table className='table-fixed w-full border-collapse justify-center border-spacing-x-0.5 border-spacing-y-1.5'>
              <thead className='tracking-tighter md:tracking-wide'>
                <tr>
                  <th className='font-bold  sm:text-lg'>Fecha </th>
                  <th className='font-bold sm:text-lg'>Hora</th>
                  <th className='font-bold sm:text-lg'>Direccion</th>
                  <th className='font-bold sm:text-lg'>Estado</th>
                  <th className='font-bold sm:text-lg'>Acciones</th>
                </tr>
              </thead>
              <tbody className='text-center space-between-10 text-sm sm:text-md'>
                {reserva.length === 0 && isLoading && (
                  <tr>
                    <td colSpan={5} className='pt-3'>
                      <Spinner />
                    </td>
                  </tr>
                )}
                {reserva.length === 0 && !isLoading ? (
                  <tr>
                    <td colSpan={5} className='pt-3 font-bold text-2xl'>
                      El usuario no tiene reservas.
                    </td>
                  </tr>
                ) : (
                  reserva?.map((item) => (
                    <tr className='my-auto' key={item.nro_reserva}>
                      <td>
                        {new Date(item.fecha_turno).toLocaleDateString(
                          'es-ES',
                          { timeZone: 'UTC' }
                        )}
                      </td>
                      <td>
                        {new Date(item.hora_turno).toLocaleTimeString('es-ES', {
                          timeZone: 'UTC',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td>{`${item.cancha.calle
                        .charAt(0)
                        .toLocaleUpperCase()}${item.cancha.calle.slice(1)} ${
                        item.cancha.nro_calle
                      }`}</td>
                      <td>{`${item.estado
                        .charAt(0)
                        .toLocaleUpperCase()}${item.estado.slice(1)}`}</td>
                      <td className='flex justify-center items-center h-full gap-2 '>
                        <button
                          className='px-5 py-1.5 sm:px-8 sm:py-1.5 bg-red-400 rounded-md flex justify-center text-center items-center text-white disabled:bg-red-300'
                          onClick={(e) => cancelarReserva(e)}
                          data-id={item.nro_reserva}
                          disabled={item.estado === 'reservado' ? false : true}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
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
                  fill-rule='evenodd'
                  d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
                  clip-rule='evenodd'
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
                  fill-rule='evenodd'
                  d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
                  clip-rule='evenodd'
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
};
export default Reservas;

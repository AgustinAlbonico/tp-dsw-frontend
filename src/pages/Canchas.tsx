import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type inputCancha = {
  zona: number | null;
  tipoCancha: number | null;
  fecha: string | null;
};

interface datosCancha {
  nro_cancha: number;
  descripcion: string;
  costo_por_turno: number;
  calle: string;
  nro_calle: number;
  horario_apertura: string;
  horario_cierre: string;
  cod_zona: number;
  cod_tipo: number;
  horarios: string[];
}

interface datosZona {
  cod_zona: number;
  descripcion: string;
}

interface datosTipo {
  cod_tipo: number;
  descripcion: string;
}

interface datosReserva {
  fecha_turno: string | null;
  hora_turno: string | null;
  nro_cancha: number | null;
}

const Canchas = (): JSX.Element => {
  const navigate = useNavigate();
  //Extraigo los parametros de zona y tipo
  const [params] = useSearchParams();
  const cod_zona = params.get('zona');
  const cod_tipo = params.get('tipo-cancha');
  const fecha_param = params.get('fecha');
  const [currentPage, setCurrentPage] = useState(1);
  const [cantPages, setCantPages] = useState(1);

  const [loading, setLoading] = useState(false);
  //const [page, setPage] = useState(1)

  const [datosReserva, setDatosReserva] = useState<datosReserva>({
    fecha_turno: fecha_param,
    nro_cancha: null,
    hora_turno: null,
  });

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

  useEffect(() => {
    if (
      datosReserva.fecha_turno &&
      datosReserva.hora_turno &&
      datosReserva.nro_cancha
    ) {
      fetchData()
        .then(() => {
          setTimeout(() => {
            navigate('/');
          }, 2000);
          toast.success('Reserva realizada con exito', {
            position: 'top-center',
            autoClose: 2000,
          });
        })
        .catch((error) => {
          if (error.response.data.excede) {
            setTimeout(() => {
              navigate('/');
            }, 2000);
            return toast.error('Usted ya posee 3 reservas activas', {
              position: 'top-center',
              autoClose: 2000,
            });
          }
          toast.error('Error al realizar la reserva!', {
            position: 'top-center',
            autoClose: 2000,
          });
        });
    }
  }, [datosReserva]);

  //Creo un estado para traer la zona y tipo completos
  ////const [zona, setZona] = useState<datosZona | null>(null);
  ////const [tipo, setTipo] = useState<datosTipo | null>(null);

  //Estado con los datos actuales de la cancha
  const [cancha, setCancha] = useState<inputCancha>({
    zona: cod_zona !== null ? parseInt(cod_zona, 10) : null,
    tipoCancha: cod_tipo !== null ? parseInt(cod_tipo, 10) : null,
    fecha: fecha_param,
  });

  //Estado para guardar todas las canchas disponibles
  const [canchas, setCanchas] = useState<datosCancha[]>([]);
  ////const [selectedOption, setSelectedOption] = useState(null);

  const getCanchas = async () => {
    const { canchas, cant } = (
      await axios.get(
        `http://localhost:3000/api/cancha?zona=${cancha?.zona}&tipoCancha=${cancha?.tipoCancha}&fecha=${cancha?.fecha}&page=${currentPage}`
      )
    ).data;
    setCantPages(cant);
    setCanchas(canchas);
  };

  // const getZona = async () => {
  //   setZona(
  //     (await axios.get(`http://localhost:3000/api/zona/${cod_zona}`)).data
  //   );
  // };

  // const getTipo = async () => {
  //   setTipo(
  //     (await axios.get(`http://localhost:3000/api/tipo_cancha/${cod_tipo}`))
  //       .data
  //   );
  // };

  const handleReserva = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    //Traigo el nro de la cancha desde el boton
    const nro_cancha: number = parseInt(
      e.currentTarget[1].getAttribute('data-id') as string
    );

    const horario = e.target[0].value as string;

    /*//Creo fecha de la reserva(fecha actual)
    const fecha = new Date()
    const año = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, '0') // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11.
    const dia = String(fecha.getDate()).padStart(2, '0')
    const fechaFormateada = `${año}-${mes}-${dia}`*/

    setDatosReserva({ ...datosReserva, nro_cancha, hora_turno: horario });

    setLoading(false);
  };

  const fetchData = async () => {
    return await axios.post('http://localhost:3000/api/reserva/', datosReserva);
  };

  useEffect(() => {
    // getZona();
    // getTipo();
    getCanchas();
  }, [currentPage]);

  return (
    <section>
      <div className='h-screen w-full'>
        <div className='bg-hero2 h-full bg-cover z-20 opacity-[85%] w-full flex-col flex justify-center items-center px-0'>
          <div className='w-[60%] flex flex-col justify-center items-center bg-white py-8 px-4 rounded-md'>
            <div className='w-full flex-col gap-y-8 md:grid md:grid-cols-3 justify-center '>
              {canchas.map((item) => (
                <div className='mb-4 flex flex-col items-center w-full'>
                  <form
                    className='mx-auto'
                    key={item.nro_cancha}
                    onSubmit={handleReserva}
                  >
                    <div className='flex flex-col items-center'>
                      <div className='flex flex-col w-full items-center text-center'>
                        <div className='font-bold'>
                          <p>Cancha: {item.descripcion}</p>
                          <p>Direccion: {`${item.calle} ${item.nro_calle}`}</p>
                          <p>Costo: ${item.costo_por_turno}</p>
                        </div>
                        <div className='h-full w-full'>
                          <select
                            required
                            name='hora_turno'
                            className='border p-2 my-2 w-full'
                          >
                            <option value=''>Selecciona un horario</option>
                            {item.horarios.map((horario, index) => (
                              <option key={index} value={horario}>
                                {horario}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button
                        type='submit'
                        data-id={item.nro_cancha}
                        className={`w-48 h-12 text-black bg-green-400 rounded-md flex justify-center items-center`}
                        disabled={loading ? true : false}
                      >
                        {!loading ? (
                          <p className='text-lg font-bold text-white'>
                            Reserva
                          </p>
                        ) : (
                          <div role='status'>
                            <svg
                              aria-hidden='true'
                              className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                              viewBox='0 0 100 101'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                fill='currentColor'
                              />
                              <path
                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                fill='currentFill'
                              />
                            </svg>
                            <span className='sr-only'>Loading...</span>
                          </div>
                        )}
                      </button>
                      <div className='border-b-8' />
                    </div>
                  </form>
                </div>
              ))}
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
      </div>
    </section>
  );
};

export default Canchas;

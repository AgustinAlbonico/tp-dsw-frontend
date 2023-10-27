import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Button from '../components/Button'
import Header from '../components/Header'

type inputCancha = {
  zona: number | null
  tipoCancha: number | null
  fecha: string | null
}

interface datosCancha {
  nro_cancha: number
  descripcion: string
  costo_por_turno: number
  calle: string
  nro_calle: number
  horario_apertura: string
  horario_cierre: string
  cod_zona: number
  cod_tipo: number
  horarios: string[]
}

interface datosZona {
  cod_zona: number
  descripcion: string
}

interface datosTipo {
  cod_tipo: number
  descripcion: string
}

interface datosReserva {
  fecha_turno: string | null
  hora_turno: string
  fecha_hora_reserva: string
  estado: string
  id_usuario: number
  nro_cancha: number
}

const Canchas = (): JSX.Element => {
  //Extraigo los parametros de zona y tipo
  const [params] = useSearchParams()
  const cod_zona = params.get('zona')
  const cod_tipo = params.get('tipo-cancha')
  const fecha_param = params.get('fecha')

  const [loading, setLoading] = useState(false)

  const [datosReserva, setDatosReserva] = useState<datosReserva | null>(null)
  const [horario, setHorario] = useState<string>('')

  //Creo un estado para traer la zona y tipo completos
  const [zona, setZona] = useState<datosZona | null>(null)
  const [tipo, setTipo] = useState<datosTipo | null>(null)

  //Estado con los datos actuales de la cancha
  const [cancha, setCancha] = useState<inputCancha>({
    zona: cod_zona !== null ? parseInt(cod_zona, 10) : null,
    tipoCancha: cod_tipo !== null ? parseInt(cod_tipo, 10) : null,
    fecha: fecha_param,
  })

  //Estado para guardar todas las canchas disponibles
  const [canchas, setCanchas] = useState<datosCancha[]>([])
  const [selectedOption, setSelectedOption] = useState(null)

  const getCanchas = async () => {
    setCanchas(
      (
        await axios.get(
          `http://localhost:3000/api/cancha?zona=${cancha?.zona}&tipoCancha=${cancha?.tipoCancha}&fecha=${cancha?.fecha}`
        )
      ).data
    )
  }

  const getZona = async () => {
    setZona(
      (await axios.get(`http://localhost:3000/api/zona/${cod_zona}`)).data
    )
  }

  const getTipo = async () => {
    setTipo(
      (await axios.get(`http://localhost:3000/api/tipo_cancha/${cod_tipo}`))
        .data
    )
  }

  const handleReserva = async (e) => {
    e.preventDefault()
    setLoading(true)

    //Traigo el nro de la cancha desde el boton
    const nro_cancha = e.target[1].getAttribute('data-id')

    //Creo fecha de la reserva(fecha actual)
    const fecha = new Date()
    const año = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, '0') // Sumamos 1 al mes ya que en JavaScript los meses van de 0 a 11.
    const dia = String(fecha.getDate()).padStart(2, '0')
    const fechaFormateada = `${año}-${mes}-${dia}`

    setDatosReserva({
      estado: 'reservado',
      fecha_hora_reserva: fechaFormateada,
      fecha_turno: fecha_param,
      nro_cancha,
      id_usuario: 16,
      hora_turno: horario,
    })

    console.log(datosReserva)
  }

  useEffect(() => {
    getZona()
    getTipo()
    getCanchas()
  }, [])

  return (
    <section>
      <div className='container h-screen w-full'>
        <Header />
        <div className='bg-hero2 h-full bg-cover z-20 opacity-[85%] w-full flex-col flex justify-center items-center px-0'>
          <div className='relative'></div>
          <div className='w-[100%] flex-col items-end mt-12'>
            {canchas.map((item) => (
              <form
                className='w-[90%] bg-white my-2 mx-auto h-40 rounded-lg'
                key={item.nro_cancha}
                onSubmit={handleReserva}
              >
                <div className=''>
                  <div className='flex'>
                    <div className='font-bold'>
                      <p>Cancha: {item.descripcion}</p>
                      <p>Direccion: {`${item.calle} ${item.nro_calle}`}</p>
                      <p>Costo: {item.costo_por_turno} $</p>
                    </div>
                    <div>
                      <select
                        required
                        onChange={(e) => setHorario(e.target.value)}
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
                    className={`w-56 h-14 text-black bg-green-400 rounded-md flex justify-center items-center`}
                  >
                    {!loading ? (
                      <p className='text-lg font-bold text-white'>Reserva</p>
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
                </div>
              </form>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Canchas

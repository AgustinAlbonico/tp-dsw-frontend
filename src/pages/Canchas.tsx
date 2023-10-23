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

const Canchas = (): JSX.Element => {
  //Extraigo los parametros de zona y tipo
  const [params] = useSearchParams()
  const cod_zona = params.get('zona')
  const cod_tipo = params.get('tipo-cancha')

  //Creo un estado para traer la zona y tipo completos
  const [zona, setZona] = useState<datosZona | null>(null)
  const [tipo, setTipo] = useState<datosTipo | null>(null)

  //Estado con los datos actuales de la cancha
  const [cancha, setCancha] = useState<inputCancha>({
    zona: cod_zona !== null ? parseInt(cod_zona, 10) : null,
    tipoCancha: cod_tipo !== null ? parseInt(cod_tipo, 10) : null,
    fecha: params.get('fecha'),
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

  useEffect(() => {
    getZona()
    getTipo()
    getCanchas()
  }, [])

  useEffect(() => {
    if (!(canchas.length === 0)) console.log(canchas)
  }, [canchas])

  return (
    <section>
      <div className='container h-screen w-full'>
        <Header />
        <div className='bg-hero2 h-full bg-cover bg-no-repeat z-20 opacity-[85%] w-full flex-col flex justify-center items-center px-8'>
          <div className='w-[90%] bg-slate-600 h-full'></div>
        </div>
      </div>
    </section>
  )
}

export default Canchas

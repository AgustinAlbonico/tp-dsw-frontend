import axios from 'axios'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'

interface datosZona {
  cod_zona: number
  descripcion: string
}

interface datosTipoCancha {
  cod_tipo: number
  descripcion: string
}

interface formDataTypes{
  descripcion?: string,
  cod_zona?: number,
  costo_por_turno?: string,
  calle?: string,
  nro_calle?: string,
  horario_apertura?: string,
  horario_cierre?: string,
  cod_tipo?: number,
}

const backend_url: string = import.meta.env.VITE_BACKEND_URL

function ModalInsert({setShowModalin, setCurrentPage}) {
  const [zonas, setZonas] = useState<datosZona[]>([])
  const [tiposCanchas, setTipoCanchas] = useState<datosTipoCancha[]>([])

  //const [formErrores, setFormErrores] = useState({})

  const [formData, setFormData] = useState<formDataTypes>()

  useEffect(() => {
    //Cargo datos de las zonas
    fetch(`${backend_url}/zona`)
      .then((res) => res.json())
      .then((data) => {
        setZonas(data)
      })

    //Cargo datos de los tipos de cancha
    fetch(`${backend_url}/tipo_cancha`)
      .then((res) => res.json())
      .then((data) => {
        setTipoCanchas(data)
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleZona = (option: datosZona) => setFormData({...formData, cod_zona: option.cod_zona})
  const handleTipo = (option: datosTipoCancha) => setFormData({...formData, cod_tipo: option.cod_tipo})


  // verifica los campos del input
  // const validateValues = (inputValues) => {
  //   let errors = {}
  //   let isError = false
  //   let regex = /^(.|\s)*[a-zA-Z]+(.|\s)*$/
  //   let regexnum = /^[0-9]*$/

  //   if (!inputValues.descripcion.trim()) {
  //     errors.descripcion = 'Debe completar este campo!'
  //     isError = true
  //   } else if (!regex.test(inputValues.descripcion)) {
  //     errors.descripcion = 'Solo puede ingresar letras y espacios.'
  //     isError = true
  //   }

  //   if (!inputValues.calle.trim()) {
  //     errors.calle = 'Debe completar este campo!'
  //     isError = true
  //   } else if (!regex.test(inputValues.calle)) {
  //     errors.descripcion = 'Solo puede ingresar letras y espacios.'
  //     isError = true
  //   }

  //   if (!inputValues.nro_calle.trim()) {
  //     errors.nro_calle = 'Debe completar este campo!'
  //     isError = true
  //   } else if (!regexnum.test(inputValues.nro_calle)) {
  //     errors.nro_calle = 'Solo puede ingresar numeros.'
  //     isError = true
  //   }

  //   if (!inputValues.costo.trim()) {
  //     errors.costo = 'Debe completar este campo!'
  //     isError = true
  //   } else if (!regexnum.test(inputValues.costo)) {
  //     errors.costo = 'Solo puede ingresar numeros.'
  //     isError = true
  //   }

  //   if (inputValues.zona === '') {
  //     errors.zona = 'Debe seleccionar una zona!'
  //     isError = true
  //   }

  //   if (inputValues.tipo === '') {
  //     errors.tipo = 'Debe seleccionar un tipo!'
  //     isError = true
  //   }

  //   if (inputValues.horario_apertura === '') {
  //     errors.horario_apertura = 'Debe seleccionar un horario!'
  //     isError = true
  //   }

  //   if (inputValues.horario_cierre === '') {
  //     errors.horario_cierre = 'Debe seleccionar un horario!'
  //     isError = true
  //   } else if (inputValues.horario_apertura >= inputValues.horario_cierre) {
  //     errors.horario_cierre =
  //       'El horario de apertura no puede ser mas tarde que el de cierre.'
  //     isError = true
  //   }
  //   return isError ? errors : null
  // }

  // guarda los datos
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    try {
      
      await axios.post(`${backend_url}/cancha`, { ...formData });

      setCurrentPage(1);

      toast.success('Cancha creada con exito!', {
        position: 'top-center',
        autoClose: 1500,
      });
      
      setShowModalin(false)
    } catch (error) {
      toast.error('Error al crear cancha!', {
        position: 'top-center',
        autoClose: 1500,
      });
    }
  }

  return (
    <section>
      <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-[1px] '>
        <div className='relative w-[90%] h-[80%] my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='flex items-start justify-center p-2 border-b border-solid border-gray-300 rounded-t '>
              <h3 className='text-3xl font-bold'>Agregar cancha</h3>
            </div>
            <div className='relative p-3 flex-auto'>
              <form
                className='bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full'
                onSubmit={handleSubmit}
              >
                <label className='block text-black text-sm font-bold mb-1'>
                  Descripcion
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-4 text-black mb-2'
                  placeholder='Ingrese una descripcion.'
                  name='descripcion'
                  onChange={handleChange}
                  value={formData?.descripcion}
                  required
                />
                {/* {formErrores.descripcion ? (
                  <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                    {formErrores.descripcion}
                  </div>
                ) : null} */}
                <label className='block text-black text-sm font-bold mb-1'>
                  Tipo de cancha
                </label>
                <Select
                  className='w-full h-full bg-transparent mb-2'
                  options={tiposCanchas}
                  getOptionLabel={(item) => item.descripcion}
                  onChange={handleTipo}
                  placeholder='Tipo de cancha...'
                  required
                />
                {/* {formErrores.tipo ? (
                  <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                    {formErrores.tipo}
                  </div>
                ) : null} */}
                <label className='block text-black text-sm font-bold mb-1'>
                  Zona
                </label>
                <Select
                  className='w-full h-full bg-transparent mb-2'
                  options={zonas}
                  getOptionLabel={(item) => item.descripcion}
                  onChange={handleZona}
                  placeholder='Zona...'
                  required
                />
                {/* {formErrores.zona ? (
                  <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                    {formErrores.zona}
                  </div>
                ) : null} */}
                <label className='block text-black text-sm font-bold mb-1'>
                  Calle
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-4 text-black mb-2'
                  placeholder='Ingrese una calle.'
                  name='calle'
                  onChange={handleChange}
                  value={formData?.calle}
                  required
                />
                {/* {formErrores.calle ? (
                  <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                    {formErrores.calle}
                  </div>
                ) : null} */}
                <label className='block text-black text-sm font-bold mb-1'>
                  Numero de calle
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-4 text-black mb-2'
                  placeholder='Ingrese numero de calle.'
                  name='nro_calle'
                  onChange={handleChange}
                  value={formData?.nro_calle}
                  required
                />
                {/* {formErrores.nro_calle ? (
                  <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                    {formErrores.nro_calle}
                  </div>
                ) : null} */}
                <label className='block text-black text-sm font-bold mb-1'>
                  Costo
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-4 text-black mb-2'
                  placeholder='Ingrese un costo x turno.'
                  name='costo_por_turno'
                  onChange={handleChange}
                  value={formData?.costo_por_turno}
                  required
                />
                {/* {formErrores.costo ? (
                  <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                    {formErrores.costo}
                  </div>
                ) : null} */}
                <label className='block text-black text-sm font-bold mb-1'>
                  Horario de apertura(De la forma '10:00')
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-4 text-black mb-2'
                  placeholder='Ingrese un costo x partido.'
                  name='horario_apertura'
                  onChange={handleChange}
                  value={formData?.horario_apertura}
                  required
                />
                {/* {formErrores.horario_apertura ? (
                  <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                    {formErrores.horario_apertura}
                  </div>
                ) : null} */}
                <label className='block text-black text-sm font-bold mb-1'>
                  Horario de cierre(De la forma '10:00')
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-4 text-black mb-2'
                  placeholder='Ingrese un costo x partido.'
                  name='horario_cierre'
                  onChange={handleChange}
                  value={formData?.horario_cierre}
                  required
                />
                {/* {formErrores.horario_cierre ? (
                  <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                    {formErrores.horario_cierre}
                  </div>
                ) : null} */}
                <div className='flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b gap-x-4'>
                  <button
                    className='text-white bg-red-600 font-bold uppercase text-sm rounded shadow w-36 h-12'
                    type='button'
                    onClick={()=>setShowModalin(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className='text-white bg-green-600 font-bold uppercase text-sm rounded shadow w-36 h-12'
                    type='submit'
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModalInsert

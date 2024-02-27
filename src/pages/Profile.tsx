import Header from '../components/Header'
import Button from '../components/Button'
import { ToastContainer, toast } from 'react-toastify'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

interface registerData {
  id_usuario: number | null
  nombre: string
  apellido: string
  fecha_nacimiento: string
  telefono: string
  email: string
}

const Profile = (): JSX.Element => {
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const [inputData, setInputData] = useState<registerData>({
    id_usuario: null,
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    telefono: '',
    email: '',
  })

  // const getData = async () => {
  //   const data: registerData = (
  //     await axios.get('http://localhost:3000/api/user/info')
  //   ).data;
  //   setUser({
  //     nombre: data.nombre,
  //     apellido: data.apellido,
  //     fecha_nacimiento: data.fecha_nacimiento,
  //     telefono: data.telefono,
  //     email: data.email,
  //   });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    const fechaHora = new Date(user.fecha_nacimiento)

    const anio = fechaHora.getFullYear()
    const mes = ('0' + (fechaHora.getMonth() + 1)).slice(-2)
    const dia = ('0' + fechaHora.getDate()).slice(-2)

    const fecha = `${anio}-${mes}-${dia}`

    setInputData({
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono,
      email: user.email,
      fecha_nacimiento: fecha,
    })
  }, [])

  const handleDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const url = 'http://localhost:3000/api/user/'
    try {
      if (
        inputData.nombre &&
        inputData.apellido &&
        inputData.fecha_nacimiento &&
        inputData.telefono
      ) {
        const info = {
          ...(await axios.put(url, { ...inputData })).data,
        }

        if (info.error)
          toast.error('Email o telefono ya registrados!', {
            position: 'top-center',
            autoClose: 2000,
          })
        else {
          setTimeout(() => {
            navigate('/')
          }, 3000)
          toast.success('Cambios realizados con exito!', {
            position: 'top-center',
            autoClose: 3000,
          })
        }
      }
    } catch (error) {
      toast.error('Error al registrar usuario', {
        position: 'top-center',
        autoClose: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className='h-screen w-full'>
        <div className='bg-hero2 h-full bg-cover bg-no-repeat z-20 opacity-[85%] w-full flex-col flex items-center justify-center px-8'>
          <div className='w-full sm:w-[90%] md:w-[80%] lg:w-[50%] flex flex-col items-center flex-nowrap bg-white rounded-lg shadow-lg mt-12'>
            <form
              className='flex flex-col items-center h-full font-bold py-8 w-[85%] lg:w-[90%]'
              onSubmit={handleUpdate}
            >
              <h1 className='text-3xl text-center text-teal-500 leading-6'>
                Mi perfil
              </h1>
              <div className='w-full flex flex-col gap-y-4 items-center mt-4 mb-6'>
                <div className='flex flex-col gap-y-1 w-full'>
                  <p>Nombre completo:</p>
                  <div className='flex w-[100%] gap-4'>
                    <input
                      type='text'
                      className='h-10 border-[1px] pl-2 w-[100%] font-thin'
                      name='nombre'
                      placeholder='Nombre'
                      onChange={handleDataInput}
                      required
                      value={inputData.nombre}
                    />
                    <input
                      type='text'
                      className='h-10 border-[1px] pl-2 w-[100%] font-thin'
                      name='apellido'
                      placeholder='Apellido'
                      onChange={handleDataInput}
                      required
                      value={inputData.apellido}
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-y-1 w-full'>
                  <p className=''>Fecha nacimiento:</p>
                  <input
                    type='date'
                    className='h-10 border-[1px] pl-2 font-light'
                    name='fecha_nacimiento'
                    onChange={handleDataInput}
                    required
                    value={inputData.fecha_nacimiento}
                  />
                </div>
                <div className='flex flex-col gap-y-1 w-full'>
                  <p className=''>Telefono:</p>
                  <input
                    type='text'
                    className='h-10 border-[1px] pl-2 font-light'
                    name='telefono'
                    placeholder='Telefono'
                    onChange={handleDataInput}
                    required
                    value={inputData.telefono}
                  />
                </div>
                <div className='flex flex-col gap-y-1 w-full'>
                  <p className=''>Email:</p>
                  <input
                    type='email'
                    className='h-10 border-[1px] pl-2 font-light'
                    name='email'
                    placeholder='Email'
                    disabled={true}
                    required
                    value={inputData.email}
                  />
                </div>
              </div>
              <Button
                text='Actualiza'
                color='bg-green-400'
                loading={loading}
                type='submit'
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile

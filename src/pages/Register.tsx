import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner'

interface registerData {
  nombre: string
  apellido: string
  fecha_nacimiento: string
  telefono: string
  email: string
  password: string
}

const backend_url: string = import.meta.env.VITE_BACKEND_URL

const Register = (): JSX.Element => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const { user } = useAuth()

  const [rptPassword, setRptPassword] = useState<string>('')
  const [coinciden, setCoinciden] = useState<boolean>(true)

  const [inputData, setInputData] = useState<registerData>({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    telefono: '',
    email: '',
    password: '',
  })

  //Si el usuario esta logueado no deberia poder registrarse
  useEffect(() => {
    user && navigate('/')
  }, [user, navigate])

  const handleDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputData.password !== rptPassword) {
      setCoinciden(false)
    } else {
      setLoading(true)
      setCoinciden(true)
      const url = `${backend_url}/user/register`
      try {
        if (
          inputData.email &&
          inputData.password &&
          inputData.nombre &&
          inputData.apellido &&
          inputData.fecha_nacimiento &&
          inputData.telefono
        ) {
          const info = {
            ...(await axios.post(url, { ...inputData })).data,
          }

          if (info.error)
            toast.error('Email o telefono ya registrados!', {
              position: 'top-center',
              autoClose: 2000,
            })
          else {
            setTimeout(() => {
              navigate('/')
            }, 1500)
            toast.success('Cuenta creada con exito!', {
              position: 'top-center',
              autoClose: 1500,
            })
            toast.success('Email de verificacion enviado!', {
              position: 'top-center',
              autoClose: 1500,
            })
          }
        }
      } catch (error) {
        toast.error('Error al registrar usuario', {
          position: 'top-center',
          autoClose: 1000,
        })
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <section>
      <div className='h-screen w-full'>
        <div className='bg-hero2 h-full bg-cover bg-no-repeat z-20 opacity-[85%] w-full flex-col flex justify-center items-center px-8'>
          <div className='container py-4 flex flex-col flex-nowrap bg-white rounded-lg shadow-lg mt-12 md:w-[50%]'>
            <form
              className='flex flex-col items-center h-full my-8 font-bold'
              onSubmit={handleRegister}
            >
              <h1
                className='text-3xl text-center text-teal-500'
                data-testid='cypress-title'
              >
                Registrate
              </h1>
              <div className='w-full flex flex-col gap-y-2 items-center mt-6'>
                <div className='flex flex-col gap-y-1 w-[80%]'>
                  <p className=''>Nombre completo:</p>
                  <div className='flex w-[100%] gap-4'>
                    <input
                      type='text'
                      className='h-10 border-[1px] pl-2 w-[100%] font-thin'
                      name='nombre'
                      placeholder='Nombre'
                      onChange={handleDataInput}
                      required
                      data-testid='cypress-nombre'
                    />
                    <input
                      type='text'
                      className='h-10 border-[1px] pl-2 w-[100%] font-thin'
                      name='apellido'
                      placeholder='Apellido'
                      onChange={handleDataInput}
                      required
                      data-testid='cypress-apellido'
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-y-1 w-[80%]'>
                  <p className=''>Fecha nacimiento:</p>
                  <input
                    type='date'
                    className='h-10 border-[1px] pl-2 font-light'
                    name='fecha_nacimiento'
                    onChange={handleDataInput}
                    required
                    data-testid='cypress-fechaNacimiento'
                  />
                </div>
                <div className='flex flex-col gap-y-1 w-[80%]'>
                  <p className=''>Telefono:</p>
                  <input
                    type='text'
                    className='h-10 border-[1px] pl-2 font-light'
                    name='telefono'
                    placeholder='Telefono'
                    onChange={handleDataInput}
                    required
                    data-testid='cypress-telefono'
                  />
                </div>
                <div className='flex flex-col gap-y-1 w-[80%]'>
                  <p className=''>Email:</p>
                  <input
                    type='email'
                    className='h-10 border-[1px] pl-2 font-light'
                    name='email'
                    placeholder='Email'
                    onChange={handleDataInput}
                    required
                    data-testid='cypress-email'
                  />
                </div>
                <div className='flex flex-col gap-y-1 w-[80%]'>
                  <p className=''>Contraseña:</p>
                  <input
                    type='password'
                    className='h-10 border-[1px] pl-2 font-thin'
                    name='password'
                    placeholder='Contraseña'
                    onChange={handleDataInput}
                    required
                    data-testid='cypress-password'
                  />
                </div>
                <div className='flex flex-col gap-y-1 w-[80%] mb-6'>
                  <p>Repite la contraseña:</p>
                  <input
                    type='password'
                    className='h-10 border-[1px] pl-2 font-thin'
                    name='password'
                    placeholder='Repite la contraseña'
                    required
                    onChange={(e) => setRptPassword(e.target.value)}
                    data-testid='cypress-passwordRepeat'
                  />
                  {!coinciden ? (
                    <p className='text-red-700 font-thin'>
                      Las contraseñas no coinciden
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>

                <button
                  className='rounded-md flex justify-center items-center w-32 bg-green-400 h-12'
                  type='submit'
                  data-testid='cypress-button'
                >
                  {!loading ? (
                    <p className='font-bold text-white text-lg'>Registrate</p>
                  ) : (
                    <Spinner />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}

export default Register

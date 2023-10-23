import Header from '../components/Header'
import Button from '../components/Button'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface registerData {
  nombre: string
  apellido: string
  dni: string
  fecha_nacimiento: string
  telefono: string
  email: string
  password: string
}

const Register = (): JSX.Element => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)

  const [rptPassword, setRptPassword] = useState<string>('')

  const [inputData, setInputData] = useState<registerData>({
    nombre: '',
    apellido: '',
    dni: '',
    fecha_nacimiento: '',
    telefono: '',
    email: '',
    password: '',
  })

  const handleDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (inputData.password !== rptPassword) {
      toast.error('Las contraseñas no coinciden', {
        position: 'top-center',
        autoClose: 2000,
      })
    } else {
      const url = 'http://localhost:3000/api/user/register'
      try {
        if (
          inputData.email &&
          inputData.password &&
          inputData.dni &&
          inputData.nombre &&
          inputData.apellido &&
          inputData.fecha_nacimiento &&
          inputData.telefono
        ) {
          const info = {
            ...(await axios.post(url, { ...inputData })),
          }
          if (info) {
            setTimeout(() => {
              navigate('/')
            }, 3000)
            toast.success('Email de verificacion enviado!', {
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
  }

  return (
    <section>
      <div className='container h-screen w-full'>
        <Header />
        <div className='bg-hero2 h-full bg-cover bg-no-repeat z-20 opacity-[85%] w-full flex-col flex justify-center px-8'>
          <div className='container py-4 flex flex-col flex-nowrap bg-white w-full rounded-lg shadow-lg'>
            <form className='flex flex-col items-center w-full h-full my-8 font-bold'>
              <h1 className='text-3xl text-center text-teal-500'>Registrate</h1>
              <div className='w-[90%] flex flex-col gap-y-2 items-center mt-6'>
                <div className='flex flex-col gap-y-1 w-[80%]'>
                  <p className=''>Nombre completo:</p>
                  <div className='flex w-[100%]'>
                    <input
                      type='text'
                      className='h-10 border-[1px] pl-2 w-[100%] font-thin'
                      name='nombre'
                      placeholder='Nombre'
                      onChange={handleDataInput}
                      required
                    />
                    <input
                      type='text'
                      className='h-10 border-[1px] pl-2 w-[100%]'
                      name='apellido'
                      placeholder='Apellido'
                      onChange={handleDataInput}
                      required
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
                  />
                </div>
                <div className='flex flex-col gap-y-1 w-[80%]'>
                  <p className=''>Nro. documento:</p>
                  <input
                    type='text'
                    className='h-10 border-[1px] pl-2 font-light'
                    name='dni'
                    onChange={handleDataInput}
                    required
                  />
                </div>
                <div className='flex flex-col gap-y-1 w-[80%]'>
                  <p className=''>Telefono:</p>
                  <input
                    type='text'
                    className='h-10 border-[1px] pl-2 font-light'
                    name='telefono'
                    onChange={handleDataInput}
                    required
                  />
                </div>
                <div className='flex flex-col gap-y-1 w-[80%]'>
                  <p className=''>Email:</p>
                  <input
                    type='email'
                    className='h-10 border-[1px] pl-2 font-light'
                    name='email'
                    onChange={handleDataInput}
                    required
                  />
                </div>
                <div className='flex flex-col gap-y-1 w-[80%]'>
                  <p className=''>Contraseña:</p>
                  <input
                    type='password'
                    className='h-10 border-[1px] pl-2'
                    name='password'
                    onChange={handleDataInput}
                    required
                  />
                </div>
                <div className='flex flex-col gap-y-1 w-[80%] mb-6'>
                  <p className=''>Repite la contraseña:</p>
                  <input
                    type='password'
                    className='h-10 border-[1px] pl-2'
                    name='password'
                    required
                    onChange={(e) => setRptPassword(e.target.value)}
                  />
                </div>

                <Button
                  text='Registrate'
                  color='bg-green-400'
                  onClick={handleRegister}
                  loading={loading}
                />
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

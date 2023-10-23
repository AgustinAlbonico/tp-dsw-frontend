import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Header from '../components/Header'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
//Config para que el browser me guarde las cookies
axios.defaults.withCredentials = true

type userDataType = {
  email: string
  password: string
}

const Login = (): JSX.Element => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [loginData, setLoginData] = useState<userDataType>({
    email: '',
    password: '',
  })

  const handleDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const url = 'http://localhost:3000/api/user/login'
    try {
      if (loginData.email && loginData.password) {
        const info = {
          ...(await axios.post(url, { ...loginData })),
        }
        if (info) {
          setTimeout(() => {
            navigate('/')
          }, 2000)
          toast.success('Inicio de sesion correcto', {
            position: 'top-center',
            autoClose: 2000,
          })
        }
      }
    } catch (error) {
      toast.error('Usuario o contraseña incorrectos!', {
        position: 'top-center',
        autoClose: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className='container h-screen w-full'>
        <Header />
        <div className='bg-hero2 h-full bg-cover bg-no-repeat z-20 opacity-[85%] w-full flex-col flex justify-center px-8'>
          <div className='container py-4 flex flex-col flex-nowrap bg-white w-full rounded-lg shadow-lg'>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col items-center w-full h-full my-8 font-bold'
            >
              <h1 className='text-3xl text-center text-teal-500'>Login</h1>
              <div className='w-[90%] flex flex-col gap-y-6 items-center mt-6'>
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
                  <p className=''>Password:</p>
                  <input
                    type='password'
                    className='h-10 border-[1px] pl-2'
                    name='password'
                    onChange={handleDataInput}
                    required
                  />
                  <a href='/forgot-password' className='text-xs mt-2 '>
                    Olvidaste tu contraseña?
                  </a>
                </div>
                <Button
                  text='Ingresar'
                  color='bg-green-400'
                  onClick={handleSubmit}
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

export default Login

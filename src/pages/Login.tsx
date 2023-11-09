import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Header from '../components/Header'
import Button from '../components/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
//Config para que el browser me guarde las cookies
axios.defaults.withCredentials = true

type userDataType = {
  email: string
  password: string
}

const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const { user, setUser } = useAuth()

  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const [loginData, setLoginData] = useState<userDataType>({
    email: '',
    password: '',
  })

  //Si el usuario ya esta logueado lo redirijo
  useEffect(() => {
    user && navigate('/')
  }, [])

  const handleDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setDisabled(true)
    const url = 'http://localhost:3000/api/user/login'
    try {
      if (loginData.email && loginData.password) {
        const info = {
          ...(await axios.post(url, { ...loginData })),
        }
        if (info.data.user) {
          setTimeout(() => {
            navigate(from, { replace: true })
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
      setDisabled(false)
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
                  disabled={disabled}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login

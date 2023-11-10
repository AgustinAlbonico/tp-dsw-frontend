import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../components/Button'
import Cruz from '../assets/cruz.svg'

interface userData {
  id_usuario: number
}

const ValidateEmail = (): JSX.Element => {
  const { token } = useParams()

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState<userData | null>(null)

  useEffect(() => {
    verifyEmail()
  }, [])

  const verifyEmail = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/user/validate-email/${token}`
      )

      setMessage(res.data.message)
      setUser(res.data.user)
    } catch (error) {
      setError(error?.response?.data?.message)
    }
  }

  return (
    <section>
      <div className='container h-screen w-full'>
        <Header />
        <div className='bg-hero2 h-full bg-cover bg-no-repeat z-20 opacity-[85%] w-full flex-col flex justify-center px-8'>
          <div className='container py-4 h-[40%] flex flex-col gap-12 justify-center items-center flex-nowrap bg-white w-full rounded-lg shadow-lg'>
            <div>
              {user ? (
                <svg
                  className='h-16'
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  width='100'
                  height='100'
                  viewBox='0 0 48 48'
                >
                  <linearGradient
                    id='1ayUTr30BaMDjOG69N2fSa_xTkoPEFGI0P7_gr1'
                    x1='21.241'
                    x2='3.541'
                    y1='39.241'
                    y2='21.541'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='.108' stop-color='#0d7044'></stop>
                    <stop offset='.433' stop-color='#11945a'></stop>
                  </linearGradient>
                  <path
                    fill='url(#1ayUTr30BaMDjOG69N2fSa_xTkoPEFGI0P7_gr1)'
                    d='M16.599,41.42L1.58,26.401c-0.774-0.774-0.774-2.028,0-2.802l4.019-4.019	c0.774-0.774,2.028-0.774,2.802,0L23.42,34.599c0.774,0.774,0.774,2.028,0,2.802l-4.019,4.019	C18.627,42.193,17.373,42.193,16.599,41.42z'
                  ></path>
                  <linearGradient
                    id='1ayUTr30BaMDjOG69N2fSb_xTkoPEFGI0P7_gr2'
                    x1='-15.77'
                    x2='26.403'
                    y1='43.228'
                    y2='43.228'
                    gradientTransform='rotate(134.999 21.287 38.873)'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0' stop-color='#2ac782'></stop>
                    <stop offset='1' stop-color='#21b876'></stop>
                  </linearGradient>
                  <path
                    fill='url(#1ayUTr30BaMDjOG69N2fSb_xTkoPEFGI0P7_gr2)'
                    d='M12.58,34.599L39.599,7.58c0.774-0.774,2.028-0.774,2.802,0l4.019,4.019	c0.774,0.774,0.774,2.028,0,2.802L19.401,41.42c-0.774,0.774-2.028,0.774-2.802,0l-4.019-4.019	C11.807,36.627,11.807,35.373,12.58,34.599z'
                  ></path>
                </svg>
              ) : (
                <img src={Cruz} />
              )}
            </div>
            <p
              className={`text-center ${
                user ? 'text-green-400' : 'text-red-500'
              } font-medium text-2xl`}
            >
              {!user ? error : message}
            </p>

            {user ? (
              <Button color='bg-green-400' text='Iniciar sesión' to='/login' />
            ) : (
              <Button color='bg-green-400' text='Volver al inicio' to='/' />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValidateEmail

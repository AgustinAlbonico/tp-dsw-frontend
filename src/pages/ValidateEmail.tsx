import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ValidateEmail = (): JSX.Element => {
  const { token } = useParams()

  const [verified, setVerified] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [user, setUser] = useState({})

  useEffect(() => {
    verifyEmail()
  }, [])

  const verifyEmail = async () => {
    try {
      const xd = await axios.put(
        `http://localhost:3000/api/user/validate-email/${token}`
      )
      console.log(xd)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <div className='container h-screen w-full'>
        <Header />
        <div className='bg-hero2 h-full bg-cover bg-no-repeat z-20 opacity-[85%] w-full flex-col flex justify-center px-8'>
          <div className='container py-4 h-[50%] flex flex-col justify-center items-center flex-nowrap bg-white w-full rounded-lg shadow-lg'>
            {verified ? <p>{message}</p> : <p>{message}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValidateEmail

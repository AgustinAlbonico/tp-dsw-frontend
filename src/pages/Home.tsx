import Header from '../components/Header'
import Hero from '../components/Hero'
import { useContext, useEffect } from 'react'
import Hero2 from '../components/Hero2'
import Main from '../components/Main'
import { AuthContext } from '../context/AuthContext'

const Home = (): JSX.Element => {
  const { user } = useContext(AuthContext)

  return (
    <main className='h-screen'>
      <Header />
      <Hero2 />
    </main>
  )
}

export default Home

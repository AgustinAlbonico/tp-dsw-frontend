import Header from '../components/Header'
import Hero from '../components/Hero'
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import Hero2 from '../components/Hero2'
import Main from '../components/Main'

const Home = (): JSX.Element => {
  const userContext = useContext(UserContext)

  return (
    <main className='h-screen'>
      <Header />
      <Hero2 />
    </main>
  )
}

export default Home

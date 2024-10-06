import './Home.css'
import Hero from '../../components/hero/Hero'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

function Home() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [data, setData] = useState(null)
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const loginUser = async () => {
    try {
      const auth0Token = await getAccessTokenSilently()
      console.log('Auth0 Token:', auth0Token);

      const response = await fetch(`${backendUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          auth0Token: auth0Token
        })
      })
      const data = await response.json()
      console.log('Respuesta del servidor:', data)

      // Guardar atributos en el localStorage
      localStorage.setItem('userId', data.user.id)
      localStorage.setItem('sessionToken', data.user.auth0Token)
      // Agregar más atributos según sea necesario

    } catch (error) {
      console.error('Error al hacer el POST:', error)
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`${backendUrl}/fixtures/data`)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error al hacer el GET:', error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loginUser()
    }
  }, [isAuthenticated])

  return (
    <div className='container'>
      <Hero />
      <button onClick={fetchData}>Fetch Data</button>
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  )
}

export default Home
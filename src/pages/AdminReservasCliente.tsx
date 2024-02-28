// AdminReservasCliente.tsx

import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Button from '../components/Button';

const AdminReservasCliente: React.FC = () => {
  
  interface datosCliente {
    id_usuario: number;
    nombre: string;
    apellido: string;
    email: string;
  }

  type userDataType = {
    email: string
  }

  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState<userDataType>({ email: '' });
  const [info, setInfo] = useState<datosCliente | null>(null);

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = `http://localhost:3000/api/ClienteReservas/busqueda`;
    try {
      if (loginData.email) {
        const response = await axios.post(url, { ...loginData });
        const info: datosCliente = response.data.user;
        setInfo(info);
        setLoading(false);
        console.log (info);
      } 
    } catch (error) {
      console.error('Error al obtener las reservas del cliente:', error);
      setLoading(false);
    }
  }

  return (
    <section>
      <div className='container h-screen w-full'>
        <Header />
        <div className='bg-scroll bg-hero2 bg-cover h-full z-20 opacity-[85%] w-full flex-col flex justify-center items-center px-0'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col items-center w-full h-full my-8 font-bold'
          >
            <div className='bg-white w-100 rounded-2xl flex flex-col items-center md:hidden gap-y-6 py-6 shadow-lg mx-15'>
              <p className='text-xl font-bold text-2xl text-black my-0'>Reservas del Cliente</p>
              <hr className="w-60 h-0.5 bg-gray-100 border-0 rounded md:my-2 dark:bg-green-700"></hr>
              <div className='flex flex-col items-center'>
                <label className='w-[80%] text-center my-4 bg-white'>
                  Ingrese el Email del cliente:
                  <input
                    type='email'
                    className='h-10 border-[1px] pl-2 font-light'
                    name='email'
                    onChange={handleLogin}
                  />
                </label>
                <Button
                  text='Ver Reservas'
                  color='bg-green-400'
                  onClick={handleSubmit}
                  loading={loading}
                />
              </div>
              {info && (
                <>
                  <p className='text-xl font-bold text-2xl text-white my-0'>
                    Historial de reservas de {info.nombre} {info.apellido} ({info.email})
                  </p>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminReservasCliente;




/*
import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Button from '../components/Button';

const AdminReservasCliente: React.FC = () => {
  
  interface datosCliente {
    id_usuario: number;
    nombre: string;
    apellido: string;
    email: string;
  }

  type userDataType = {
    email: string
  }

  const [datosCliente, setDatosCliente] = useState<datosCliente | null>(null);
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState<userDataType>({
    email: ''
  })

  const [info, setInfo] = useState<datosCliente | null>(null);

  // Para cargar el correo electrónico
  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  //Endpoint de la API con el correo electrónico cargado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const url = `http://localhost:3000/api/ClienteReservas/busqueda`
    try {
      if (loginData.email) {
        const response = await axios.post(url, { ...loginData }); //Hace la solicitud http
        const info: datosCliente = response.data.user; // Supongo que la respuesta tiene una propiedad user con los datos
        setInfo(info);
        setLoading(false);
        }
        if (info) {
          console.log (info)  
          }
        } catch (error) {
          console.error('Error al obtener las reservas del cliente:', error);
          setLoading(false);
          }
  }
  return (
    <section>
      <div className='container h-screen w-full'>
        <Header />
        <div className='bg-scroll bg-hero2 bg-cover h-full z-20 opacity-[85%] w-full flex-col flex justify-center items-center px-0'>
              <form
              onSubmit={handleSubmit}
              className='flex flex-col items-center w-full h-full my-8 font-bold'
              >
          <div className='bg-white w-100 rounded-2xl flex flex-col items-center md:hidden gap-y-6 py-6 shadow-lg mx-15'>
            <p className='text-xl font-bold text-2xl text-black my-0'>Reservas del Cliente</p>
            <hr className="w-60 h-0.5 bg-gray-100 border-0 rounded md:my-2 dark:bg-green-700"></hr>
            <div className='flex flex-col items-center'>
              <label className='w-[80%] text-center my-4 bg-white'>
                Ingrese el Email del cliente:
                <input
                  type='email'
                  className='h-10 border-[1px] pl-2 font-light'
                  name='email'
                  onChange={handleLogin}
                />
              </label>
              <Button
                text='Ver Reservas'
                color='bg-green-400'
                onClick={handleSubmit}
                loading={loading} // Usa el estado de carga para mostrar un indicador de carga
              />
            </div>
            {info && (
              <>
                <p className='text-xl font-bold text-2xl text-white my-0'>
                  Historial de reservas de {info.nombre} {info.apellido} ({info.email})
                </p>
              </>
             )}
          </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminReservasCliente;
*/
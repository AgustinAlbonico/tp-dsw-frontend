// AdminReservasCliente.tsx

import React, { useState, useEffect } from 'react';
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
  
  interface datosReserva {
    id_reserva: number;
    fecha_turno: string;
    hora_turno: string;
    estado: string;
    id_usuario: number;
    nro_cancha: number;
    cancha: string;
    usuario: string;
  }

  const [userId, setUserId] = useState<string>('');
  const [reservas, setReservas] = useState<datosReserva[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleVerReservasClick = async () => {
    try {
      const { status, data } = await axios.get(`/api/reservas/cliente/${userId}`);
      if (status === 200) {
        setReservas(data);
        setMensaje(null);
      } else {
        setReservas([]);
        setMensaje('Cliente no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener las reservas del cliente:', error);
      setMensaje('Ocurrió un error al cargar las reservas');
    }
  };

  useEffect(() => {
    // Se ejecuta solo una vez al montar el componente
  }, []);

  return (
    <section>
      <div className='container h-screen w-full'>
        <Header />
        <div className='bg-scroll bg-hero2 bg-cover h-full z-20 opacity-[85%] w-full flex-col flex justify-center items-center px-0'>
        <div className='bg-white w-100 rounded-2xl flex flex-col items-center md:hidden gap-y-6 py-6 shadow-lg mx-15'>
            <p className='text-xl font-bold text-2xl text-black my-0'>Reservas del Cliente</p>
            <hr className="w-60 h-0.5 bg-gray-100 border-0 rounded md:my-2 dark:bg-green-700"></hr>
            <div className='flex flex-col items-center'>
            <label className='w-[80%] text-center border-b-[1.5rem] bg-white'>
                  Ingrese el ID del Cliente:
                  <input
                    type="text"
                    value={userId}
                    onChange={handleUserIdChange}
                    className='h-10 border-[1px] pl-2 font-light'
                  />
                </label>
                <Button
                  text='Ver Reservas'
                  color='bg-green-400'
                  onClick={handleVerReservasClick}
                />
             </div>
            {mensaje && <p>{mensaje}</p>}
            {reservas.length > 0 && (
              <div>
                {reservas.map((reserva) => (
                  <div key={reserva.id_reserva} className='my-4'>
                    <p>Fecha: {new Date(reserva.fecha_turno).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</p>
                    <p>Hora Inicio: {new Date(reserva.hora_turno).toLocaleTimeString('es-ES', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' })}</p>
                    {/* Otros detalles de la reserva */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminReservasCliente;




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
  }
  
  interface datosReserva {
    id_reserva: number;
    fecha_turno: string;
    hora_turno: string;
    estado: string;
    id_usuario: number;
    nro_cancha: number;
    cancha: {
      tipo_cancha: {
        descripcion: string;
      };
      calle: string;
      nro_calle: number; 
    };
    usuario: string;
    tipo_cancha_descripcion: string; 
    direccion_cancha: string;
    nro_direccion_cancha: number;
  }

  const [userId, setUserId] = useState<string>('');
  const [reservas, setReservas] = useState<datosReserva[]>([]);
  const [datosCliente, setDatosCliente] = useState<datosCliente | null>(null); 
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleVerReservasClick = async () => {
    try {
      const { status, data } = await axios.get(`http://localhost:3000/api/reservas/cliente/${userId}`);
      if (status === 200) {
        const reservasActualizadas = data.reservas.map((reserva: datosReserva) => ({
          ...reserva,
          tipo_cancha_descripcion: reserva.cancha.tipo_cancha.descripcion,
          direccion_cancha: reserva.cancha.calle,
          nro_direccion_cancha: reserva.cancha.nro_calle,
        }));
  
        setReservas(reservasActualizadas);
        setDatosCliente(data.cliente);
        setMensaje(null);
      } else {
        setReservas([]);
        setDatosCliente(null);
        setMensaje('Cliente no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener las reservas del cliente:', error);
      setReservas([]);
      setDatosCliente(null);
      setMensaje('Ocurrió un error al cargar las reservas');
    }
  };
  

  return (
    <section>
      <div className='container h-screen w-full'>
        <Header />
        <div className='bg-scroll bg-hero2 bg-cover h-full z-20 opacity-[85%] w-full flex-col flex justify-center items-center px-0'>
        <div className='bg-white w-100 rounded-2xl flex flex-col items-center md:hidden gap-y-6 py-6 shadow-lg mx-15'>
            <p className='text-xl font-bold text-2xl text-black my-0'>Reservas del Cliente</p>
            <hr className="w-60 h-0.5 bg-gray-100 border-0 rounded md:my-2 dark:bg-green-700"></hr>
            <div className='flex flex-col items-center'>
            <label className='w-[80%] text-center my-4 bg-white'>
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
            {mensaje && <p>{mensaje}</p>}   {/*Si es mensaje no es null*/}
            {reservas.length > 0 && (
              <>
                <p className='text-xl font-bold text-2xl text-black my-0'>Historial de reservas de {datosCliente.nombre} {datosCliente.apellido} ({userId}) </p>
                <hr className="w-60 h-0.5 bg-gray-100 border-0 rounded md:my-2 dark:bg-green-700"></hr>
                <table className='table-fixed justify-center border-separate border-spacing-x-0.5 border-spacing-y-1.5 mx-1.5'>
                <thead className='tracking-wider'>
                  <tr>
                    <th className='font-bold text-sm'>Fecha</th>
                    <th className='font-bold text-sm'>Hora</th>
                    <th className='font-bold text-sm'>Tipo de Cancha</th>
                    <th className='font-bold text-sm'>Calle</th>
                    <th className='font-bold text-sm'>Nro</th>
                    <th className='font-bold text-sm'>Estado</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className='text-center space-between-10 text-xs'>
                  {reservas.map((item, index) => (
                    <tr key={item.id_reserva}>
                      <td>{new Date(item.fecha_turno).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</td>
                      <td>{new Date(item.hora_turno).toLocaleTimeString('es-ES', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' })}</td>
                      <td>{item.tipo_cancha_descripcion}</td>
                      <td>{item.direccion_cancha}</td>
                      <td>{item.nro_direccion_cancha}</td>
                      <td>{item.estado}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
              </>
            )}
        </div>
        </div>
      </div>
    </section>
  );
};

export default AdminReservasCliente;





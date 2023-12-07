// AdminReservasHoy.tsx

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const AdminReservasHoy: React.FC = () => {
  const [reservasHoy, setReservasHoy] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservasHoy = async () => {
      try {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const response = await fetch(`/api/reservas/hoy`);
        const data = await response.json();
        setReservasHoy(data);
      } catch (error) {
        console.error('Error al obtener las reservas de hoy:', error);
      }
    };

    fetchReservasHoy();
  }, []);

  return (
    <section>
      <div className='container h-screen w-full'>
      <Header />
        <div className='bg-scroll bg-hero2 bg-cover h-full opacity-[85%] flex-col flex justify-center items-center px-0 w-full z-20'> 
          {reservasHoy.length > 0 ? (
            <div className='bg-white w-100 rounded-2xl flex flex-col items-center md:hidden gap-y-6 py-6 shadow-lg mx-15'>
            <p className='text-xl font-bold text-2xl text-black my-0'>Reservas para Hoy</p>
            <hr className="w-60 h-0.5 bg-gray-100 border-0 rounded md:my-2 dark:bg-green-700"></hr>
            <div className='w-full flex-col items-end'>
              {reservasHoy.map((reserva) => (
                <div key={reserva.id_reserva} className='w-[90%] bg-white my-2 mx-auto h-auto rounded-lg p-2 shadow-lg'>
                  <div className='font-bold'>
                    <header className='flex flex-col justify-center items-center text-xl'>
                      <h1>Cancha: {reserva.id_cancha}</h1> {/* Raro, podria no ir */}
                      <p className='h-[2px] bg-green-400 w-[90%] mt-1 rounded'></p> {/* Raro, podria no ir */}
                    </header>
                    <div className='flex-row flex mt-1'>
                      <p className='px-1'>Fecha: {reserva.fecha_turno}</p>
                      <p className='px-1'>Hora Inicio: {reserva.hora_turno}</p>
                    </div>
                    {/* Otros detalles de la reserva */}
                  </div>
                </div>
              ))}
            </div>
            </div>
          
          ) : (
            <div className='bg-white w-100 rounded-2xl flex flex-col items-center md:hidden gap-y-6 py-6 shadow-lg mx-15'>
            <p className='text-xl font-bold text-2xl text-black my-0'>Reservas para Hoy</p>
            <hr className="w-60 h-0.5 bg-gray-100 border-0 rounded md:my-2 dark:bg-green-700"></hr>
              <p className='text-black'>No hay reservas programadas para hoy</p>
              </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminReservasHoy;
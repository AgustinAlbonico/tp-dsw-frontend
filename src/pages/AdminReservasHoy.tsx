// AdminReservasHoy.tsx

import React, { useState, useEffect } from 'react'

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
    <div>
      <h1>Reservas para Hoy</h1>
      {reservasHoy.length > 0 ? (
        <div>
          {reservasHoy.map((reserva) => (
            <div key={reserva.id_reserva}>
              {/* Mostrar detalles de cada reserva */}
              <p>Fecha: {reserva.fecha_turno}</p>
              <p>Hora Inicio: {reserva.hora_turno}</p>
              {/* Otros detalles de la reserva */}
            </div>
          ))}
        </div>
      ) : (
        <p>No hay reservas programadas para hoy.</p>
      )}
    </div>
  );
};

export default AdminReservasHoy;

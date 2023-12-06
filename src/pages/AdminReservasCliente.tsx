// AdminReservasCliente.tsx

import React, { useState } from 'react'

const AdminReservasCliente: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [reservas, setReservas] = useState<any[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };


  //Para que el Administrador busque el id del cliente y luego mostrar sus reservas
  const handleVerReservasClick = async () => {
    try {
      const response = await fetch(`/api/reservas/cliente/${userId}`);
      if (response.ok) {
        const data = await response.json(); //Como trae las reservas?
        setReservas(data);
        setMensaje(null); // Limpiar el mensaje en caso de que haya estado mostrándose
      } else {
        setReservas([]); // Limpiar las reservas
        setMensaje('Cliente no encontrado'); // Establecer el mensaje
      }
    } catch (error) {
      console.error('Error al obtener las reservas del cliente:', error);
    }
  };


  //Para mostrar los datos de la/las reserva en la pantalla
  return (
    <div>
      <h1>Reservas del Cliente</h1>
      <label>
        Ingrese el ID del Cliente:
        <input type="text" value={userId} onChange={handleUserIdChange} />
      </label>
      <button onClick={handleVerReservasClick}>Ver Reservas</button>

      {mensaje && <p>{mensaje}</p>}

      {reservas.length > 0 && (
        <div>
          {reservas.map((reserva) => (
            <div key={reserva.id_reserva}>
              {/* Mostrar detalles de cada reserva */}
              <p>Fecha: {reserva.fecha_turno}</p>
              <p>Hora Inicio: {reserva.hora_turno}</p>
              {/* Otros detalles de la reserva */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReservasCliente;


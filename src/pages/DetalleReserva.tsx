import { useEffect, useState } from 'react';
import axios from 'axios';

const Detalles = (): JSX.Element => {
  interface datosReserva {
    nro_reserva: number;
    fecha_turno: string;
    hora_turno: string;
    estado: string;
    id_usuario: number;
    nro_cancha: number;
    cancha: string;
    usuario: string;
  }

  const [reserva, setReserva] = useState<datosReserva[]>([]);

  const getReserva = async () => {
    setReserva((await axios.get(`http://localhost:3000/api/reserva`)).data);
    console.log((await axios.get(`http://localhost:3000/api/reserva`)).data);
  };

  useEffect(() => {
    getReserva();
  }, []);

  return (
    <section>
      <div className='container h-screen w-full'>
        <h1>ESKEREEE</h1>
      </div>
    </section>
  );
};
export default Detalles;

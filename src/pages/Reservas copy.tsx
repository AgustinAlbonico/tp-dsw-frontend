import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const Reservas = (): JSX.Element => {
  interface Reserva {
    nro_reserva: number;
    fecha_turno: Date;
    hora_turno: Date;
    fecha_hora_reserva: Date;
    estado: string;
    id_usuario: number;
    nro_cancha: number;
    cancha: Cancha;
  }

  interface Cancha {
    nro_cancha: number;
    descripcion: string;
    costo_por_turno: number;
    calle: string;
    nro_calle: number;
    horario_apertura: Date;
    horario_cierre: Date;
    cod_zona: number;
    cod_tipo: number;
  }

  const [reserva, setReserva] = useState<Reserva[]>([]);

  const getReserva = async () => {
    const reserva: datosReserva[] = (
      await axios.get(`http://localhost:3000/api/reserva`)
    ).data;

    reserva.forEach((e) => {
      console.log({ ...e.cancha });
    });

    //setReserva(();
  };

  const compararFechas = (fecha_turno: any) => {
    const fechaActual = new Date().toLocaleDateString("es-ES", {
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const fechaTurno = new Date(fecha_turno).toLocaleDateString("es-ES", {
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    console.log(fechaTurno);
    console.log(fechaActual);

    if (fechaTurno >= fechaActual) {
      console.log("fechaActual es menor fechaTurno");
      return true;
    } else if (fechaTurno < fechaActual) {
      console.log("fechaActual es mayor fechaTurno");
      return false;
    }
  };

  useEffect(() => {
    getReserva();
  }, []);

  return (
    <section>
      <div className='h-screen w-full'>
        <Header />
        <div className='bg-hero2 h-full bg-cover z-20 opacity-[85%] w-full flex-col flex justify-center items-center px-0'>
          <div className='bg-white w-[90%] min-h-60 h-auto mt-10 rounded-2xl flex flex-col justify-center items-center md:hidden py-6 shadow-lg mx-20 min-w-[320px]'>
            <p className='text-4xl font-bold text-2xl text-black'>
              Mis reservas
            </p>
            <hr className='w-60 h-0.5 bg-green-700 border-0 mt-2 mb-4'></hr>

            <div className='max-w-[90%]'>
              <table className='divide-y-2 divide-gray-200 bg-white text-sm flex flex-col flex-nowrap'>
                <thead className='ltr:text-center rtl:text-center'>
                  <tr>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                      Fecha
                    </th>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                      Date of Birth
                    </th>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                      Role
                    </th>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                      Salary
                    </th>
                    <th className='px-4 py-2'></th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200'>
                  <tr>
                    <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                      John Doe
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                      24/05/1995
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                      Web Developer
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                      $120,000
                    </td>
                    <td className='whitespace-nowrap px-4 py-2'>
                      <a
                        href='#'
                        className='inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'
                      >
                        View
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                      Jane Doe
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                      04/11/1980
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                      Web Designer
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                      $100,000
                    </td>
                    <td className='whitespace-nowrap px-4 py-2'>
                      <a
                        href='#'
                        className='inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'
                      >
                        View
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                      Gary Barlow
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                      24/05/1995
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                      Singer
                    </td>
                    <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                      $20,000
                    </td>
                    <td className='whitespace-nowrap px-4 py-2'>
                      <a
                        href='#'
                        className='inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'
                      >
                        View
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Reservas;

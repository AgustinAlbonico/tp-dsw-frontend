import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'

const Reservas = (): JSX.Element => {
     
    interface datosReserva {
        nro_reserva: number
        fecha_turno: string 
        hora_turno: string
        estado: string    
        id_usuario: number           
        nro_cancha: number        
        cancha:  string    
        usuario: string 
      }

    const [reserva, setReserva] = useState<datosReserva[]>([])
   
    const getReserva = async () => {   
        setReserva(
        (await axios.get(`http://localhost:3000/api/reserva`)).data
        )
        console.log((await axios.get(`http://localhost:3000/api/reserva`)).data)
    }
    


    const compararFechas = (fecha_turno: any) => {    
        const fechaActual = new Date().toLocaleDateString('es-ES', { timeZone: 'UTC' , day: '2-digit', month: '2-digit', year: 'numeric'})
        const fechaTurno = new Date(fecha_turno).toLocaleDateString('es-ES', { timeZone: 'UTC' , day: '2-digit', month: '2-digit', year: 'numeric'})
        console.log(fechaTurno)
        console.log(fechaActual)

        if (fechaTurno >= fechaActual) {
            console.log( "fechaActual es menor fechaTurno" )
            return true
        } else if (fechaTurno < fechaActual) {
            console.log( "fechaActual es mayor fechaTurno" )
            return false
    }
    }

    useEffect(() => {
        getReserva()
    }, [])

    return (
        <section>
        <div className='container h-screen w-full'>
        <Header />
        <div className='bg-hero2 h-full bg-cover z-20 opacity-[85%] w-full flex-col flex justify-center items-center px-0'>
          <div className='bg-white w-100 min-h-60 h-auto mt-10 rounded-2xl flex flex-col items-center md:hidden gap-y-6 py-6 shadow-lg mx-20'>
            <p className='text-xl font-bold text-2xl text-black my-0'>Mis reservas</p>
            <hr className="w-60 h-0.5 bg-gray-100 border-0 rounded md:my-2 dark:bg-green-700"></hr>
            <table className='table-fixed justify-center border-separate border-spacing-x-0.5 border-spacing-y-1.5 mx-1.5'>
                <thead className='tracking-wider '>
                    <tr >
                        <th className='font-bold text-sm'>Fecha </th>
                        <th className='font-bold text-sm'>Hora</th>
                        <th className='font-bold text-sm'>Direccion</th>
                        <th className='font-bold text-sm'>Estado</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                    <tbody className='text-center space-between-10 text-xs'>  
                         
                        {reserva?.map((item, index) => (                        
                        <> <tr>
                        <td > {new Date(item.fecha_turno).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</td>
                        <td>{new Date(item.hora_turno).toLocaleTimeString('es-ES', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' })}</td>
                        <td>direccion</td>
                        <td>{ item.estado}</td>
                        {item.estado === 'reservado' /*&& compararFechas(item.fecha_turno)*/ ? <td><button className="w-5 h-4 pb-1 bg-red-400 rounded-md flex justify-center text-center items-center text-white">x</button></td> : <td><button className="w-5 h-4 pb-1 bg-red-200 rounded-md flex justify-center text-center items-center text-white" disabled>x</button></td>}
                        <td><a href="detalles" className="justify-center text-center items-center text-blue-600">ver</a></td> 
                        </tr></>
                        ))} 
                    </tbody>    
            </table> 
                </div>
          </div>
          </div>      
 </section>


            
       
    )
    
}
export default Reservas
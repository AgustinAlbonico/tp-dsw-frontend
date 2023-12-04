import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'

const Detalles = (): JSX.Element => {
     
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
    

    useEffect(() => {
        getReserva()
    }, [])

    return (
        <section>
            <div className='container h-screen w-full'>
            <Header />
            <div className='bg-hero2 h-full bg-cover z-20 opacity-[85%] w-full flex-col flex justify-center px-0'>
                 <div className='bg-white min-w-full rounded-2xl flex flex-col shadow-lg '>
                        <p className='text-3xl font-bold text-black py-3 mx-2 font-mono'>Detalles de la reserva</p>
                        <hr className="w-100 h-0.5 mx-2 bg-gray-100 border-0 rounded md:my-10 dark:bg-green-700"></hr>
                        <p className='text-l font-bold text-black mx-2 mt-2'>Fecha: <span className="font-semibold"> ejemplo </span></p>
                        <p className='text-l font-bold text-black mx-2'>Hora: <span className="font-semibold"> ejemplo </span></p>
                        <p className='text-l font-bold text-black mx-2'>Estado: <span className="font-semibold"> ejemplo </span></p>
                        <p className='text-l font-bold text-black mx-2'>Direccion: <span className="font-semibold"> ejemplo </span></p>
                        <p className='text-l font-bold text-black mx-2'>Tipo de cancha: <span className="font-semibold"> ejemplo </span></p>
                        <p className='text-l font-bold text-black mx-2'>Cancha: <span className="font-semibold"> ejemplo </span></p>
                        <p className='text-l font-bold ml-40 py-3 text-black'>Precio: <span className="font-semibold">$ ejemplo </span></p>
                    
                    </div>
                    
                </div>
            </div>      
        </section>


            
       
    )
    
}
export default Detalles
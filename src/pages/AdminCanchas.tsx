import React,{ useState }  from 'react'
import Header from '../components/Header'
import ModalInsert from '../components/ModalInsert'
import ModalUpdate from '../components/ModalUpdate'
import { MdOutlinePlace } from 'react-icons/md'
import { IoMdInformationCircleOutline } from "react-icons/io"
import { IoPricetagOutline } from "react-icons/io5"

const AdminCanchas = () => {

  const data = [
    { nro_cancha: 1, descripcion: 'Cancha techada', costo: '1500', zona:'Centro', calle:'Zeballos', nro_calle:'1522' , horario_apertura:'15:00' , horario_cierre:'23:00', tipo:'Futbol 5'},
    { nro_cancha: 2, descripcion: 'Cancha libre', costo: '1800', zona:'Norte', calle:'9 de julio', nro_calle:'1571'  , horario_apertura:'08:00' , horario_cierre:'22:00', tipo:'Futbol 7'},
    { nro_cancha: 3, descripcion: 'Cancha sintetico', costo: '1300', zona:'Sur', calle:'Paraguay', nro_calle:'1100'  , horario_apertura:'11:00' , horario_cierre:'00:00', tipo:'Futbol 5'},
    { nro_cancha: 4, descripcion: 'Cancha Tenis', costo: '1000', zona:'Sur', calle:'Maipu', nro_calle:'2310'  , horario_apertura:'10:00' , horario_cierre:'23:00', tipo:'Tenis'},
    { nro_cancha: 5, descripcion: 'Cancha futbol 5', costo: '1500', zona:'Centro', calle:'Chacabuco', nro_calle:'1200'  , horario_apertura:'10:00' , horario_cierre:'23:00', tipo:'Futbol 9'},
    { nro_cancha: 6, descripcion: 'Cancha futbol 7', costo: '1700', zona:'Centro', calle:'3 de Febrero', nro_calle:'1130'  , horario_apertura:'13:00' , horario_cierre:'00:00', tipo:'Futbol 7'}
  ];

  const [showModalin, setShowModalin] = useState(false);
  const [showModalUpt, setShowModalUpt] = useState(false);
  const [canchas, setCanchas] = useState(data);
  const [editData, setEditData] = useState(null);

  // insertar datos
  const addCancha = (cancha) => {
      setCanchas([
        ...canchas,
        cancha
      ]);
  }

  // editar datos
  const editCancha = (cancha) => {
    const newCanchas = canchas.map(el => el.nro_cancha === cancha.nro_cancha ? cancha : el)
    setCanchas(newCanchas)
    setEditData(null)
  }

  // eliminar datos
  const deleteCancha = nro_cancha => {
    const isDelete = window.confirm(`¿Estás seguro de eliminar la cancha ${nro_cancha}?`)
    if (isDelete){
      const newCanchas = canchas.filter(el => el.nro_cancha !== nro_cancha)
      setCanchas(newCanchas);
    }
  }

  // abre el modal de actualizar y guarda la data del equipo a actualizar
  const modalupt = (i) => {
    setShowModalUpt(true);
    setEditData(i)
  }
 

  return (
  <section>
    <div className='container h-screen w-full'>
    <Header />
      <div className='bg-scroll bg-hero2 bg-cover opacity-[85%] flex-col flex justify-center items-center px-0 w-full z-20'>
        <div className='relative'></div>
        <div className='flex-col flex justify-center items-center w-full z-20 mt-[99px]'>
        <button className='bg-green-600 text-white rounded-md w-40 h-10 flex justify-center items-center' onClick={() => setShowModalin(true)}>Agregar cancha</button>
        {showModalin && <ModalInsert addCancha={addCancha} setShowModal={setShowModalin}/>}
        <div className='w-[100%] h-[70%] flex-col items-end '>    
        {canchas.map((item) =>(
          <div key={item.nro_cancha} className='w-[90%] bg-white my-2 mx-auto h-auto rounded-lg p-2 shadow-lg'>
            <div className='font-bold'>
              <header className='flex flex-col justify-center items-center text-xl'><h1>Cancha: {item.nro_cancha}</h1><p className='h-[2px] bg-green-400 w-[90%] mt-1 rounded'></p></header>
              <div className='flex-row flex mt-1'>
              <IoMdInformationCircleOutline size='24'/>
              <p className='px-1'>Descripcion: {item.descripcion}</p>
              </div>          
              <div className='flex-row flex'>
                <p className='px-7'>Tipo de cancha: {item.tipo}</p>
              </div>
              <div className='flex-row flex mt-1'>
              <MdOutlinePlace size='24' />             
              <p className='px-1'>Zona: {item.zona}</p>
              </div>              
              <div className='flex-row flex'>             
              <p className='px-7'>Direccion: {item.calle}   {item.nro_calle}</p>
              </div> 
              <div className='flex-row flex mt-1'>
              <IoPricetagOutline size='22'/>
              <p className='px-1'>Costo por turno: ${item.costo}</p>
              </div>
            </div>
            <p className='h-[2px] dark:bg-gray-300 rounded w-[90%] mt-1 roundedmb-1 ml-4'></p>  
            <div className='flex justify-end mt-2'>
              <button className='w-10 h-9 bg-blue-600 text-white rounded-md flex justify-center items-center mr-2' onClick={() => modalupt(item)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>         
              </button>
              {showModalUpt && <ModalUpdate editData={editData} editCancha={editCancha} setShowModal={setShowModalUpt} />}
              <button className='w-10 h-9 bg-red-600 text-white rounded-md flex justify-center items-center' onClick={() => deleteCancha(item.nro_cancha)}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default AdminCanchas
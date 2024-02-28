import React, { useState } from 'react'
import { useEffect } from 'react'
  
function ModalUpdate({ editData , editCancha , setShowModal , zonas , tiposCancha}) {

  const horarios = [{hora: '07:00'},{hora: '08:00'},{hora: '09:00'},{hora: '10:00'},{hora: '11:00'},{hora: '12:00'},{hora: '13:00'},{hora: '14:00'},
  {hora: '20:00'},{hora: '21:00'},{hora: '22:00'},{hora: '23:00'}];

  
  const [formErrores , setFormErrores] = useState({});

  const [formData, setFormData] = useState({
    nro_cancha: null,
    descripcion: '',
    cod_zona: '',
    costo_por_turno: '',
    calle: '',
    nro_calle:'',
    horario_apertura:'',
    horario_cierre:'',
    cod_tipo: ''
  })

  // verifica si llegan datos de la cancha a editar y los guarda en los datos del Form
  useEffect(()=> {
    if (editData !== null ){
      setFormData(editData)
    } else {
      setFormData({
      nro_cancha: null,
      descripcion: '',
      cod_zona: '',
      costo_por_turno: '',
      calle: '',
      nro_calle:'',
      horario_apertura:'',
      horario_cierre:'',
      cod_tipo: ''
    })
    }
  }, [editData])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  // valida los campos
  const validateValues = (inputValues) => {
    let errors = {};
    let isError = false;
    let regex = /^(.|\s)*[a-zA-Z]+(.|\s)*$/;
    let regexnum = /^[0-9]*$/;
    
    if (!inputValues.descripcion.trim()) {
      errors.descripcion = "Debe completar este campo!"
      isError = true
    } else if (!regex.test(inputValues.descripcion)){
        errors.descripcion = "Solo puede ingresar letras y espacios."
        isError = true
      }

    if (!inputValues.calle.trim()) {
      errors.calle = "Debe completar este campo!"
      isError = true
    } else if (!regex.test(inputValues.calle)){
      errors.calle = "Solo puede ingresar letras y espacios."
      isError = true
    }

    if (inputValues.nro_calle === '') {
      errors.nro_calle = "Debe completar este campo!"
      isError = true
    } else if (!regexnum.test(inputValues.nro_calle)){
      errors.nro_calle = "Solo puede ingresar numeros."
      isError = true
    }

    if (inputValues.costo_por_turno === '') {
      errors.costo_por_turno = "Debe completar este campo!"
      isError = true
    } else if (!regexnum.test(inputValues.costo_por_turno)){
      errors.costo_por_turno = "Solo puede ingresar numeros."
      isError = true
    }

    if (inputValues.cod_zona === ''){
      errors.cod_zona = "Debe seleccionar una zona!"
      isError = true
    }

    if (inputValues.cod_tipo === ''){
      errors.cod_tipo = "Debe seleccionar un tipo!"
      isError = true
    }

    if (inputValues.horario_apertura === ''){
      errors.horario_apertura = "Debe seleccionar un horario!"
      isError = true
    }

    if (inputValues.horario_cierre === ''){
      errors.horario_cierre = "Debe seleccionar un horario!"
      isError = true
    } else if (inputValues.horario_apertura >= inputValues.horario_cierre){
      errors.horario_cierre = "El horario de apertura no puede ser mas tarde que el de cierre."
      isError = true
    }
    return isError ? errors : null; 
  }
  // guarda los cambios 
  const onSubmit = (e) => {
    e.preventDefault();
    const err = validateValues(formData);
    if (err === null){
    editCancha(formData);
    setShowModal(false);
    console.log(formData);
    } else {
    setFormErrores(err)
    }
  }

  return (
      <section>      
          <div
          className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-[1%] overscroll-contain"
          data-te-backdrop="static"
          data-te-keyboard="false">
            <div className="relative w-[90%] h-[80%] my-6 mx-auto max-w-3xl ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-center p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Actualizar cancha</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full" onSubmit={onSubmit}>
                    <label className="block text-black text-sm font-bold mb-1" >
                      Descripcion
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" name='descripcion' onChange={handleChange} value={formData.descripcion}/>
                    {formErrores.descripcion ? ( <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{formErrores.descripcion}</div> ) : null}
                    <label className="block text-black text-sm font-bold mb-1" >
                      Tipo de cancha
                    </label>
                    <select className="shadow border rounded w-full py-2 px-1 text-black bg-white" name='cod_tipo' onChange={handleChange} value={formData.cod_tipo}>
                      <option value=''>Selecciona un tipo</option>
                      {tiposCancha.map((ct, index)=> (
                        <option key={index} value={ct.cod_tipo}>
                          {ct.descripcion}
                        </option>
                      ))}
                    </select>
                    {formErrores.cod_tipo ? ( <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{formErrores.cod_tipo}</div> ) : null}
                    <label className="block text-black text-sm font-bold mb-1" >
                      Zona
                    </label>
                    <select className="shadow border rounded w-full py-2 px-1 text-black bg-white" name='cod_zona' onChange={handleChange} value={formData.cod_zona}>
                      <option value=''>Selecciona una zona</option>
                      {zonas.map((dz, index)=> (
                        <option key={index} value={dz.cod_zona}>
                          {dz.descripcion}
                        </option>
                      ))}
                    </select>
                    {formErrores.cod_zona ? ( <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{formErrores.cod_zona}</div> ) : null}
                    <label className="block text-black text-sm font-bold mb-1">
                      Calle
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" name='calle' onChange={handleChange} value={formData.calle}/>
                    {formErrores.calle ? ( <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{formErrores.calle}</div> ) : null}
                    <label className="block text-black text-sm font-bold mb-1">
                      Numero de calle
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black [&::-webkit-inner-spin-button]:appearance-none" name='nro_calle' onChange={handleChange} value={formData.nro_calle} />
                    {formErrores.nro_calle ? ( <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{formErrores.nro_calle}</div> ) : null}
                    <label className="block text-black text-sm font-bold mb-1" >
                      Costo
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black [&::-webkit-inner-spin-button]:appearance-none" name='costo_por_turno' onChange={handleChange} value={formData.costo_por_turno} />
                    {formErrores.costo_por_turno ? ( <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{formErrores.costo_por_turno}</div> ) : null}
                    <label className="block text-black text-sm font-bold mb-1" >
                      Horario de apertura
                    </label>
                    <select className="shadow border rounded w-full py-2 px-1 text-black bg-white" name='horario_apertura' onChange={handleChange} value={formData.horario_apertura}>
                      <option value=''>Selecciona un horario</option>
                      {horarios.map((hs, index)=> (
                        <option key={index} value={hs.hora}>
                          {hs.hora}
                        </option>
                      ))}
                    </select>
                    {formErrores.horario_apertura ? ( <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{formErrores.horario_apertura}</div> ) : null}                    
                    <label className="block text-black text-sm font-bold mb-1" >
                      Horario de cierre
                    </label>
                    <select className="shadow border rounded w-full py-2 px-1 text-black bg-white" name='horario_cierre' onChange={handleChange} value={formData.horario_cierre}>
                      <option value=''>Selecciona un horario</option>
                      {horarios.map((hs, index)=> (
                        <option key={index} value={hs.hora}>
                          {hs.hora}
                        </option>
                      ))}
                    </select>
                    {formErrores.horario_cierre ? ( <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{formErrores.horario_cierre}</div> ) : null}
                    <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                    className="text-white bg-red-600 font-bold uppercase px-6 py-2 text-sm rounded shadow mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    Cerrar
                    </button>
                    <button
                    className="text-white bg-green-600 font-bold uppercase text-sm px-6 py-2 rounded shadow mr-1 mb-1"
                    type='submit'
                    >
                    Confirmar
                    </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
      
    </section>
  )
}

export default ModalUpdate
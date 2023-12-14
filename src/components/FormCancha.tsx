import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePlace } from 'react-icons/md';
import { PiSoccerBallDuotone } from 'react-icons/pi';
import { AiTwotoneCalendar } from 'react-icons/ai';
import Button from './Button';
import Select from 'react-select';

import 'react-datepicker/dist/react-datepicker.css';

const backend_url: string = import.meta.env.VITE_BACKEND_URL;

type datosCancha = {
  cod_zona: number;
  cod_tipo: number;
  fecha: string;
};

interface datosZona {
  cod_zona: number;
  descripcion: string;
}

interface datosTipoCancha {
  cod_tipo: number;
  descripcion: string;
}

const FormCancha = (): JSX.Element => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [zonas, setZonas] = useState<datosZona[]>([]);
  const [tiposCanchas, setTipoCanchas] = useState<datosTipoCancha[]>([]);

  const [selectedZona, setSelectedZona] = useState<datosZona | null>(null);
  const [selectedTipoCancha, setSelectedTipoCancha] =
    useState<datosTipoCancha | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>();

  const [cancha, setCancha] = useState<datosCancha | null>(null);

  useEffect(() => {
    //Cargo datos de las zonas
    fetch(`${backend_url}/zona`)
      .then((res) => res.json())
      .then((data) => {
        setZonas(data);
      });
    //Cargo datos de los tipos de cancha
    fetch(`${backend_url}/tipo_cancha`)
      .then((res) => res.json())
      .then((data) => {
        setTipoCanchas(data);
      });
  }, []);

  const handleZona = (option: datosZona | null) => setSelectedZona(option);
  const handleTipo = (option: datosTipoCancha | null) =>
    setSelectedTipoCancha(option);
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setLoading(true);
    if (selectedZona && selectedTipoCancha && selectedDate) {
      return navigate(
        `/canchas?zona=${selectedZona?.cod_zona}&tipo-cancha=${selectedTipoCancha?.cod_tipo}&fecha=${selectedDate}?&page=1`
      );
    }
    setLoading(false);
  };

  /*const handleSubmit2 = (e: React.FormEvent): void => {
    e.preventDefault()
    setLoading(true)
    if (cancha?.cod_zona && cancha.cod_tipo && cancha.fecha)
      return navigate(
        `/canchas?zona=${cancha.cod_zona}&tipo-cancha=${cancha.cod_tipo}&fecha=${cancha.fecha}`
      )
    setLoading(false)
  }*/

  return (
    <form
      className='bg-white w-full h-80 mt-10 rounded-2xl flex flex-col items-center md:hidden gap-y-6 py-6 shadow-lg'
      onSubmit={handleSubmit}
    >
      <div className='w-[90%] flex flex-col items-center text-lg'>
        <div className='h-10 w-full bg-transparent flex items-center rounded-lg text-black'>
          <div className='px-1'>
            <MdOutlinePlace size='24' />
          </div>
          {/*<input
            className='w-full h-full bg-transparent'
            placeholder='Ingrese la zona...'
            list='zona'
            name='zona'
            onChange={handleChange}
            required
  />*/}
          <Select
            className='w-full h-full bg-transparent'
            options={zonas}
            getOptionLabel={(item) => item.descripcion}
            onChange={handleZona}
            placeholder='Zona...'
          />
          {/*<option>--Zona--</option>
            {zonas.map((item) => (
              <option key={item.cod_zona} data-id={item.cod_zona}>
                {item.descripcion.charAt(0).toLocaleUpperCase() +
                  item.descripcion.slice(1)}
              </option>
                ))}*/}
        </div>
        <p className='h-[2px] bg-green-400 w-[80%] mt-2'></p>
      </div>
      <div className='w-[90%] flex flex-col items-center text-lg'>
        <div className='h-10 w-full bg-transparent flex items-center rounded-lg'>
          <div className='px-1'>
            <PiSoccerBallDuotone size='24' />
          </div>

          {/*<input
            className='w-full h-full bg-transparent'
            placeholder='Tipo de cancha...'
            list='tipos'
            name='tipoCancha'
            onChange={handleChange}
            required
          />
          <datalist id='tipos'>
            {tiposCanchas.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
            </datalist>*/}
          <Select
            className='w-full h-full bg-transparent'
            options={tiposCanchas}
            getOptionLabel={(item) => item.descripcion}
            onChange={handleTipo}
            placeholder='Tipo de cancha...'
          />
        </div>
        <p className='h-[2px] bg-green-400 w-[80%] mt-2'></p>
      </div>
      <div className='w-[90%] flex flex-col items-center text-lg'>
        <div className='h-10 w-full bg-transparent flex items-center rounded-lg'>
          <div className='px-1'>
            <AiTwotoneCalendar size='24' />
          </div>
          <input
            type='date'
            className='w-full h-full bg-transparent'
            placeholder='Ingrese la fecha...'
            name='fecha'
            min={new Date().toJSON().slice(0, 10)}
            onChange={handleDate}
            required
          />
        </div>
        <p className='h-[2px] bg-green-400 w-[80%] mt-2'></p>
      </div>
      <Button text='Buscar' color='bg-green-400' loading={loading} />
    </form>
  );
};

export default FormCancha;

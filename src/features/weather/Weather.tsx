import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getWeather,
  citiesWeatherDelete,
  state
} from './weatherSlice';

const Weather = () => {
  const { cities, citiesWeather } = useAppSelector(state);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("")

  useEffect(() => {
    // console.log('citiesWeather', citiesWeather);
}, [cities, citiesWeather])
  
// useEffect(() => {
//   const getWeatherHandler = async (city: string) => {
//     await dispatch(getWeather(city))
//   }
//   cities.forEach(city => {
//     getWeatherHandler(city)
//   })
// }, [])

  return (
    <div className='flex bg-slate-400 p-4 w-full h-full flex-col'>
      <div className='w-[80%] mx-auto'>
        <Input value={value} setValue={setValue}/>
      </div>
      <div className='flex w-full h-auto justify-center mt-10'>
        {citiesWeather.length > 0 ? citiesWeather.map(city => {
          return (
            <div 
              className='m-2 shadow-md flex flex-col p-4 justify-center bg-white h-[200px]'
              key={city.id}
            >
                <h2 className='text-center font-bold pb-6 cursor-pointer'>{city.name}</h2>
                <p>Country: {city.sys.country}</p>
                <p>Temperature: {Math.round(city.main.temp)}°C</p>
                <p>{city.weather.description}</p>
                <p>Wind speed: {city.wind.speed} km/h</p>
            </div>
          )
        }) : <div></div>}
      </div>
    </div>
  );
}

export default Weather
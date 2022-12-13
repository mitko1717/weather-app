import { useState, useEffect } from "react";
import Input from "../../components/Input";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getWeather,
  citiesWeatherDelete,
  state,
  addCity,
  makeErrorFalse,
} from "./weatherSlice";

const Weather = () => {
  const { cities, citiesWeather, error } = useAppSelector(state);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");
  const [cityAlreadyAdded, setCityAlreadyAdded] = useState(false);

  const addCityToState = (city: string) => {
    dispatch(addCity(city));
  };

  useEffect(() => {
    console.log("citiesWeather", citiesWeather);
    console.log("cities", cities);
  }, [cities, citiesWeather]);

  useEffect(() => {
    setTimeout(() => {
      setCityAlreadyAdded(false);
    }, 1000);
  }, [cityAlreadyAdded]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(makeErrorFalse);
    }, 1000);
  }, [error]);

  useEffect(() => {
    const getWeatherHandler = async (city: string) => {
      await dispatch(getWeather(city));
    };
    cities.forEach((city) => {
      getWeatherHandler(city);
    });
  }, [cities]);

  return (
    <div className="flex bg-slate-400 p-4 w-full h-full flex-col">
      <div className="w-[80%] mx-auto relative">
        <Input
          value={value}
          setValue={setValue}
          cities={cities}
          addCityToState={addCityToState}
          setCityAlreadyAdded={setCityAlreadyAdded}
        />
        {cityAlreadyAdded && (
          <div className="absolute bottom-[-6] text-blue-600">
            THIS CITY IS ALREADY DISPLAYED
          </div>
        )}
        {error && (
          <div className="absolute bottom-[-6] text-blue-600">
            ERROR GETTING WEATHER FOR THIS CITY REQUEST
          </div>
        )}
      </div>
      <div className="flex w-full h-auto justify-center mt-10 flex-wrap">
        {citiesWeather.length > 0 ? (
          citiesWeather.map((city) => {
            if (city) {
              return (
                <div
                  className="m-2 shadow-md flex flex-col p-4 justify-center cursor-pointer bg-white h-[200px] w-[200px] min-w-[200px]"
                  key={city.id}
                >
                  <h2 className="text-center font-bold pb-6 cursor-pointer">
                    {city.name}
                  </h2>
                  <p>Country: {city.sys.country}</p>
                  <p>Temperature: {Math.round(city.main.temp)}°C</p>
                  <p>{city.weather.description}</p>
                  <p>Wind speed: {city.wind.speed} km/h</p>
                </div>
              );
            }
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Weather;

import React from "react";
import { Dispatch, FC, SetStateAction, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Input from "../../components/Input";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getWeather,
  citiesWeatherDelete,
  state,
  addCity,
  makeErrorFalse,
} from "./weatherSlice";
import CityCard from "../../components/CityCard";

type WeatherProps = {
  cityInfo: any;
  setCityInfo: Dispatch<SetStateAction<any>>;
};

const Weather: FC <WeatherProps> = ({ cityInfo, setCityInfo}) => {
  const { cities, citiesWeather, error } = useAppSelector(state);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");
  const [cityAlreadyAdded, setCityAlreadyAdded] = useState(false);

  const addCityToState = (city: string) => {
    dispatch(addCity(city));
  };

  const deleteCity = (id: number) => {
    dispatch(citiesWeatherDelete(id))
  }

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
    <div className="flex bg-slate-400 p-4 h-[100vh] w-full flex-col">
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
                <CityCard key={city.name} city={city} cityInfo={cityInfo} setCityInfo={setCityInfo} deleteCity={deleteCity}/>
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

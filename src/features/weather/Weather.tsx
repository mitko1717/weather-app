import React from "react";
import { Dispatch, FC, SetStateAction, useState, useEffect } from "react";
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
import Errors from "../../components/Errors";

type WeatherProps = {
  cityInfo: any;
  setCityInfo: Dispatch<SetStateAction<any>>;
};

const Weather: FC<WeatherProps> = ({ cityInfo, setCityInfo }) => {
  const { cities, citiesWeather, isError } = useAppSelector(state);

  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");
  const [isCityAlreadyAdded, setCityAlreadyAdded] = useState(false);
  const [isUpdating, setIsUpdating] = useState("");

  const addCityToState = (city: string) => {
    dispatch(addCity(city));
  };

  const deleteCity = (e: any, id: number, name: string) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(citiesWeatherDelete({ id, name }));
  };

  const getWeatherHandler = async (city: string, e: any) => {
    if (typeof e === "object") {
      e.stopPropagation();
      e.preventDefault();
    }

    setIsUpdating(city);
    await dispatch(getWeather(city));
    setIsUpdating("");
  };

  useEffect(() => {
    setTimeout(() => {
      setCityAlreadyAdded(false);
    }, 1000);
  }, [isCityAlreadyAdded]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(makeErrorFalse);
    }, 1000);
  }, [isError, dispatch]);

  useEffect(() => {
    cities.forEach((city: string) => {
      getWeatherHandler(city, _);
    });
  }, [cities, dispatch]);

  return (
    <div className="flex bg-slate-400 p-4 h-[100vh] w-full flex-col">
      <h1 className="text-center text-4xl uppercase">get weather app</h1>
      <div className="w-[40%] mx-auto relative">
        <Input
          value={value}
          setValue={setValue}
          cities={cities}
          addCityToState={addCityToState}
          setCityAlreadyAdded={setCityAlreadyAdded}
        />
        <Errors isCityAlreadyAdded={isCityAlreadyAdded} isError={isError} />
      </div>
      <div className="flex w-full h-auto justify-center mt-10 flex-wrap">
        {citiesWeather.length > 0 ? (
          citiesWeather.map((city: { name: React.Key | null | undefined }) => {
            if (city) {
              return (
                <CityCard
                  key={city.name}
                  city={city}
                  cityInfo={cityInfo}
                  setCityInfo={setCityInfo}
                  deleteCity={deleteCity}
                  getWeatherHandler={getWeatherHandler}
                  isUpdating={isUpdating}
                />
              );
            } else return null;
          })
        ) : (
          <div>NO CITIES DATA</div>
        )}
      </div>
    </div>
  );
};

export default Weather;

function _(_: any, city: string) {
  throw new Error("Function not implemented.");
}

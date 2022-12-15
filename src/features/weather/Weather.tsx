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

type WeatherProps = {
  cityInfo: any;
  setCityInfo: Dispatch<SetStateAction<any>>;
};

const Weather: FC<WeatherProps> = ({ cityInfo, setCityInfo }) => {
  const { cities, citiesWeather, error } = useAppSelector(state);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");
  const [cityAlreadyAdded, setCityAlreadyAdded] = useState(false);
  const [isUpdating, setIsUpdating] = useState("");

  // const storedCities: any = localStorage.getItem("_cities") || cities;

  // useEffect(() => {
  //   localStorage.setItem("_cities", JSON.stringify(cities));
  // }, [cities])

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
  }, [cityAlreadyAdded]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(makeErrorFalse);
    }, 1000);
  }, [error, dispatch]);

  useEffect(() => {
    // console.log(JSON.parse(storedCities));
    // let cities = JSON.parse(storedCities)

    cities.forEach((city: string) => {
      getWeatherHandler(city, _);
    });
  }, [cities, dispatch]);

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

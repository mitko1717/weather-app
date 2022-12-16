import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TempBlock from "../components/TempBlock";
import CircularProgress from "@mui/material/CircularProgress";

type CityCardProps = {
  city: any;
};

const CityInfo: FC<CityCardProps> = ({ city }) => {
  const [weatherDetails, setWeatherDetails] = useState([]);
  
  const getWeatherDetails = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=0075720297132707fab37b1ca824c598&units=metric`
      ).then((data) => data.json());

      let list = res.list;
      let newList = list.slice(-8);

      setWeatherDetails(newList);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getWeatherDetails();
  }, []);

  return (
    <div className="flex bg-slate-400 h-[100vh] w-full flex-col">
      <Link to={`/`}>
        <div className="absolute top-5 right-5">
          <Button variant="contained" size="large">
            GO BACK
          </Button>
        </div>
      </Link>
      {city !== null ? <div
        className="mt-10 drop-shadow-2xl flex flex-col p-8 justify-center bg-white h-[500px] w-[550px] min-w-[550px] relative mx-auto"
        key={city.id}
      >
        <h2 className="text-center font-bold pb-6">{city.name}</h2>
        <p>Country: {city.sys.country}</p>
        <p>Temperature: {Math.round(city.main.temp)}°C</p>
        <img
          style={{ width: "50px" }}
          src={`https://openweathermap.org/img/w/${city.weather[0].icon}.png`}
          alt="icon"
        />
        <p>Description: {city.weather[0].description}</p>
        <p>Wind speed: {city.wind.speed} km/h</p>
        <p>
          Coodrinats: lon: {city.coord.lon}, lat: {city.coord.lat}
        </p>
        {weatherDetails.length > 0 ? (
          <TempBlock weatherDetails={weatherDetails} />
        ) : (
          <div className="flex justify-center items-center mt-10">
            <CircularProgress />
          </div>
        )}
      </div> : <div className="p-16 text-3xl mx-auto">PLEASE GO BACK TO UPDATE CITY WEATHER INFO</div>}
    </div>
  );
};

export default CityInfo;

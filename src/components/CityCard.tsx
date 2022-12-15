import React from "react";
import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

type CityCardProps = {
  city: any;
  cityInfo: any;
  setCityInfo: Dispatch<SetStateAction<any>>;
  deleteCity: any;
  getWeatherHandler: any;
  isUpdating: string;
};

const CityCard: FC<CityCardProps> = ({
  city,
  cityInfo,
  setCityInfo,
  deleteCity,
  getWeatherHandler,
  isUpdating,
}) => {
  return (
    <Link to={`/cityInfo`} state={cityInfo}>
      <div
        className="m-2 shadow-md flex flex-col p-4 justify-center cursor-pointer bg-white h-[220px] w-[220px] min-w-[200px] relative hover:bg-slate-100 transition ease-in-out duration-200"
        key={city.id}
        onClick={() => setCityInfo(city)}
      >
        {isUpdating === city.name && (
          <div className="absolute top-3 left-3">
            <CircularProgress />
          </div>
        )}
        <div
          className="absolute top-2 right-2 text-xs hover:font-bold transition ease-in-out duration-200"
          onClick={(e) => deleteCity(e, city.id, city.name)}
        >
          DELETE
        </div>
        <h2 className="text-center font-bold pb-6">{city.name}</h2>
        <p>Country: {city.sys.country}</p>
        <p>Temperature: {Math.round(city.main.temp)}°C</p>
        <p>Wind speed: {city.wind.speed} km/h</p>

        <div
          className="mt-8 mx-auto"
          onClick={(e) => getWeatherHandler(city.name, e)}
        >
          <Button variant="contained" size="small">
            GET LATEST DATA
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;

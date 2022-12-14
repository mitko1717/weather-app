import React from "react";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";

type CityCardProps = {
    city: any;
    cityInfo: any;
    setCityInfo: Dispatch<SetStateAction<any>>;
    deleteCity: any;
  };

const CityCard: FC<CityCardProps> = ({ city, cityInfo, setCityInfo, deleteCity }) => {
    return (
        <Link to={`/cityInfo`} state={cityInfo}>
            <div
                className="m-2 shadow-md flex flex-col p-4 justify-center cursor-pointer bg-white h-[220px] w-[220px] min-w-[200px] relative"
                key={city.id}
            >
                <div 
                    className="absolute top-2 right-2 text-xs hover:font-bold transition-all ease-in-out duration-200"
                    onClick={() => deleteCity(city.id)}
                >
                    DELETE
                </div>
                <h2 className="text-center font-bold pb-6">
                {city.name}
                </h2>
                <p>Country: {city.sys.country}</p>
                <p>Temperature: {Math.round(city.main.temp)}°C</p>
                <p>{city.weather.description}</p>
                <p>Wind speed: {city.wind.speed} km/h</p>
            </div>
        </Link>
    )
}

export default CityCard
import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

type CityCardProps = {
    city: any;
  };

const CityInfo: FC<CityCardProps> = ({ city }) => {
    return (
        <div className="flex bg-slate-400 h-[100vh] w-full">
                <Link to={`/`}>
                    <Button variant="contained" size="large">
                        GO BACK
                    </Button>
                </Link>
            <div
                className="mt-10 drop-shadow-2xl flex flex-col p-4 justify-center bg-white h-[340px] w-[340px] min-w-[340px] relative mx-auto"
                key={city.id}
            >
                <h2 className="text-center font-bold pb-6">
                {city.name}
                </h2>
                <p>Country: {city.sys.country}</p>
                <p>Temperature: {Math.round(city.main.temp)}°C</p>
                <p>{city.weather.description}</p>
                <p>Wind speed: {city.wind.speed} km/h</p>
            </div>
        </div>
    )
}

export default CityInfo
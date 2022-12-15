import { FC } from "react";

type WeatherProps = {
  isCityAlreadyAdded: boolean;
  isError: boolean;
};

const Errors: FC<WeatherProps> = ({ isCityAlreadyAdded, isError }) => {
  return (
    <>
      {isCityAlreadyAdded && (
        <div className="absolute bottom-[-6] text-blue-600">
          THIS CITY IS ALREADY DISPLAYED
        </div>
      )}
      {isError && (
        <div className="absolute bottom-[-6] text-blue-600">
          ERROR GETTING WEATHER FOR THIS CITY REQUEST
        </div>
      )}
    </>
  );
};

export default Errors;

import { FC } from "react";

type TempBlockProps = {
  weatherDetails: any[];
};

const TempBlock: FC<TempBlockProps> = ({ weatherDetails }) => {
  console.log("weatherDetails", weatherDetails);

  return (
    <div className="flex flex-wrap mx-auto mt-6 h-[100px]">
      {Array.isArray(weatherDetails) && weatherDetails.length > 0 ? (
        weatherDetails.map((item, index) => {
          let degree = Math.round(item.main.temp);

          return (
            <div
              key={item.dt}
              style={{ marginBottom: `${degree}px` }}
              className={`flex w-[45px] ${
                index % 2 === 0 ? "bg-neutral-200" : "bg-slate-400"
              } mx-1 text-sm items-center justify-center`}
            >
              {degree}°C
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default TempBlock;

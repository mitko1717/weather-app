import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

type InputProps = {
  value: string;
  setValue: Dispatch<SetStateAction<any>>;
  cities: string[];
  addCityToState: any;
  setCityAlreadyAdded: Dispatch<SetStateAction<any>>;
};

const Input: FC<InputProps> = ({
  value,
  setValue,
  cities,
  addCityToState,
  setCityAlreadyAdded,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    if (!cities.find((city) => city === value)) {
      addCityToState(value);
      setValue("");
    } else setCityAlreadyAdded(true);
  };

  return (
    <form className="flex" onSubmit={onSubmitHandler}>
      <TextField
        value={value}
        onChange={handleChange}
        fullWidth={true}
        id="standard-basic"
        label="city search"
        variant="standard"
      />
      <span className="flex items-end	ml-2 mb-[2px]">
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={onSubmitHandler}
        >
          search
        </Button>
      </span>
    </form>
  );
};

export default Input;

import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { TextField } from "@mui/material";
import { Button } from '@mui/material';

type InputProps = {
    value: string;
    setValue: Dispatch<SetStateAction<any>>;
  };

const Input: FC<InputProps> = ({ value, setValue }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValue(e.target.value);
    };

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
    };

    return (
        <form className="flex" onSubmit={onSubmitHandler}>
            <TextField value={value} onChange={handleChange} fullWidth={true} id="standard-basic" label="city search" variant="standard"/>
            <Button size="small" color="primary" variant="contained">
                search
            </Button>
        </form>

    )
}

export default Input
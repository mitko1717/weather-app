import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CounterState {
  cities: string[];
  apiID: string;
  citiesWeather: any[];
  loading: boolean;
  error: boolean;
  requestStatus: number | null;
}

const initialState: CounterState = {
  cities: ["london", "kyiv", "kremenchuk", "odesa"],
  apiID: `0075720297132707fab37b1ca824c598`,
  citiesWeather: [],
  loading: false,
  error: false,
  requestStatus: null,
};

export const getWeather = createAsyncThunk("weather", async (city: string) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${initialState.apiID}&units=metric`
    ).then((data) => data.json());

    return res;
  } catch (e) {
    console.error(e);
  }
});

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addCity: (state, action) => {
        state.cities.push(action.payload);
        console.log(current(state.cities));
    },
    citiesWeatherDelete: (state, action) => {
      console.log('action.payload', action.payload);
      
      console.log(current(state.citiesWeather));
      state.citiesWeather.filter((city) => city.id !== action.payload);
      console.log(current(state.citiesWeather));
    },
    makeErrorFalse: (state) => {
      state.error = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getWeather.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        if (action.payload.cod && action.payload.cod === 200) {
          if (!state.citiesWeather.find((city: { id: number }) => city.id === +action.payload.id)) {
            state.citiesWeather.push(action.payload);
          }

          state.error = false;
        } else if (action.payload.cod && action.payload.cod === 404) {

          state.error = true;
          state.cities = state.cities.slice(0, -1)
          console.log(state.cities);
        }
      }
    );
  },
});

export const { citiesWeatherDelete, addCity, makeErrorFalse } = weatherSlice.actions;

export const state = (state: RootState) => state.weather;

export default weatherSlice.reducer;

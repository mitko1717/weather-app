import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CounterState {
  cities: string[];
  apiID: string;
  citiesWeather: any[];
  error: boolean;
  requestStatus: number | null;
}

const cities = typeof window !== "undefined" && localStorage.getItem("cities") ? 
 JSON.parse(localStorage.getItem("cities") || '') : [] 

const initialState: CounterState = {
  cities: cities || ["london", "kyiv", "kremenchuk", "odesa"],
  apiID: `0075720297132707fab37b1ca824c598`,
  citiesWeather: [],
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
      localStorage.setItem('cities', JSON.stringify(state.cities));
    },
    citiesWeatherDelete: (state, action) => {
      state.citiesWeather = state.citiesWeather.filter(
        (city) => city.id !== action.payload.id
      );
      state.cities = state.cities.filter(
        (city) => city !== action.payload.name.toLowerCase()
      );
      localStorage.setItem('cities', JSON.stringify(state.cities));
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
          if (
            !state.citiesWeather.find(
              (city: { id: number }) => city.id === +action.payload.id
            )
          ) {
            state.citiesWeather.push(action.payload);
          }

          state.error = false;
        } else if (action.payload.cod && action.payload.cod === 404) {
          state.error = true;
          state.cities = state.cities.slice(0, -1);
        }
      }
    );
  },
});

export const { citiesWeatherDelete, addCity, makeErrorFalse } =
  weatherSlice.actions;

export const state = (state: RootState) => state.weather;

export default weatherSlice.reducer;

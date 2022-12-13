import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      console.log("state.requestStatus", state.requestStatus);

      if (state.requestStatus === 200) {
        state.cities.push(action.payload);
      }
    },
    citiesWeatherDelete: (state, action) => {
      state.citiesWeather.filter((city) => city.id !== action.payload.id);
    },
    makeErrorFalse: (state) => {
      state.error = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getWeather.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.requestStatus = action.payload.cod;

        if (action.payload.cod === 200) {
          if (
            !state.citiesWeather.find(
              (city: { id: any }) => city.id === action.payload.id
            )
          ) {
            state.citiesWeather.push(action.payload);
            state.cities.push(action.payload.name.toLocaleString());
          }
          state.error = false;
        } else if (action.payload.cod === 404) {
          state.error = true;
        }
      }
    );
  },
});

export const { citiesWeatherDelete, addCity, makeErrorFalse } =
  weatherSlice.actions;

export const state = (state: RootState) => state.weather;

export default weatherSlice.reducer;

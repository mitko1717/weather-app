import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CounterState {
  cities: string[];
  apiID: string,
  citiesWeather: any[],
  loading: boolean,
}

const initialState: CounterState = {
  cities: ["london", "kyiv", "kremenchuk", "odesa"],
  apiID: `0075720297132707fab37b1ca824c598`,
  citiesWeather: [
    {
        "coord": {
            "lon": -0.1257,
            "lat": 51.5085
        },
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 0.41,
            "feels_like": -4.19,
            "temp_min": -1.51,
            "temp_max": 1.84,
            "pressure": 1007,
            "humidity": 86
        },
        "visibility": 10000,
        "wind": {
            "speed": 4.63,
            "deg": 100
        },
        "clouds": {
            "all": 100
        },
        "dt": 1670931157,
        "sys": {
            "type": 2,
            "id": 2075535,
            "country": "GB",
            "sunrise": 1670918277,
            "sunset": 1670946688
        },
        "timezone": 0,
        "id": 2643743,
        "name": "London",
        "cod": 200
    },
    {
        "coord": {
            "lon": 30.5167,
            "lat": 50.4333
        },
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 0.4,
            "feels_like": -2.93,
            "temp_min": -0.77,
            "temp_max": 0.4,
            "pressure": 1008,
            "humidity": 89
        },
        "visibility": 10000,
        "wind": {
            "speed": 2.9,
            "deg": 288,
            "gust": 5.08
        },
        "clouds": {
            "all": 100
        },
        "dt": 1670931048,
        "sys": {
            "type": 2,
            "id": 2003742,
            "country": "UA",
            "sunrise": 1670910606,
            "sunset": 1670939646
        },
        "timezone": 7200,
        "id": 703448,
        "name": "Kyiv",
        "cod": 200
    },
    {
        "coord": {
            "lon": 30.7326,
            "lat": 46.4775
        },
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 3.37,
            "feels_like": -1.85,
            "temp_min": 3.37,
            "temp_max": 3.37,
            "pressure": 1010,
            "humidity": 63,
            "sea_level": 1010,
            "grnd_level": 1003
        },
        "visibility": 10000,
        "wind": {
            "speed": 7.74,
            "deg": 308,
            "gust": 9.03
        },
        "clouds": {
            "all": 100
        },
        "dt": 1670931146,
        "sys": {
            "country": "UA",
            "sunrise": 1670909542,
            "sunset": 1670940607
        },
        "timezone": 7200,
        "id": 698740,
        "name": "Odesa",
        "cod": 200
    },
    {
        "coord": {
            "lon": 33.4197,
            "lat": 49.0973
        },
        "weather": [
            {
                "id": 601,
                "main": "Snow",
                "description": "snow",
                "icon": "13d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 0.24,
            "feels_like": -4.37,
            "temp_min": 0.24,
            "temp_max": 0.24,
            "pressure": 1007,
            "humidity": 98,
            "sea_level": 1007,
            "grnd_level": 996
        },
        "visibility": 114,
        "wind": {
            "speed": 4.58,
            "deg": 347,
            "gust": 7.18
        },
        "snow": {
            "1h": 1.55
        },
        "clouds": {
            "all": 100
        },
        "dt": 1670931334,
        "sys": {
            "country": "UA",
            "sunrise": 1670909545,
            "sunset": 1670939314
        },
        "timezone": 7200,
        "id": 704147,
        "name": "Kremenchuk",
        "cod": 200
    }
],
  loading: false,
};

export const getWeather = createAsyncThunk("weather", async (city: string) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${initialState.apiID}&units=metric`).then(
    (data) => data.json()
    )

  return res;
});

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    citiesWeatherDelete: (state, action) => {
      state.citiesWeather.filter(city => city.id !== action.payload.id)
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getWeather.fulfilled, (state: any, action: PayloadAction<any>) => {
        if(!state.citiesWeather.find((city: { id: any; }) => city.id === action.payload.id)) {
          state.citiesWeather.push(action.payload);
        }
      })
  },
});

export const { citiesWeatherDelete } = weatherSlice.actions;

export const state = (state: RootState) => state.weather;

export default weatherSlice.reducer;

import { store } from "../app/store";
import {
  addCity,
  citiesWeatherDelete,
  getWeather,
} from "../features/weather/weatherSlice";

test("Add a new city", () => {
  let state = store.getState().weather;
  const initialCityCount = state.cities.length;

  store.dispatch(addCity("dubai"));

  state = store.getState().weather;
  expect(state.cities[state.cities.length - 1]).toBe("dubai");
  expect(state.cities.length).toBeGreaterThan(initialCityCount);
});

test("Delete a city from list", () => {
  let state = store.getState().weather;
  const initialCityCount = state.citiesWeather.length;

  store.dispatch(citiesWeatherDelete({ name: "dubai" }));
  state = store.getState().weather;
  expect(state.cities.length).toBeLessThanOrEqual(initialCityCount);
});

test("Delete a city from list", async () => {
  let state = store.getState().weather;
  const initialCitiesWeatherCount = state.citiesWeather.length;

  await store.dispatch(getWeather("dubai"));

  state = store.getState().weather;
  expect(state.citiesWeather.length).toBeGreaterThan(initialCitiesWeatherCount);
});

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Weather from "./features/weather/Weather";
import CityInfo from "./components/CityInfo";


const App = () => {
  const [cityInfo, setCityInfo] = useState(null)

  return (
    <Router>
    <Routes>
        <Route path="/" element={<Weather cityInfo={cityInfo} setCityInfo={setCityInfo}/>} />
        <Route path="/cityInfo" element={<CityInfo city={cityInfo}/>} />
      </Routes>
    </Router>
  );
};

export default App;

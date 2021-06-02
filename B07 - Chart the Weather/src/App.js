import React, { useState } from 'react';

import GeoForm from './components/geoForm';
import WeatherChart from './components/weatherChart';

import './App.css';

// openweathermap.org
// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&units=imperial&appid=bb96c7f9ac6f57dc00333727c5407547
// api key: bb96c7f9ac6f57dc00333727c5407547

// google maps api
// api key: AIzaSyDp4os33WF6-4d-xFVyL0HsUUHN7dOml_w

export default function App() {
  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="app">
      {/* form goes here */}
      <GeoForm
        setCoordinates={setCoordinates}
        error={error}
        setError={setError}
        setAddress={setAddress}
      />

      {error && <p>{error}</p>}

      {/* chart goes here */}
      {coordinates && (
        <WeatherChart coordinates={coordinates} address={address} />
      )}
    </div>
  );
}

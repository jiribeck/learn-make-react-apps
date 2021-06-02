import React, { useState } from 'react';

export default function GeoForm({ setCoordinates, setAddress, setError }) {
  const [city, setCity] = useState('');

  async function getCoordinates(city) {
    setError(null);
    let GOOGLE_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyDp4os33WF6-4d-xFVyL0HsUUHN7dOml_w`;
    const response = await fetch(GOOGLE_API_URL);
    const data = await response.json();
    console.log(data);

    if (data.status === 'OK') {
      const results = data.results[0];
      setCoordinates({
        lat: results.geometry.location.lat ?? 0,
        lng: results.geometry.location.lng ?? 0,
      });
      setAddress(results.formatted_address);
    } else {
      switch (data.status) {
        case 'ZERO_RESULTS':
          setError('Neexistující město!');
          break;
        default:
          setError(`Unknown ERROR: ${data.status}`);
          break;
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (city === '') {
      setError('No city added');
      return;
    }

    await getCoordinates(city);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
      />
    </form>
  );
}

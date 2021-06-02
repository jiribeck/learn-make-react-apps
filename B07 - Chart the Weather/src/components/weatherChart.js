import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';

export default function WeatherChart({ coordinates, address }) {
  const [weather, setWeather] = useState([]);

  async function getWeather(coordinates) {
    if (!coordinates) return;

    let OWM_API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=hourly,minutely&units=metric&appid=bb96c7f9ac6f57dc00333727c5407547`;
    try {
      const response = await fetch(OWM_API_URL);
      const data = await response.json();

      if (!data.daily) {
        console.error('No daily forcast available');
        return;
      }

      const dailyForcast = [...data.daily];
      let dailyMinMax = [];

      for (let i = 0; i < dailyForcast.length; i++) {
        const element = dailyForcast[i];
        dailyMinMax.push({ max: element.temp.max, min: element.temp.min });
      }
      setWeather(dailyMinMax);
    } catch (error) {
      console.error(error);
    }
  }

  function getLabels() {
    const daysInWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const labels = [...Array(8)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      if (i === 0) {
        return 'Today';
      } else {
        return daysInWeek[date.getDay()];
      }
    });

    return labels;
  }

  function getData(weather, labels) {
    const dataMin = [];
    const dataMax = [];

    for (let i = 0; i < weather.length; i++) {
      const day = weather[i];
      dataMin.push(day.min);
      dataMax.push(day.max);
    }

    const data = {
      labels,
      datasets: [
        {
          label: 'Highs',
          data: dataMax,
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Lows',
          data: dataMin,
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ],
    };
    return data;
  }

  const options = {
    plugins: {
      legend: {
        position: 'top',
        labels: { padding: 20, color: 'white' },
      },
    },
    scales: {
      x: {
        grid: { display: false, tickColor: '#ffffff' },
        ticks: { color: 'white', padding: 10 },
      },
      y: {
        grid: { display: false },
        ticks: { color: 'white', padding: 10 },
      },
    },
  };

  useEffect(() => {
    getWeather(coordinates);
  }, [coordinates]);

  return (
    <div>
      {address && (
        <p
          style={{
            color: '#2b2b2b',
            fontFamily: 'sans-serif',
            fontSize: '1.2rem',
            padding: '15px',
          }}
        >
          {address}
        </p>
      )}
      {weather && (
        <Bar
          style={{ padding: 5 }}
          data={getData(weather, getLabels())}
          options={options}
        />
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import '../assets/css/Planets.css';

const Planets = () => {
  const [planetData, setPlanetData] = useState(null);
  const [lunarCalendar, setLunarCalendar] = useState(null);

  useEffect(() => {
    fetch('/moon')
      .then((response) => response.json())
      .then((data) => {
        console.log('Received planet data:', data);
        setPlanetData(data);
      })
      .catch((error) => console.error('Error fetching planet data:', error));
  }, []);

  useEffect(() => {
    fetch('/lunar')
      .then((response) => response.json())
      .then((data) => {
        console.log('Received lunar calendar:', data);
        setLunarCalendar(data);
      })
      .catch((error) => console.error('Error fetching lunar calendar:', error));
  }, []);

  if (!planetData || !lunarCalendar) {
    return <div>Loading planet and lunar data...</div>;
  }

  const { sun, moon } = planetData;

  return (
    <div className="planets-container">
      {sun && (
        <div className="sun-side">
          <h2>Sun Data</h2>
          <p>Sunrise: {new Date(sun.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(sun.sunset * 1000).toLocaleTimeString()}</p>
          <p>Solar Noon: {sun.solar_noon}</p>
        </div>
      )}
      {moon && lunarCalendar && (
        <div className="moon-side">
          <h2>The Moon Tonight:</h2>
          <p className='emoji'>Appearance: {moon.emoji}</p>
          <p>Phase: {moon.phase_name}</p>
          <p>Illumination: {moon.illumination}</p>
          <p>Moonset: {new Date(moon.moonset_timestamp * 1000).toLocaleTimeString()}</p>
          <p>Moonrise: {new Date(moon.moonrise_timestamp * 1000).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default Planets;

import React, { useState, useEffect } from 'react';
import '../assets/css/Skymap.css';

const Skymap = () => {
  const [asteroids, setAsteroids] = useState([]);

  useEffect(() => {
    fetchAsteroids();
  }, []);

  const fetchAsteroids = async () => {
    try {
      const response = await fetch('/backend/models/skymap');
      if (response.ok) {
        const data = await response.json();
        const sortedAsteroids = sortAsteroids(data);
        setAsteroids(sortedAsteroids);
      } else {
        console.error('Failed to fetch asteroids:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching asteroids:', error);
    }
  };

  const sortAsteroids = (data) => {
    const today = new Date().toISOString().split('T')[0];
    const todayAsteroids = data.near_earth_objects[today] || [];
    const upcomingAsteroids = Object.keys(data.near_earth_objects)
      .filter((date) => date > today)
      .map((date) => data.near_earth_objects[date])
      .flat();
    return todayAsteroids.concat(upcomingAsteroids);
  };

  return (
    <div className="asteroid-container">
      {asteroids.map((asteroid, index) => (
        <div key={index} className="asteroid-card">
          <h3>Asteroid Name: {asteroid.name}</h3>
          <p>Closest Approach Date: {asteroid.close_approach_data[0].close_approach_date}</p>
          <p>Estimated Diameter: {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
          <p>Speed: {asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</p>
        </div>
      ))}
    </div>
  );
};

export default Skymap;

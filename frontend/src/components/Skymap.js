import React, { useState, useEffect } from 'react';
import '../assets/css/Skymap.css';

const Skymap = () => {
  const [asteroids, setAsteroid] = useState({ near_earth_objects: {} });
  useEffect(() => {
    fetchAsteroids();
  }, []);

  const fetchAsteroids = async () => {
    try{
      const response = await fetch('/backend/models/skymap')
      if(response.ok){
        const data = await response.json()
        setAsteroid(data);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch resource:', errorData)
      }
    } catch (error){
      console.error('Error fetching data:', error)
    }
  }
  return (
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Estimated Diameter (km)</th>
      </tr>
    </thead>
    <tbody>
      {asteroids.near_earth_objects &&
        Object.keys(asteroids.near_earth_objects).map(date =>
          asteroids.near_earth_objects[date].map(asteroid => (
            <tr key={asteroid.id}>
              <td>{asteroid.name}</td>
              <td>{asteroid.id}</td>
              <td>
                {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - 
                {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}
              </td>
            </tr>
          ))
        )}
    </tbody>
  </table>

  )
}

export default Skymap;
import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material'; // Import Material-UI components
import '../assets/css/Skymap.css';

const Skymap = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        const response = await fetch('/skymap');
        if (!response.ok) {
          throw new Error('Failed to fetch asteroids: ' + response.statusText);
        }
        const data = await response.json();
        const sortedAsteroids = sortAsteroids(data);
        setAsteroids(sortedAsteroids);
        setLoading(false);
      } catch (error) {
        setError('Error fetching asteroids: ' + error.message);
        setLoading(false);
      }
    };
    fetchAsteroids();
  }, []);

  const SortBySpeed = (e) => {
    e.preventDefault();
    const sortedAsteroids = [...asteroids].sort((a, b) => {
      const speedA = parseFloat(a.close_approach_data[0].relative_velocity.kilometers_per_hour);
      const speedB = parseFloat(b.close_approach_data[0].relative_velocity.kilometers_per_hour);
      return speedB - speedA;
    });
    setAsteroids(sortedAsteroids);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const sortAsteroids = (data) => {
    const today = new Date().toISOString().slice(0, 10);
    const todayAsteroids = data.near_earth_objects[today] || [];
    const upcomingAsteroids = Object.keys(data.near_earth_objects)
      .filter((date) => date > today)
      .flatMap((date) => data.near_earth_objects[date]);
    return todayAsteroids.concat(upcomingAsteroids);
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className='h1'>Asteroids Closest to Earth today</h1>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <TextField
          fullWidth
          onChange={handleSearchChange}
          value={search}
          label='Search by Name'
          variant='outlined'
        />
        <Button variant='contained' onClick={SortBySpeed}>Sort by Speed</Button>
      </Paper>
      <div className="asteroid-grid">
        {asteroids
          .filter((item) =>
            search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
          )
          .map((asteroid, index) => (
            <Paper key={index} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h6">Asteroid Name: {asteroid.name}</Typography>
              <Typography>Closest Approach Date: {asteroid.close_approach_data[0].close_approach_date}</Typography>
              <Typography>
                Estimated Diameter: {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} -{' '}
                {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
              </Typography>
              <Typography>Speed: {asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</Typography>
            </Paper>
          ))}
      </div>
    </div>
  );
};

export default Skymap;

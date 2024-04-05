import React, { useState, useEffect } from 'react';
import '../assets/css/Skymap.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Skymap = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  //const [sortBySpeed, setSortBySpeed] = useState(false);
  const [toggle, setToggle] = useState(false);

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
    e.preventDefault(); // Prevent default form submission behavior
    const sortedAsteroids = [...asteroids].sort((a, b) => {
      const speedA = parseFloat(a.close_approach_data[0].relative_velocity.kilometers_per_hour);
      const speedB = parseFloat(b.close_approach_data[0].relative_velocity.kilometers_per_hour);
      return speedB - speedA;
    });
    setAsteroids(sortedAsteroids); // Update the state with sorted asteroids
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
      <div style={{ display: 'none' }}>{setToggle}</div>
      <h1 className='h1'>Asteroids Closest to Earth today</h1>
      <Form>
        <InputGroup className='my-3'>
          <Form.Control
            onChange={handleSearchChange}
            value={search}
            placeholder='Search by Name'
          />
        </InputGroup>
        <button className='speed' onClick={(e) => SortBySpeed(e)}>Sort by speed</button>
      </Form>
      <div className="asteroid-grid">
        {asteroids
          .filter((item) =>
            search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
          )
          .map((asteroid, index) => (
            <div key={index} className="asteroid-card">
              <h3>Asteroid Name: {asteroid.name}</h3>
              <p>Closest Approach Date: {asteroid.close_approach_data[0].close_approach_date}</p>
              <p>
                Estimated Diameter: {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} -{' '}
                {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
              </p>
              <p>Speed: {asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Skymap;

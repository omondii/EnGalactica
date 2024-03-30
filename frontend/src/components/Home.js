import '../assets/css/Home.css';
import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomInput } from "./Calendar";


const Home = () => {
  const [picture, setPicture] = useState(null);
  const [text, setText] = useState();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    fetchPOTD(selectedDate);
  }, [selectedDate]);

  const fetchPOTD = async (date) => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await fetch(`/POTD?date=${formattedDate}`);
      const data = await response.json();
      setPicture(data.hdurl);
      setText(data.explanation);
      setTitle(data.title);
      if (data.hasOwnProperty('copyright')) {
        setAuthor(data['copyright']);
      } else {
        setAuthor(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className='date'>
      <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat='yyyy/MM/dd'
          maxDate={new Date()}
          customInput={<CustomInput />} />
      </div>
      <div className='potd'>
        {picture && (
          <img
            className='potd-image'
            src={picture}
            alt='Picture of the Day'
          />
        )}
        <div className='text'>
          <p>Title: {title}</p>
          {author && <p>Short By: {author}</p>}
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

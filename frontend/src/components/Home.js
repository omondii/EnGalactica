import '../assets/css/Home.css';
import React, { useState, useEffect } from 'react';

const Home = () => {
       const [picture, setPicture] = useState(null);
       const [text, setText] = useState();
       useEffect(() => {
              fetchPOTD();
       }, []);

       const fetchPOTD = async() => {
              try{
                     const response = await fetch('/POTD');
                     const data = await response.json();
                     setPicture(data.hdurl);
                     setText(data.explanation);
              } catch (error){
                     console.error("Error:", error);
              }
       };
       return (
              <div className='potd'>
                     {picture && (
                            <img
                            src={picture}
                            alt="Picture of the Day"
                            />
                     )}
                     <p className='text'>
                            <p>Today's Picture of the Day from NASA</p>
                            {text}
                     </p>
              </div>
       )
};
export default Home;

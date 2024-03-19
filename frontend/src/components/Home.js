import '../assets/css/Home.css';
import React, { useState, useEffect } from 'react';

const Home = () => {
       const [picture, setPicture] = useState(null);
       useEffect(() => {
              fetchPOTD();
       }, []);

       const fetchPOTD = async() => {
              try{
                     const response = await fetch('/POTD');
                     const data = await response.json();
                     setPicture(data.hdurl);
              } catch (error){
                     console.error("Error:", error);
              }
       };
       return (
              <div className='potd' style={{backgroundImage: `url(${picture})`}}>
                     {picture && (
                            <img
                            src={picture}
                            alt="Picture of the Day"
                            />
                     )}
              </div>
       )
};
export default Home;

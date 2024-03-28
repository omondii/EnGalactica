import '../assets/css/Home.css';
import React, { useState, useEffect } from 'react';

const Home = () => {
       const [picture, setPicture] = useState(null);
       const [text, setText] = useState();
       const [title, setTitle] = useState();
       const [author, setAuthor] = useState();
       useEffect(() => {
              fetchPOTD();
       }, []);

       const fetchPOTD = async() => {
              try{
                     const response = await fetch('/POTD');
                     const data = await response.json();
                     setPicture(data.hdurl);
                     setText(data.explanation);
                     setTitle(data.title)
                     setAuthor(data.copyright)
              } catch (error){
                     console.error("Error:", error);
              }
       };
       return (
              <div className='potd'>
                     {picture && (
                            <img
                            className='potd-image'
                            src={picture}
                            alt="Picture of the Day"
                            />
                     )}
                     <p className='text'>
                            <p>Title: {title}</p>
                            <p>Shot By: {author}</p>
                            {text}
                     </p>
              </div>
       )
};
export default Home;

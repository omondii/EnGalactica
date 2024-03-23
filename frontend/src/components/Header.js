import React from 'react'
import { CiMenuKebab } from 'react-icons/ci';
import {Link} from 'react-router-dom';
import '../assets/css/Header.css';


const Header = () => {
    return(
        <div className="nav">
            <div className='nav-logo'>
                 <p><Link to="/">EnGalactica</Link></p>
            </div>
            <ul className='nav-menu'>
                <li><Link to="/skymap">SKYMAP</Link></li>
                <li><Link to="/about">WEATHER</Link></li>
                <li className='nav-contact'>Contact</li>
            </ul>
            {/*
            <CiMenuKebab size={28} className='hidden ml-0'/>
            <div className='flex items-center p-10'>
            <p><Link to="#">Account</Link></p>
            </div>
            */}
        </div>
        )
}
export default Header
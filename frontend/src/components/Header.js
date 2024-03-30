import React, { useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci';
import {Link, NavLink} from 'react-router-dom';
import '../assets/css/Header.css';


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <nav>
        <Link to="/" className="logo">
          ENGALACTICA
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/skymap">SKYMAP</NavLink>
          </li>
          <li>
            <NavLink to="/about">WEATHER</NavLink>
          </li>
        </ul>
      </nav>
        )
}
export default Header
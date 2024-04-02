import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import '../assets/css/Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav>
          <Link to="/" className="title">
            EnGalactica
          </Link>
          <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={menuOpen ? "open" : ""}>
            <li>
              <NavLink to="/skymap">SkyMap</NavLink>
            </li>
            <li>
              <NavLink to="/weather">Planets</NavLink>
            </li>
            <li>
              <NavLink to="/Planets">More</NavLink>
            </li>
          </ul>
        </nav>
      );
};

export default Header;

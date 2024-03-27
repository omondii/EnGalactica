import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import '../assets/css/Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="nav">
            <div className='nav-logo'>
                <Link to="/">EnGalactica</Link>
            </div>
            <div ref={menuRef} className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                <ul>
                    <li><Link to="/skymap" onClick={handleMenuToggle}>SKYMAP</Link></li>
                    <li><Link to="/about" onClick={handleMenuToggle}>WEATHER</Link></li>
                    <li className='nav-contact'><Link to="/contact" onClick={handleMenuToggle}>Contact</Link></li>
                </ul>
            </div>
            <button aria-label="Toggle Menu" className="nav-toggle" onClick={handleMenuToggle}>
                <FiMenu />
            </button>
        </nav>
    );
};

export default Header;

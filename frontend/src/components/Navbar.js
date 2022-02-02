import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            SC
            <i className="fas fa-link fa-1x"/>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link
                to='/producer'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Producer
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/distributor'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Distributor
              </Link>
            </li>

            <li>
              <Link
                to='/retailer'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Retailer
              </Link>
            </li>

            <li>
              <Link
                to='/consumer'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Consumer
              </Link>
            </li>

            <li>
              <Link
                to='/centralauthority'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Central Authority
              </Link>
            </li>

            {/* <li>
              <Link
                to='/signup'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li> */}
          </ul>
          {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

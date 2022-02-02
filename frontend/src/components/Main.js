import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Main.css';
import video1 from './video1.mp4'
import {Link} from 'react-router-dom';
import './Button.css';

function Main() {
  return (
    <div className='hero-container'>
        <video autoPlay loop muted> 
            <source src={video1} type='video/mp4'/>
        </video>
      {/* <video src='../../public/videos/video-1.mp4' autoPlay loop muted /> */}
      <h1>Welcome to our Supply Chain</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
      <div className='btn-mobile'>
          <Link to='/track'>
            <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            >
                Track
            </Button>
          </Link>
          <Link to='/login'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          Log In 
        </Button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;

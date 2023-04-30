import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/financify-logo.jpg';

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <img src={logo} alt="Financify Logo" />
     
    </div>
  );
}

export default SplashScreen;

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './financify-logo.jpg';

function SplashScreen() {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/login');
    }, 1500);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div className="splash-container">
      <img src={logo} alt="Financify Logo" />
      <h1>Financify</h1>
    </div>
  );
}

export default SplashScreen;

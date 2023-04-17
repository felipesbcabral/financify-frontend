import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Logo from './assets/financify-logo.jpg';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="loading-screen">
          {/* Use o ícone aqui */}
          <img src={Logo} alt="My Icon" />
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;

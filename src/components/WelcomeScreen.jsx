import React , {useEffect} from 'react';
import './WelcomeScreen.css'; 


const WelcomeScreen = ({ onAnimationEnd }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="welcome-container">
      <div className="message hi">Hi!</div>
      <div className="message welcome">Welcome to IMS</div>
    </div>
  );
};

export default WelcomeScreen;

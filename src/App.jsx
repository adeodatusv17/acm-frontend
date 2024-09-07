import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Applicants from './components/Applicant.jsx';
import Interviews from './components/InterviewSchedule.jsx';
import Admin from './components/AdminLogin.jsx';
import Footer from './components/Footer.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import SendEmail from './components/SendEmail.jsx';
import './App.css';

function App() {
  const [showMain, setShowMain] = useState(false);

  const handleWelcomeFinish = () => {
    setShowMain(true);
  };

  return (
    <Router>
      <div className="App">
        {!showMain ? (
          <WelcomeScreen onAnimationEnd={handleWelcomeFinish} />
        ) : (
          <>
            <Navbar />
            <main className="content">
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/applicants" element={<Applicants />} />
                <Route path="/interviews" element={<Interviews />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/footer" element={<Footer />} />
                <Route path="/email" element={<SendEmail/>}/>
              </Routes>
            </main>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;

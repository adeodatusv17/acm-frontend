import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-title">Induction Management System</Link>
      <div className="navbar-links">
        <Link to="/applicants">Applicants</Link>
        <Link to="/interviews">Interviews</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/email">Send Email</Link>
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [username, setUsername] = useState('');
  const [admins, setAdmins] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // fetch all admins and interviews
  useEffect(() => {
    fetchAdmins();
    fetchInterviews();
  }, []);

  //  fetch admins
  const fetchAdmins = async () => {
    try {
      const response = await axios.get('https://induction-blond.vercel.app//admin/admins');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  //  fetch interviews
  const fetchInterviews = async () => {
    try {
      const response = await axios.get('https://induction-blond.vercel.app/interview/all');
      setInterviews(response.data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  //  add a new admin
  const handleAddAdmin = async () => {
    try {
      const response = await axios.post('https://induction-blond.vercel.app/admin/register', { username });
      console.log(response.data);
      setUsername('');
      fetchAdmins(); // Refresh the list after adding
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  // delete an admin
  const handleDeleteAdmin = async (username) => {
    try {
      await axios.delete(`https://induction-blond.vercel.app/admin/delete/${username}`);
      fetchAdmins(); 
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };
  

  // handle search
  const handleSearch = () => {
    return admins.filter(admin =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  //  get interview details for each admin
  const getAdminInterviewDetails = (adminUsername) => {
    const adminInterview = interviews.find(interview => interview.interviewer === adminUsername);
    return adminInterview ? adminInterview.applicantUid : 'None';
  };

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>
      <div className="admin-actions">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="admin-input"
        />
        <button className="btn" onClick={handleAddAdmin}>
          Add Admin
        </button>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search admins"
          className="admin-input"
        />
        <button className="btn" onClick={fetchAdmins}>
          Get Admins
        </button>
      </div>
      
      <div className="admin-list">
        <h2>Admin List</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Assigned Applicant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {handleSearch().map((admin) => (
              <tr key={admin._id}>
                <td>{admin.username}</td>
                <td>{getAdminInterviewDetails(admin.username)}</td>
                <td>
                  <button onClick={() => handleDeleteAdmin(admin.username)}>
                    <img src="/delete.png" alt="Delete" style={{ width: '10px', height: '10px' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;

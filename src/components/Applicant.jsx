import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [newApplicant, setNewApplicant] = useState({
    uid: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    interviewDone: false,
  });

  // Fetch all applicants from the backend
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get('http://localhost:3001/applicant/getapplicant');
        setApplicants(response.data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };
    
    fetchApplicants();
  }, []);

  // Handle adding a new applicant
  const handleAddApplicant = async () => {
    try {
      await axios.post('http://localhost:3001/applicant/addapplicant', newApplicant);
      setApplicants([...applicants, newApplicant]);
      setNewApplicant({ uid: '', name: '', email: '', phone: '', role: '', interviewDone: false }); // Clear form
    } catch (error) {
      console.error('Error adding applicant:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  // Filter applicants based on searchId
  const filteredApplicants = applicants.filter(applicant =>
    applicant.uid.toString().includes(searchId)
  );

  // Handle delete applicant
  const deleteApplicant = async (uid) => {
    try {
      await axios.delete(`http://localhost:3001/applicant/delete/${uid}`);
      setApplicants(applicants.filter(applicant => applicant.uid !== uid)); 
    } catch (error) {
      console.error('Error deleting applicant:', error);
    }
  };

  return (
    <div className="applicants">
      <h1>Applicants</h1>
      <div className="action-buttons">
        <button className="btn" onClick={() => document.getElementById('addApplicantForm').style.display = 'block'}>
          Add Applicant
        </button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter Applicant ID"
            value={searchId}
            onChange={handleSearchChange}
          />
          <button className="btn" onClick={() => fetchApplicants()}>Find Applicant</button>
        </div>
        <button className="btn" onClick={() => fetchApplicants()}>Get All Applicants</button>
      </div>

      <div id="addApplicantForm" style={{ display: 'none' }}>
        <h2>Add an Applicant</h2>
        <input
          type="text"
          placeholder="UID"
          value={newApplicant.uid}
          onChange={(e) => setNewApplicant({ ...newApplicant, uid: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={newApplicant.name}
          onChange={(e) => setNewApplicant({ ...newApplicant, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter E-mail"
          value={newApplicant.email}
          onChange={(e) => setNewApplicant({ ...newApplicant, email: e.target.value })}
          pattern="[a-zA-Z0-9._%+-]+@gmail\.com$" required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={newApplicant.phone}
          onChange={(e) => setNewApplicant({ ...newApplicant, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newApplicant.role}
          onChange={(e) => setNewApplicant({ ...newApplicant, role: e.target.value })}
        />
        <div>
          <label>
            Interview Done:
            <input
              type="checkbox"
              checked={newApplicant.interviewDone}
              onChange={(e) => setNewApplicant({ ...newApplicant, interviewDone: e.target.checked })}
            />
          </label>
        </div>
        <button className="btn" onClick={handleAddApplicant}>Add Applicant</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Interview Done</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.map(applicant => (
            <tr key={applicant.uid}>
              <td>{applicant.uid}</td>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
              <td>{applicant.phone}</td>
              <td>{applicant.role}</td>
              <td>{applicant.interviewDone ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => deleteApplicant(applicant.uid)} style={{cursor:'pointer'}}>
                  <img src="/delete.png" alt="del" style={{ width: '10px', height: '10px' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Applicants;

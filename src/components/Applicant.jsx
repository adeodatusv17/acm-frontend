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
    done: false,
    interviewScheduled: false, // Track if interview is scheduled
  });

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get('http://localhost:3001/applicant/getapplicant');
        const applicantsData = response.data;

        // Fetching interview status and if an interview is scheduled for each applicant
        const updatedApplicants = await Promise.all(applicantsData.map(async (applicant) => {
          try {
            const statusResponse = await axios.get(`http://localhost:3001/interview/status/${applicant.uid}`);
            return { 
              ...applicant, 
              done: statusResponse.data.done,  // Done status
              interviewScheduled: statusResponse.data.interviewScheduled // Track if interview is scheduled
            };
          } catch (error) {
            console.error(`Error fetching status for applicant ${applicant.uid}:`, error);
            return { ...applicant, done: false, interviewScheduled: false };
          }
        }));

        setApplicants(updatedApplicants);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, []);

  const handleAddApplicant = async () => {
    try {
      await axios.post('http://localhost:3001/applicant/addapplicant', newApplicant);
      setApplicants([...applicants, newApplicant]);
      setNewApplicant({ uid: '', name: '', email: '', phone: '', role: '', done: false, interviewScheduled: false }); 
    } catch (error) {
      console.error('Error adding applicant:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const filteredApplicants = applicants.filter(applicant =>
    applicant.uid.toString().includes(searchId)
  );

  const handleToggleInterviewDone = async (uid, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axios.put(`http://localhost:3001/interview/update/${uid}`, { done: newStatus });
      const updatedApplicants = applicants.map(applicant =>
        applicant.uid === uid ? { ...applicant, done: newStatus } : applicant
      );
      setApplicants(updatedApplicants);
    } catch (error) {
      console.error('Error toggling interview status:', error);
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
              <td>{applicant.done ? 'Yes' : 'No'}</td>
              <td>
                <div
                  className={`toggle ${applicant.done ? 'active' : ''}`}
                  onClick={() => handleToggleInterviewDone(applicant.uid, applicant.done)}
                  style={{ cursor: applicant.interviewScheduled ? 'pointer' : 'pointer' }}
                  
                >
                  <div className="ball"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Applicants;

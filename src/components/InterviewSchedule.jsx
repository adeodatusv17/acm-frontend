import React, { useState } from 'react';
import axios from 'axios';
import './Interviews.css';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [newInterview, setNewInterview] = useState({
    applicantUid: '',
    date: '',
    time: '',
    location: '',
    interviewer: '',
    done: false
  });

  const [showInterviews, setShowInterviews] = useState(false); 
  const [uid, setUid] = useState(''); 
  const [specificInterview, setSpecificInterview] = useState(null); 

  const fetchInterviews = async () => {
    try {
      const response = await axios.get('http://localhost:3001/interview/all');
      setInterviews(response.data);
      setShowInterviews(true); 
    } catch (error) {
      console.error('Error fetching interviews:', error);
      alert('Error fetching interviews. Please try again.');
    }
  };

  const handleAddInterview = async () => {
    try {
      await axios.post('http://localhost:3001/interview/add', newInterview);
      setNewInterview({ applicantUid: '', date: '', time: '', location: '', interviewer: '', done: false });
      fetchInterviews();
    } catch (error) {
      console.error('Error adding interview:', error);
      alert('Error adding interview. Please try again.');
    }
  };

  const fetchByUid = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/interview/${uid}`);
      setSpecificInterview(response.data); 
    } catch (error) {
      console.error('Error fetching interview by UID:', error);
      alert('Error fetching interview by UID. Please try again.');
    }
  };

  const handleToggleInterviewDone = async (applicantUid, currentStatus) => {
    try {
      await axios.put(`http://localhost:3001/interview/update/${applicantUid}`, { done: currentStatus });
      fetchInterviews(); 
    } catch (error) {
      console.error('Error updating interview status:', error);
      alert('Error updating interview status. Please try again.');
    }
  };

  return (
    <div className="interviews">
      <h1>Interview Schedule</h1>

      <div className="interview-controls">
        <div className="add-interview-form">
          <input
            placeholder="Applicant UID"
            type="text"
            value={newInterview.applicantUid}
            onChange={e => setNewInterview({ ...newInterview, applicantUid: e.target.value })}
          />
          <input
            type="text"
            placeholder="Interviewer"
            value={newInterview.interviewer}
            onChange={e => setNewInterview({ ...newInterview, interviewer: e.target.value })}
          />
          <input
            type="date"
            value={newInterview.date}
            onChange={e => setNewInterview({ ...newInterview, date: e.target.value })}
          />
          <input
            type="time"
            value={newInterview.time}
            onChange={e => setNewInterview({ ...newInterview, time: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={newInterview.location}
            onChange={e => setNewInterview({ ...newInterview, location: e.target.value })}
          />
        
          <button onClick={handleAddInterview} className="btn">Add Interview</button>
          <button onClick={fetchInterviews} className="btn">Get All Interviews</button>
          <div className='enter-uid'>
            <input
              type="text"
              placeholder="Enter Applicant UID"
              value={uid}
              onChange={e => setUid(e.target.value)}
            />
            <button onClick={fetchByUid} className="enter-uid-btn">Get Interview by UID</button>
          </div>
        </div>
      </div>

      {specificInterview && (
        <div className="specific-interview">
          <h2>Interview for Applicant {specificInterview.applicantUid}</h2>
          <p>Interviewer: {specificInterview.interviewer}</p>
          <p>Date: {new Date(specificInterview.date).toLocaleDateString()}</p>
          <p>Time: {specificInterview.time}</p>
          <p>Location: {specificInterview.location}</p>
        </div>
      )}

      {showInterviews && interviews.length > 0 && (
        <>
          <h2>All Interviews</h2>
          <table>
            <thead>
              <tr>
                <th>Applicant UID</th>
                <th>Interviewer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Interview Done</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map(interview => (
                <tr key={interview.applicantUid}>
                  <td>{interview.applicantUid}</td>
                  <td>{interview.interviewer}</td>
                  <td>{new Date(interview.date).toLocaleDateString()}</td>
                  <td>{interview.time}</td>
                  <td>{interview.location}</td>
                  <td>
                    <div className="toggle-container">
                      <div
                        className={`toggle ${interview.done ? 'active' : ''}`}
                        onClick={() => handleToggleInterviewDone(interview.applicantUid, !interview.done)}
                      >
                        <div className="ball"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Separate table for Interview Done status */}
          <h2>Interview Done Status</h2>
          <table>
            <thead>
              <tr>
                <th>Applicant UID</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map(interview => (
                <tr key={interview.applicantUid}>
                  <td>{interview.applicantUid}</td>
                  <td>{interview.done ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Interviews;

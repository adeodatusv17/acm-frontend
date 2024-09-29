import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Feedback() {
  const { applicantUid } = useParams();
  const [feedback, setFeedback] = useState('');
  const [existingFeedback, setExistingFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFeedback = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/interview/feedback/${applicantUid}`);
      if (response.data.feedback) {
        setExistingFeedback(response.data.feedback);
      } else {
        setExistingFeedback('No feedback yet.');
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setError('Error loading feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, [applicantUid]);

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/interview/feedback/${applicantUid}`, { feedback });
      alert('Feedback updated successfully!');
      // Reload the feedback after submission
      await loadFeedback();
      // Clear the input field
      setFeedback('');
    } catch (error) {
      console.error('Error updating feedback:', error);
      setError('Error updating feedback. Please try again.');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="feedback">
      <h1>Feedback for Applicant {applicantUid}</h1>
      {error && <div className="error">{error}</div>}
      <div id="feedback-text">
        <h2>Existing Feedback:</h2>
        <p>{existingFeedback}</p>
      </div>
      <div className="update-feedback">
        <h2>Update Feedback:</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="feedback">New Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={feedback}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn" type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;

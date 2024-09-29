import React, { useState } from 'react';
import axios from 'axios';

function SendEmail() {
  const [email, setEmail] = useState({
    subject: '',
    message: '',
    role: '',
    completionStatus: '',
  });

  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/send-email', {
        subject: email.subject,
        message: email.message,
        role: email.role || undefined,
        completionStatus: email.completionStatus === '' ? undefined : email.completionStatus === 'true',
      });
      setStatus(response.data.message);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('Failed to send email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="send-email">
      <h1>Send Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={email.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={email.message}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role (optional):</label>
          <input
            type="text"
            id="role"
            name="role"
            value={email.role}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="completionStatus">Completion Status (optional):</label>
          <select
            id="completionStatus"
            name="completionStatus"
            value={email.completionStatus}
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="true">Completed</option>
            <option value="false">Not Completed</option>
          </select>
        </div>
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Email'}
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default SendEmail;

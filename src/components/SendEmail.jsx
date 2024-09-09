import React, { useState } from 'react';
import axios from 'axios';

function SendEmail() {
  const [email, setEmail] = useState({
    to: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/send-email', email);
      setStatus('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('Failed to send email.');
    }
  };

  const handleSendToRemaining = async () => {
    try {
      const response = await axios.post('http://localhost:3001/send-email-to-remaining', {
        subject: email.subject,
        message: email.message,
      });
      setStatus('Emails sent to remaining applicants!');
    } catch (error) {
      console.error('Error sending emails to remaining applicants:', error);
      setStatus('Failed to send emails to remaining applicants.');
    }
  };

  return (
    <div className="send-email">
      <h1>Send Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="to">Recipient Email:</label>
          <input
            type="email"
            id="to"
            name="to"
            value={email.to}
            onChange={handleChange}
            placeholder="Enter a single recipient email"
          />
        </div>
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

        <button type="submit" className="btn">Send Email</button>
      </form>

      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <strong>OR</strong>
      </div>
   
      <button onClick={handleSendToRemaining} className="btn">//automatic sending
        Send to All Remaining Applicants
      </button>

      {status && <p>{status}</p>}
    </div>
  );
}

export default SendEmail;

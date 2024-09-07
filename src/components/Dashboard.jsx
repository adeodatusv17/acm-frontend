import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';

function Dashboard() {
  const [applicantCount, setApplicantCount] = useState(0);
  const [interviewCount, setInterviewCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    axios.get('https://ims-vert-kappa.vercel.app/admin/count')
      .then(response => setAdminCount(response.data.count))
      .catch(error => console.error('Error fetching admin count:', error));
  }, []);

  useEffect(() => {
    axios.get('https://ims-vert-kappa.vercel.app/applicant/count')
      .then(response => setApplicantCount(response.data.count))
      .catch(error => console.error('Error fetching applicant count:', error));
  }, []);

  useEffect(() => {
    axios.get('https://ims-vert-kappa.vercel.app/interview/count')
      .then(response => setInterviewCount(response.data.count))
      .catch(error => console.error('Error fetching interview count:', error));
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to IMS</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Applicants</h3>
          <p className="stat-number">
            <CountUp start={1} end={applicantCount} duration={2.5} />
          </p>
        </div>
        <div className="stat-card">
          <h3>Interviews Scheduled</h3>
          <p className="stat-number">
            <CountUp start={1} end={interviewCount} duration={2.5} />
          </p>
        </div>
        <div className="stat-card">
          <h3>Admins</h3>
          <p className="stat-number">
            <CountUp start={1} end={adminCount} duration={2.5} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

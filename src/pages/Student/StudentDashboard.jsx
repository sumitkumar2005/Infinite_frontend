import React from 'react';

const StudentDashboard = () => {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>Welcome to the Student Dashboard. Discover and register for events here.</p>
      <div className="dashboard-actions">
        <button className="btn-primary">Browse Events</button>
        <button className="btn-secondary">My Registrations</button>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Registered Events</h3>
          <p>5</p>
        </div>
        <div className="stat-card">
          <h3>Attended Events</h3>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Events</h3>
          <p>2</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

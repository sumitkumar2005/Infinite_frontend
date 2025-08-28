import React from 'react';

const OrganizersDashboard = () => {
  return (
    <div>
      <h1>Organizers Dashboard</h1>
      <p>Welcome to the Organizers Dashboard. Create and manage your events here.</p>
      <div className="dashboard-actions">
        <button className="btn-primary">Create New Event</button>
        <button className="btn-secondary">View My Events</button>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>My Events</h3>
          <p>8</p>
        </div>
        <div className="stat-card">
          <h3>Total Attendees</h3>
          <p>320</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Events</h3>
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizersDashboard;

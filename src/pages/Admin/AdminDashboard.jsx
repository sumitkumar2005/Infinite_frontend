import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard. Manage all users and events here.</p>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>150</p>
        </div>
        <div className="stat-card">
          <h3>Total Events</h3>
          <p>25</p>
        </div>
        <div className="stat-card">
          <h3>Active Organizers</h3>
          <p>12</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

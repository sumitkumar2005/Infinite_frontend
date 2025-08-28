import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentDashboard from "./pages/Student/StudentDashboard";
import OrganizerDashboard from "./pages/Organizers/OrganizersDashboard.jsx";
import Register from "./pages/Register";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
            <Route path={"/register"} element={<Register/>} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/organizer" element={<OrganizerDashboard />} />
        </Routes>
      </Router>
  );
}

export default App;

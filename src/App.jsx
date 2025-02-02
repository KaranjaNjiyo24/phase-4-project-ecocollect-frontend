import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import your components for each route
import Home from "./components/Home";
import UsersPage from "./components/UsersPage";
import PickupRequestsPage from "./components/PickupRequestsPage";
import AssignmentsPage from "./components/AssignmentsPage";
import UserForm from "./components/UserForm";

function App() {
  return (
    <Router>
      {/* Navigation bar is styled by nav { ... } in EcoCollect.css */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/pickup-requests">Pickup Requests</Link>
        <Link to="/assignments">Assignments</Link>
        <Link to="/new-user">Create User</Link>
      </nav>

      {/* Main container for the page content */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/pickup-requests" element={<PickupRequestsPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/new-user" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App

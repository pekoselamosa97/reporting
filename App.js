import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/common/login';
import Header from './components/common/header';
import Sidebar from './components/common/sidebar';
import StudentDashboard from './components/student/studentDashboard';
import LecturerDashboard from './components/Lecturer/LecturerDashboard';
import PRLDashboard from './components/Principal-Lecturer/PRLDashboard';
import PLDashboard from './components/Program-Leader/PLDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('');

  const handleLogin = (userData, type) => {
    setUser(userData);
    setUserType(type);
  };

  const handleLogout = () => {
    setUser(null);
    setUserType('');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app">
        <Header user={user} userType={userType} onLogout={handleLogout} />
        <div className="container-fluid">
          <div className="row">
            <Sidebar userType={userType} />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
              <Routes>
                <Route path="/" element={<Navigate to={`/${userType.toLowerCase()}`} />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/lecturer" element={<LecturerDashboard />} />
                <Route path="/principal-lecturer" element={<PRLDashboard />} />
                <Route path="/program-leader" element={<PLDashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
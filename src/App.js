import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/EmployeeDashboard';
import AdminRequestList from './pages/AdminRequestList';
import CreateLeavePage from './pages/CreateLeavePage';
import MyRequestsPage from './pages/MyRequestsPage';
import AdminAnalysisPage from './pages/AdminAnalysisPage';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <Navbar /> {/* Navigasyon menüsü */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/requests" element={<AdminRequestList />} />
        <Route path="/create-leave" element={<CreateLeavePage />} />
        <Route path="/my-requests" element={<MyRequestsPage />} />
        <Route path="/admin/analysis" element={<AdminAnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;

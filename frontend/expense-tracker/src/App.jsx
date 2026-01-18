import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";

// PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Default route → redirect to login or dashboard */}
          <Route path="/" element={
            localStorage.getItem("token") ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } />

          {/* Public routes */}
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<SignUp />} /> 

          {/* Protected routes */}
          <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} /> 
          <Route path="/income" element={<PrivateRoute><Income /></PrivateRoute>} /> 
          <Route path="/expense" element={<PrivateRoute><Expense /></PrivateRoute>} /> 
        </Routes>
      </Router>

      <Toaster toastOptions={{ className: "", style: { fontSize: '13px' } }} />
    </UserProvider>
  );
};

export default App;




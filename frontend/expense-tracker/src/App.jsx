import React from 'react'
<<<<<<< HEAD

=======
>>>>>>> cd895c62f8d521183ca06bc4cb090d0c9afa3ccb
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; 

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
<<<<<<< HEAD
import {Toaster} from "react-hot-toast";

const Root =()=>{
// Check if token exists in localStorage
const isAuthenticated = !! localStorage.getItem("token");

// Redirect to dashboard if authenticated,
return isAuthenticated ? (
<Navigate to="/dashboard" />
):(
<Navigate to="/login" />
);
}; 
 
const App = () => {
  return (
    <UserProvider>
    <div>
       <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element ={<Login />} /> 
          <Route path="/signUp" element ={<SignUp />} /> 
          <Route path="/dashboard" element ={<Home />} /> 
          <Route path="/income" element ={<Income />} /> 
          <Route path="/expense" element ={<Expense />} /> 
        </Routes>
       </Router>
    </div>



    <Toaster
toastOptions={{
     className: "",
      style:{
      fontSize: '13px'
      },
    }}
    />
=======
import { Toaster } from "react-hot-toast";

// ✅ PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <UserProvider>
      <div>
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
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: { fontSize: '13px' },
        }}
      />
>>>>>>> cd895c62f8d521183ca06bc4cb090d0c9afa3ccb
    </UserProvider>
  )
}

export default App;




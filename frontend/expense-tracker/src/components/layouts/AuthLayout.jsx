// src/components/layouts/AuthLayout.jsx
import React from "react";
import "./AuthLayout.css";
import CARD_2 from "../../assets/images/card2.png"; // Ensure file exists here
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      {/* Left side - Login/Auth Form */}
      <div className="auth-left">
        <h2 className="auth-title">Expense Tracker</h2>
        {children}
      </div>

      {/* Right side - Purple background with decorative elements */}
      <div className="auth-right">
        <div className="decorative-shape-1"></div>
        <div className="decorative-shape-2"></div>
        <div className="decorative-shape-3"></div>

        <div className="auth-content">
          <div className="stats-card">
            <div className="stats-card-content">
              <div className="stats-icon">
                <LuTrendingUpDown />
              </div>
              <div className="stats-text">
                <p className="stats-label">Track Your Income & Expenses</p>
                <p className="stats-value">$430,000</p>
              </div>
            </div>
          </div>

          <div className="dashboard-preview">
            <img src={CARD_2} alt="Dashboard Preview" className="dashboard-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

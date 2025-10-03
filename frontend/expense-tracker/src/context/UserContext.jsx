import React, { createContext, useState } from "react";

// Create the context
const UserContext = createContext();

// Create the provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    fullName: "",
    profileImageUrl: null,
  });

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user data
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Optional: default export can still be the provider
export default UserProvider;


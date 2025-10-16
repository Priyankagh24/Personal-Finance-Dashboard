import React, { createContext, useState } from "react";

// Create the context
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    fullName: "",
    profileImageUrl: null,
  });

  const updateUser = (userData) => setUser(userData);
  const clearUser = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;



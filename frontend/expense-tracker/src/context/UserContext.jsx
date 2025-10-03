import React, { createContext, useState } from "react";


export const UserProvider = ({ children }) => {
const [user, setUser] =useState({
    fullName: "",
    profileImageUrl: null,
});

// Function to update user data
const updateUser = (userData)=> {
setUser( userData) ;
};

// Function to clear user data (e.g.,
const clearUser =()=>{
    setUser(null);
};
    
return(
<UserContext.Provider
value={{
user,
updateUser,
clearUser,
}}
>
{children}
</UserContext.Provider>
);
}
export default UserProvider;

// authContext.jsx
import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const storedUser = localStorage.getItem("user");
let defaultCurrentUser;
let defaultRole;
let defaultEmail; // Add default email variable

try {
  const userData = storedUser ? JSON.parse(storedUser) : null;
  defaultCurrentUser = userData ? userData.user : null;
  defaultRole = userData ? userData.role : null;
  defaultEmail = userData ? userData.email : null; // Set default email from stored data
} catch (error) {
  console.error("Error parsing user data from localStorage:", error);
  defaultCurrentUser = null;
  defaultRole = null;
  defaultEmail = null; // Set default email to null in case of error
}

const INITIAL_STATE = {
  currentUser: defaultCurrentUser,
  role: defaultRole,
  email: defaultEmail, // Include email in the initial state
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ user: state.currentUser, role: state.role, email: state.email })); // Update localStorage to include email
  }, [state.currentUser, state.role, state.email]); // Include email in dependencies

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, role: state.role, email: state.email, dispatch }}> {/* Include email in value */}
      {children}
    </AuthContext.Provider>
  );
};

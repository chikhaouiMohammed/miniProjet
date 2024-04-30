// authContext.jsx
<<<<<<< HEAD
import  { createContext, useEffect, useReducer } from "react";
=======
import React, { createContext, useEffect, useReducer } from "react";
>>>>>>> 38f4da9f89b80963156a0f42bf1a925a983e7374
import AuthReducer from "./AuthReducer";

const storedUser = localStorage.getItem("user");
let defaultCurrentUser;
<<<<<<< HEAD
let defaultRole;

try {
  const userData = storedUser ? JSON.parse(storedUser) : null;
  defaultCurrentUser = userData ? userData.user : null;
  defaultRole = userData ? userData.role : null;
} catch (error) {
  console.error("Error parsing user data from localStorage:", error);
  defaultCurrentUser = null;
  defaultRole = null;
=======

try {
  defaultCurrentUser = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  console.error("Error parsing user data from localStorage:", error);
  defaultCurrentUser = null;
>>>>>>> 38f4da9f89b80963156a0f42bf1a925a983e7374
}

const INITIAL_STATE = {
  currentUser: defaultCurrentUser,
<<<<<<< HEAD
  role: defaultRole, // Initialize role with default value
=======
  role: null, // Initialize role as null
>>>>>>> 38f4da9f89b80963156a0f42bf1a925a983e7374
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ user: state.currentUser, role: state.role }));
  }, [state.currentUser, state.role]); // Include role in the dependency array

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, role: state.role, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

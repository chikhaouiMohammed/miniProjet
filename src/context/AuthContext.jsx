// authContext.jsx
import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const storedUser = localStorage.getItem("user");
let defaultCurrentUser;

try {
  defaultCurrentUser = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  console.error("Error parsing user data from localStorage:", error);
  defaultCurrentUser = null;
}

const INITIAL_STATE = {
  currentUser: defaultCurrentUser,
  role: null, // Initialize role as null
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, role: state.role, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

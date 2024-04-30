// authContext.jsx
import  { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const storedUser = localStorage.getItem("user");
let defaultCurrentUser;
let defaultRole;

try {
  const userData = storedUser ? JSON.parse(storedUser) : null;
  defaultCurrentUser = userData ? userData.user : null;
  defaultRole = userData ? userData.role : null;
} catch (error) {
  console.error("Error parsing user data from localStorage:", error);
  defaultCurrentUser = null;
  defaultRole = null;
}

const INITIAL_STATE = {
  currentUser: defaultCurrentUser,
  role: defaultRole, // Initialize role with default value
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

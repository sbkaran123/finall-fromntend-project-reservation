import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, fetchUserProfile} from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify and retrieve user info using token, update user state
        const fetchUser = async () => {
           try {
             const user = await fetchUserProfile();
             setUser(user);
          } catch (error) {
            console.error('Error fetching user:', error);
          }
         };
      fetchUser();
    }
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
    } catch (error) {
      console.error('Login Failed', error);
      throw error;
    }
  };

  const signup = async (name, email, password) => {
    try {
       const userData = await registerUser({ name, email, password });
      setUser(userData);
    } catch (error) {
        console.error('Signup Failed', error);
      throw error;
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    // Reset state and remove token
  };
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
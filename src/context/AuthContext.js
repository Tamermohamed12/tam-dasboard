import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export  const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('user');
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation - in real app, this would be an API call
        const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = savedUsers.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const userData = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
          };
          setUser(userData);
          setIsAuthenticated(true);
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const register = async (name, email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (savedUsers.find(u => u.email === email)) {
          reject(new Error('User with this email already exists'));
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password, // In real app, this would be hashed
        };

        savedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(savedUsers));

        const userData = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        };
        setUser(userData);
        setIsAuthenticated(true);
        resolve(userData);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedUserData
    }));
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



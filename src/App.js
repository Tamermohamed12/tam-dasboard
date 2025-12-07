import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import Products from './components/products/Products';
import Customers from './components/customers/Customers';
import Cart from './components/cart/Cart';
import Orders from './components/orders/Orders';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Transactions from './components/transactions/Transactions';
import Reviews from './components/reviews/Reviews';
import Statistics from './components/statistics/Statistics';
import Settings from './components/settings/Settings';
import Profile from './components/profile/Profile';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TransactionsProvider } from './context/TransactionsContext';
import { LanguageProvider } from './context/LanguageContext';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Public Route Component (redirects to dashboard if authenticated)
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

// Layout Component for authenticated pages
function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Get current path for active tab
  const currentPath = location.pathname.replace('/', '') || 'dashboard';

  return (
    <div className="App">
      <Sidebar
        activeTab={currentPath}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="main-content">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          theme={theme}
          toggleTheme={toggleTheme}
          user={user}
        />
        <main className="content-area">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <TransactionsProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </TransactionsProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;

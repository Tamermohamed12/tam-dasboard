import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '') || 'dashboard';
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || key;

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: '🏠', path: '/dashboard' },
    { id: 'products', label: t('products'), icon: '🛍️', path: '/products' },
    { id: 'orders', label: t('orders'), icon: '🛒', path: '/orders' },
    { id: 'customers', label: t('customers'), icon: '👥', path: '/customers' },
    { id: 'cart', label: t('cart'), icon: '🛒', path: '/cart' },
    { id: 'transactions', label: t('transactions'), icon: '💲', path: '/transactions' },
    { id: 'reviews', label: t('reviews'), icon: '💬', path: '/reviews' },
    { id: 'statistics', label: t('statistics'), icon: '📊', path: '/statistics' },
    { id: 'settings', label: t('settings'), icon: '⚙️', path: '/settings' },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">
            <span className="logo-icon">🌿</span>
            T.alisson
          </h2>
          <button className="sidebar-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`sidebar-item ${currentPath === item.id ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

import React, { createContext, useContext, useState, useEffect } from 'react';

const TransactionsContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (orderData) => {
    const newTransaction = {
      id: orderData.orderId || `TXN-${Date.now()}`,
      orderId: orderData.orderId,
      date: new Date().toISOString(),
      total: orderData.total,
      items: orderData.items,
      status: 'completed',
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod || 'card',
      ...orderData,
    };

    setTransactions(prev => [newTransaction, ...prev]);
    return newTransaction;
  };

  const getTransactionById = (id) => {
    return transactions.find(t => t.id === id || t.orderId === id);
  };

  const getTotalRevenue = () => {
    return transactions.reduce((sum, t) => sum + (t.total || 0), 0);
  };

  const getTotalTransactions = () => {
    return transactions.length;
  };

  const value = {
    transactions,
    addTransaction,
    getTransactionById,
    getTotalRevenue,
    getTotalTransactions,
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};







import React, { useState, useEffect } from 'react';
import './Transactions.css';
import { useTransactions } from '../../context/TransactionsContext';

const Transactions = () => {
  const { transactions, getTotalRevenue, getTotalTransactions } = useTransactions();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.orderId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || transaction.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: getTotalTransactions(),
    revenue: getTotalRevenue(),
    completed: transactions.filter(t => t.status === 'completed').length,
    pending: transactions.filter(t => t.status === 'pending').length
  };

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h1>Transactions</h1>
        <p>View and manage all transaction records</p>
      </div>

      <div className="transactions-stats">
        <div className="stat-card">
          <h3>Total Transactions</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>${stats.revenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
      </div>

      <div className="transactions-filters">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="no-transactions">
          <p>No transactions found.</p>
        </div>
      ) : (
        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Items</th>
                <th>Status</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.orderId || 'N/A'}</td>
                  <td>
                    {transaction.date
                      ? new Date(transaction.date).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>${transaction.total?.toFixed(2) || '0.00'}</td>
                  <td>{transaction.items || transaction.cartItems?.length || 0}</td>
                  <td>
                    <span className={`status-badge ${transaction.status}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td>{transaction.paymentMethod || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;

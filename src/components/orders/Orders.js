import React, { useState, useEffect } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockOrders = [
        {
          id: 'ORD-001',
          customer: 'John Doe',
          product: 'Wireless Headphones',
          date: '2024-01-15',
          status: 'completed',
          total: 99.99,
          quantity: 1
        },
        {
          id: 'ORD-002',
          customer: 'Jane Smith',
          product: 'Smart Watch Pro',
          date: '2024-01-14',
          status: 'pending',
          total: 249.99,
          quantity: 1
        },
        {
          id: 'ORD-003',
          customer: 'Mike Johnson',
          product: 'Laptop Stand',
          date: '2024-01-13',
          status: 'completed',
          total: 49.99,
          quantity: 2
        },
        {
          id: 'ORD-004',
          customer: 'Sarah Williams',
          product: 'Wireless Mouse',
          date: '2024-01-12',
          status: 'completed',
          total: 29.99,
          quantity: 1
        },
        {
          id: 'ORD-005',
          customer: 'David Brown',
          product: 'USB-C Hub',
          date: '2024-01-11',
          status: 'pending',
          total: 39.99,
          quantity: 1
        },
        {
          id: 'ORD-006',
          customer: 'Emily Davis',
          product: 'Mechanical Keyboard',
          date: '2024-01-10',
          status: 'completed',
          total: 129.99,
          quantity: 1
        }
      ];
      
      setOrders(mockOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Orders</h1>
        <p>Manage and track all customer orders</p>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.quantity}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${order.status}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

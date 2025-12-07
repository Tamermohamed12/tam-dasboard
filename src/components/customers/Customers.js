import React, { useState, useEffect } from 'react';
import './Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      // Fetch users from JSONPlaceholder API and combine with random user API for images
      const [usersResponse, randomUsersResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://randomuser.me/api/?results=200&inc=picture,name,email,phone,location')
      ]);
      
      const usersData = await usersResponse.json();
      const randomUsersData = await randomUsersResponse.json();
      
      // Combine data from both APIs
      const combinedCustomers = usersData.map((user, index) => {
        const randomUser = randomUsersData.results[index % randomUsersData.results.length];
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || randomUser?.phone || `+1 234-567-${String(user.id).padStart(4, '0')}`,
          status: Math.random() > 0.3 ? 'active' : 'inactive',
          orders: Math.floor(Math.random() * 30) + 1,
          totalSpent: (Math.random() * 5000 + 100).toFixed(2),
          company: user.company?.name || 'Company Inc',
          department: ['Engineering', 'Sales', 'Marketing', 'Support', 'Management'][Math.floor(Math.random() * 5)],
          address: {
            street: user.address?.street || randomUser?.location?.street?.name || '123 Main St',
            city: user.address?.city || randomUser?.location?.city || 'New York',
            state: user.address?.suite || randomUser?.location?.state || 'NY',
            zip: user.address?.zipcode || randomUser?.location?.postcode || '10001'
          },
          avatar: randomUser?.picture?.large || `https://i.pravatar.cc/150?img=${user.id}`
        };
      });
      
      // Add more customers from random user API to reach 200
      const additionalCustomers = randomUsersData.results.slice(usersData.length, 200).map((randomUser, index) => ({
        id: usersData.length + index + 1,
        name: `${randomUser.name.first} ${randomUser.name.last}`,
        email: randomUser.email,
        phone: randomUser.phone,
        status: Math.random() > 0.3 ? 'active' : 'inactive',
        orders: Math.floor(Math.random() * 30) + 1,
        totalSpent: (Math.random() * 5000 + 100).toFixed(2),
        company: ['Tech Corp', 'Design Studio', 'Marketing Inc', 'Finance Group', 'Retail Co', 'Consulting LLC'][Math.floor(Math.random() * 6)],
        department: ['Engineering', 'Sales', 'Marketing', 'Support', 'Management', 'Operations'][Math.floor(Math.random() * 6)],
        address: {
          street: randomUser.location?.street?.name || '123 Main St',
          city: randomUser.location?.city || 'New York',
          state: randomUser.location?.state || 'NY',
          zip: randomUser.location?.postcode || '10001'
        },
        avatar: randomUser.picture?.large || `https://i.pravatar.cc/150?img=${usersData.length + index + 1}`
      }));
      
      setCustomers([...combinedCustomers, ...additionalCustomers]);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalSpent = customers.reduce((sum, c) => sum + parseFloat(c.totalSpent), 0);
  const averageAge = 35; // Mock data

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading customers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
        <button onClick={fetchCustomers}>Retry</button>
      </div>
    );
  }

  return (
    <div className="customers-container">
      <div className="customers-header">
        <h2>Customers</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search customers by name, email, or company..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="customers-stats">
        <div className="stat-card">
          <h3>Total Customers</h3>
          <p>{customers.length}</p>
        </div>
        <div className="stat-card">
          <h3>Filtered Results</h3>
          <p>{filteredCustomers.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p>{activeCustomers}</p>
        </div>
        <div className="stat-card">
          <h3>Average Age</h3>
          <p>{averageAge}</p>
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="no-results">
          <p>No customers found matching your search.</p>
        </div>
      ) : (
        <>
          <div className="customers-grid">
            {paginatedCustomers.map((customer) => (
              <div key={customer.id} className="customer-card">
                <div className="customer-avatar">
                  <img 
                    src={customer.avatar} 
                    alt={customer.name}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=10b981&color=fff&size=120`;
                    }}
                  />
                  <span className={`status-badge ${customer.status}`}>
                    {customer.status}
                  </span>
                </div>
                <div className="customer-info">
                  <h3>{customer.name}</h3>
                  <div className="customer-email">{customer.email}</div>
                  <div className="customer-phone">{customer.phone}</div>
                  
                  <div className="customer-details">
                    <div className="detail-item">
                      <span className="label">Orders</span>
                      <span>{customer.orders}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Total Spent</span>
                      <span>${parseFloat(customer.totalSpent).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="customer-company">
                    <div className="company-name">{customer.company}</div>
                    <div className="company-department">{customer.department}</div>
                  </div>

                  <div className="customer-address">
                    <p>{customer.address.street}</p>
                    <p>{customer.address.city}, {customer.address.state} {customer.address.zip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Customers;

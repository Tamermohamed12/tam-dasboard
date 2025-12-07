import React from 'react';
import './Statistics.css';

const Statistics = () => {
  const statsData = [
    { label: 'Total Sales', value: '$125,430', change: '+12.5%', trend: 'up', icon: '💰' },
    { label: 'Total Orders', value: '2,543', change: '+8.2%', trend: 'up', icon: '🛒' },
    { label: 'Total Customers', value: '1,234', change: '+15.3%', trend: 'up', icon: '👥' },
    { label: 'Average Order Value', value: '$49.30', change: '+3.1%', trend: 'up', icon: '📊' },
    { label: 'Conversion Rate', value: '3.24%', change: '+0.5%', trend: 'up', icon: '📈' },
    { label: 'Return Rate', value: '2.1%', change: '-0.3%', trend: 'down', icon: '↩️' },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 234, revenue: '$23,400', growth: '+15%' },
    { name: 'Smart Watch Pro', sales: 189, revenue: '$47,250', growth: '+22%' },
    { name: 'Laptop Stand', sales: 156, revenue: '$7,800', growth: '+8%' },
    { name: 'Mechanical Keyboard', sales: 142, revenue: '$18,460', growth: '+12%' },
    { name: 'USB-C Hub', sales: 128, revenue: '$5,120', growth: '+5%' },
  ];

  const categoryDistribution = [
    { category: 'Electronics', value: 45, color: '#3b82f6' },
    { category: 'Accessories', value: 30, color: '#10b981' },
    { category: 'Wearables', value: 15, color: '#f59e0b' },
    { category: 'Others', value: 10, color: '#8b5cf6' },
  ];

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <div>
          <h1>Statistics</h1>
          <p className="statistics-subtitle">Comprehensive analytics and insights</p>
        </div>
        <button className="create-report-btn">
          📄 Create Report
        </button>
      </div>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.label}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.trend}`}>
                {stat.change} from last month
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="statistics-content">
        <div className="statistics-main">
          <div className="chart-section">
            <h2>Sales Overview</h2>
            <div className="chart-container">
              <div className="line-chart">
                {[10, 15, 8, 22, 18, 25, 20, 30, 28, 35, 32, 28].map((value, index) => (
                  <div key={index} className="chart-bar-container">
                    <div
                      className="chart-bar"
                      style={{ height: `${(value / 35) * 100}%` }}
                    ></div>
                    <span className="chart-label">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="top-products-section">
            <h2>Top Products</h2>
            <div className="top-products-list">
              {topProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <div className="product-rank">#{index + 1}</div>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-details">
                      <span>{product.sales} sales</span>
                      <span>•</span>
                      <span>{product.revenue}</span>
                    </div>
                  </div>
                  <div className="product-growth">{product.growth}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="statistics-sidebar">
          <div className="category-chart-section">
            <h2>Category Distribution</h2>
            <div className="category-chart">
              {categoryDistribution.map((item, index) => (
                <div key={index} className="category-item">
                  <div className="category-bar">
                    <div
                      className="category-fill"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                  <div className="category-info">
                    <span className="category-name">{item.category}</span>
                    <span className="category-value">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="recent-activity-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">🛒</div>
                <div className="activity-content">
                  <div className="activity-title">New order received</div>
                  <div className="activity-time">2 minutes ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">💰</div>
                <div className="activity-content">
                  <div className="activity-title">Payment processed</div>
                  <div className="activity-time">15 minutes ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📦</div>
                <div className="activity-content">
                  <div className="activity-title">Product added</div>
                  <div className="activity-time">1 hour ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">👤</div>
                <div className="activity-content">
                  <div className="activity-title">New customer registered</div>
                  <div className="activity-time">2 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;


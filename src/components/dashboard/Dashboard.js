import React from 'react';
import './Dashboard.css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

const Dashboard = () => {
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || key;
  // Sales data for line chart (12 months)
  const salesData = [18, 5, 10, 15, 20, 25, 30, 28, 25, 20, 15, 10];
  const visitorsData = [38, 10, 20, 25, 30, 35, 38, 35, 30, 25, 20, 15];
  const productsData = [28, 10, 20, 15, 25, 20, 28, 10, 38, 15, 38, 20];

  // Revenue by area data
  const revenueData = {
    categories: ['900', '1200', '1400', '1600'],
    us: [200, 250, 300, 400],
    europe: [300, 350, 250, 300],
    asian: [200, 250, 300, 250],
    africa: [200, 350, 150, 50]
  };

  const maxSalesValue = Math.max(...salesData, ...visitorsData, ...productsData);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>{t('dashboard.title')}</h1>
          <p className="dashboard-subtitle">{t('dashboard.subtitle')}</p>
        </div>
        <button className="create-report-btn">
          <span>📄</span>
          <span>+</span>
          {t('dashboard.createReport')}
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon revenue">💰</div>
          <div className="metric-content">
            <h3>{t('dashboard.revenue')}</h3>
            <div className="metric-value">$13,456.5</div>
            <div className="metric-subtitle">Shipping fees are not included</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon orders">🚚</div>
          <div className="metric-content">
            <h3>{t('dashboard.orders')}</h3>
            <div className="metric-value">53.668</div>
            <div className="metric-subtitle">Excluding orders in transit</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon products">📦</div>
          <div className="metric-content">
            <h3>{t('dashboard.products')}</h3>
            <div className="metric-value">9.856</div>
            <div className="metric-subtitle">In 19 Categories</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon earning">🛍️</div>
          <div className="metric-content">
            <h3>{t('dashboard.monthlyEarning')}</h3>
            <div className="metric-value">$6,982</div>
            <div className="metric-subtitle">Based in your local time.</div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>{t('dashboard.saleStatistics')}</h3>
          <div className="chart-legend">
            <div className="legend-item sales">Sales</div>
            <div className="legend-item visitors">Visitors</div>
            <div className="legend-item products">Products</div>
          </div>
          <div className="chart-container">
            <div className="line-chart">
              {salesData.map((value, index) => (
                <div key={index} className="chart-points">
                  <div className="chart-lines">
                    <div
                      className="line sales-line"
                      style={{ height: `${(value / maxSalesValue) * 100}%` }}
                    ></div>
                    <div
                      className="line visitors-line"
                      style={{ height: `${(visitorsData[index] / maxSalesValue) * 100}%` }}
                    ></div>
                    <div
                      className="line products-line"
                      style={{ height: `${(productsData[index] / maxSalesValue) * 100}%` }}
                    ></div>
                  </div>
                  <div className="chart-label">
                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>{t('dashboard.revenueBaseOnArea')}</h3>
          <div className="chart-legend">
            <div className="legend-item us">US</div>
            <div className="legend-item europe">Europe</div>
            <div className="legend-item asian">Asian</div>
            <div className="legend-item africa">Africa</div>
          </div>
          <div className="chart-container">
            <div className="bar-chart">
              {revenueData.categories.map((category, catIndex) => {
                const maxBarValue = Math.max(
                  revenueData.us[catIndex],
                  revenueData.europe[catIndex],
                  revenueData.asian[catIndex],
                  revenueData.africa[catIndex]
                );
                return (
                  <div key={catIndex} className="bar-group">
                    <div className="bars">
                      <div
                        className="bar us-bar"
                        style={{ height: `${(revenueData.us[catIndex] / maxBarValue) * 100}%` }}
                      ></div>
                      <div
                        className="bar europe-bar"
                        style={{ height: `${(revenueData.europe[catIndex] / maxBarValue) * 100}%` }}
                      ></div>
                      <div
                        className="bar asian-bar"
                        style={{ height: `${(revenueData.asian[catIndex] / maxBarValue) * 100}%` }}
                      ></div>
                      <div
                        className="bar africa-bar"
                        style={{ height: `${(revenueData.africa[catIndex] / maxBarValue) * 100}%` }}
                      ></div>
                    </div>
                    <div className="chart-label">{category}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="marketing-section">
        <h3>{t('dashboard.marketingChannel')}</h3>
        <div className="marketing-content">
          <p>Marketing channel analytics and insights will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

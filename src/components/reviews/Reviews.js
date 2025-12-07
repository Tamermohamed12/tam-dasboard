import React, { useState } from 'react';
import '../../components/reviews/Reviews.css';
import Rating from '../Rating';

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      productName: 'Wireless Headphones',
      rating: 5,
      comment: 'Excellent product! Great sound quality and comfortable to wear for long periods.',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      productName: 'Smart Watch',
      rating: 4,
      comment: 'Good value for money. Battery life could be better, but overall satisfied.',
      date: '2024-01-14',
      verified: true
    },
    {
      id: 3,
      customerName: 'Mike Johnson',
      productName: 'Laptop Stand',
      rating: 5,
      comment: 'Perfect for my home office setup. Very sturdy and adjustable.',
      date: '2024-01-13',
      verified: false
    },
    {
      id: 4,
      customerName: 'Sarah Williams',
      productName: 'Wireless Mouse',
      rating: 3,
      comment: 'Decent mouse but the scroll wheel feels a bit loose. Otherwise works fine.',
      date: '2024-01-12',
      verified: true
    },
    {
      id: 5,
      customerName: 'David Brown',
      productName: 'USB-C Hub',
      rating: 4,
      comment: 'Great connectivity options. All ports work as expected.',
      date: '2024-01-11',
      verified: true
    },
    {
      id: 6,
      customerName: 'Emily Davis',
      productName: 'Mechanical Keyboard',
      rating: 5,
      comment: 'Love the typing experience! The keys feel amazing and the RGB lighting is beautiful.',
      date: '2024-01-10',
      verified: true
    }
  ]);

  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredReviews = reviews.filter(review => {
    if (filterRating === 'all') return true;
    return review.rating === parseInt(filterRating);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else if (sortBy === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(r => r.rating === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <div>
          <h1>Product Reviews</h1>
          <p className="reviews-subtitle">Manage and view customer reviews</p>
        </div>
        <div className="reviews-stats">
          <div className="stat-card">
            <div className="stat-value">{reviews.length}</div>
            <div className="stat-label">Total Reviews</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{averageRating}</div>
            <div className="stat-label">Average Rating</div>
            <Rating rating={parseFloat(averageRating)} readonly showValue={false} size="small" />
          </div>
        </div>
      </div>

      <div className="reviews-content">
        <div className="reviews-sidebar">
          <div className="filter-section">
            <h3>Filter by Rating</h3>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterRating === 'all' ? 'active' : ''}`}
                onClick={() => setFilterRating('all')}
              >
                All ({reviews.length})
              </button>
              {ratingDistribution.map(({ rating, count }) => (
                <button
                  key={rating}
                  className={`filter-btn ${filterRating === rating.toString() ? 'active' : ''}`}
                  onClick={() => setFilterRating(rating.toString())}
                >
                  <Rating rating={rating} readonly size="small" showValue={false} />
                  <span>({count})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rating-breakdown">
            <h3>Rating Breakdown</h3>
            <div className="breakdown-list">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="breakdown-item">
                  <div className="breakdown-rating">
                    <span>{rating}</span>
                    <Rating rating={rating} readonly size="small" showValue={false} />
                  </div>
                  <div className="breakdown-bar">
                    <div
                      className="breakdown-bar-fill"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="breakdown-count">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reviews-main">
          <div className="reviews-controls">
            <div className="sort-controls">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
            <div className="reviews-count">
              Showing {sortedReviews.length} of {reviews.length} reviews
            </div>
          </div>

          <div className="reviews-list">
            {sortedReviews.length === 0 ? (
              <div className="no-reviews">
                <p>No reviews found with the selected filter.</p>
              </div>
            ) : (
              sortedReviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="review-customer">
                      <div className="customer-avatar">
                        {review.customerName.charAt(0)}
                      </div>
                      <div className="customer-info">
                        <div className="customer-name">
                          {review.customerName}
                          {review.verified && (
                            <span className="verified-badge">✓ Verified Purchase</span>
                          )}
                        </div>
                        <div className="review-date">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    <Rating rating={review.rating} readonly showValue={false} />
                  </div>
                  <div className="review-product">
                    Product: <strong>{review.productName}</strong>
                  </div>
                  <div className="review-comment">
                    {review.comment}
                  </div>
                  <div className="review-actions">
                    <button className="action-btn helpful">Helpful</button>
                    <button className="action-btn reply">Reply</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;


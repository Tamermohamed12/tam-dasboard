import React from 'react';
import './Rating.css';

const Rating = ({ rating, maxRating = 5, size = 'medium', showValue = false, readonly = false, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = React.useState(0);
  const [currentRating, setCurrentRating] = React.useState(rating || 0);

  React.useEffect(() => {
    setCurrentRating(rating || 0);
  }, [rating]);

  const handleStarClick = (value) => {
    if (readonly) return;
    setCurrentRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleStarHover = (value) => {
    if (readonly) return;
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoveredRating(0);
  };

  const displayRating = hoveredRating || currentRating;

  return (
    <div className={`rating-container ${size} ${readonly ? 'readonly' : ''}`}>
      <div 
        className="rating-stars"
        onMouseLeave={handleMouseLeave}
      >
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayRating;
          
          return (
            <span
              key={index}
              className={`star ${isFilled ? 'filled' : 'empty'}`}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              style={{ cursor: readonly ? 'default' : 'pointer' }}
            >
              ★
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="rating-value">{Number(currentRating).toFixed(1)}</span>
      )}
    </div>
  );
};

export default Rating;


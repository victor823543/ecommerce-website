import React from 'react';
import styles from './StarRating.module.css';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const partialStarWidth = (rating - fullStars) * 100;

  return (
    <div className={styles.starContainer}>
      {[...Array(5)].map((_, index) => (
        <div key={index} className={styles.star}>
          <div
            className={styles.starInner}
            style={{
              width: index < fullStars ? '100%' : index === fullStars ? `${partialStarWidth}%` : '0%',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default StarRating;

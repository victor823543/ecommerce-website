import React from 'react';
import styles from './ItemSlider.module.css';

interface ItemSliderProps {
  items: React.ReactNode[];
  direction?: 'left' | 'right';
}

const ItemSlider: React.FC<ItemSliderProps> = ({ items, direction = 'left' }) => {
  return (
    <div className={styles.sliderContainer}>
      <div className={direction === 'left' ? styles.sliderContent : styles.sliderContentReverse}>
        {[...items, ...items].map((item, index) => (
          <div key={index} className={styles.sliderItem}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemSlider;

import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import styles from './DotFollower.module.css'; // CSS Modules for styling
import { useHover } from '../../../context/HoverContext';

const DotFollower: React.FC = () => {
    const { isHovering } = useHover()
  // Motion values for x and y coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth motion
  const springX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  // Update mouse position
  const handleMouseMove = (event: MouseEvent) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    
      <motion.div
        className={styles.dot}
        animate={isHovering ? {scale: .5} : {scale: 1}}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
  );
};

export default DotFollower;

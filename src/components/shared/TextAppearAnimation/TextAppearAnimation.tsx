import { ReactNode, FC } from 'react';
import { motion } from 'framer-motion';

interface TextAppearAnimationProps {
    children: ReactNode;
}

const TextAppearAnimation: FC<TextAppearAnimationProps> = ({ children }) => {
  const splitTextToLines = (text: ReactNode): string[] => {
    if (typeof text === 'string') {
      return text.split('\n');
    }
    return [];
  };

  const lines = splitTextToLines(children);

  return (
    <>
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.7, rotateX: '-70deg', opacity: 0 }}
          whileInView={{ scale: 1, rotateX: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: index * 0.2 }}
          style={{ overflow: 'hidden' }}
          viewport={{ once: true }}
        >
          {line}
        </motion.div>
      ))}
    </>
  );
};

export default TextAppearAnimation;

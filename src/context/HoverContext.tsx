import React, { createContext, useContext, useState, useEffect } from 'react';

interface HoverContextType {
  isHovering: boolean;
  setIsHovering: (isHovering: boolean) => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export const HoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (target && target.classList && target.classList.contains('hover-target')) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (target && target.classList && target.classList.contains('hover-target')) {
      setIsHovering(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <HoverContext.Provider value={{ isHovering, setIsHovering }}>
      {children}
    </HoverContext.Provider>
  );
};

export const useHover = (): HoverContextType => {
  const context = useContext(HoverContext);
  if (!context) {
    throw new Error('useHover must be used within a HoverProvider');
  }
  return context;
};

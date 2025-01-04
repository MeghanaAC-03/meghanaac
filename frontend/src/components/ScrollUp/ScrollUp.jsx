import React, { useState, useEffect } from 'react';
import './ScrollUp.css';

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300); // Show button after 300px scroll
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button className='scroll-up-button' onClick={scrollToTop}>
          ⬆️
        </button>
      )}
    </div>
  );
};

export default ScrollUp;

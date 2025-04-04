import React from 'react';
import { FaStar as RawFaStar } from 'react-icons/fa';

// Force the icon to be treated as a valid React component
const FaStar = RawFaStar as unknown as React.FC;

const Test = () => {
  return (
    <div>
      <h2>Testing Icon</h2>
      <FaStar />
    </div>
  );
};

export default Test;

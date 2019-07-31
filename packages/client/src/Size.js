import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const SizeStateContext = React.createContext();

function SizeProvider({ children }) {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    Dimensions.addEventListener('change', ({ window }) =>
      setDimensions(window),
    );

    return () => Dimensions.removeEventListener('change');
  }, []);

  const state = [
    {
      ...dimensions,
      xs: true,
      s: dimensions.width >= 301,
      m: dimensions.width >= 601,
      l: dimensions.width >= 1024,
      xl: dimensions.width >= 1601,
    },
  ];

  return (
    <SizeStateContext.Provider value={state}>
      {children}
    </SizeStateContext.Provider>
  );
}

function useSizeState() {
  const context = React.useContext(SizeStateContext);
  if (context === undefined) {
    throw new Error('useSizeState must be used within a SizeProvider');
  }
  return context;
}

export { SizeProvider, useSizeState };

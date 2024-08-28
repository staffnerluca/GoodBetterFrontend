// VegStreakContext.jsx
import React, { createContext, useState, useContext } from "react";

const VegStreakContext = createContext();

export function VegStreakProvider({ children }) {
  const [currentVegStreak, setCurrentVegStreak] = useState(0);

  const value = {
    currentVegStreak,
    setCurrentVegStreak,
  };

  return (
    <VegStreakContext.Provider value={value}>
      {children}
    </VegStreakContext.Provider>
  );
}

export function useVegStreak() {
  return useContext(VegStreakContext);
}

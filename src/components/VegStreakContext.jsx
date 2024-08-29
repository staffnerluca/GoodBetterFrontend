import React, { createContext, useState, useContext, useEffect } from "react";

const VegStreakContext = createContext();

export function VegStreakProvider({ children }) {
  const [currentVegStreak, setCurrentVegStreak] = useState(0);
  useEffect(() => {
    const fetchVegStreak = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/get_current_streak/username1");
        if (response.ok) {
          const data = await response.json();
          setCurrentVegStreak(data.not_eating_meat_streak);
        } else {
          console.error("Failed to fetch streak");
        }
      } catch (error) {
        console.error("Error fetching streak:", error);
      }
    };

    fetchVegStreak();
  }, []);


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

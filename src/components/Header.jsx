import React from "react";
import { useVegStreak } from "./VegStreakContext";
import "./Header.css";

const Header = () => {
  const { currentVegStreak } = useVegStreak();

  return (
    <header className="header">
      <h1>🥦 Vegetarinism Streak: {currentVegStreak}</h1>
    </header>
  );
};

export default Header;

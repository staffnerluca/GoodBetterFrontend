import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VegetarianismStreak from './components/VegitarianismStreak';
import CoursesOverview from './components/CoursesOverview';
import DidYouEatMeatToday from './components/DidYouEatMeatToday';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/vegitarianismStreak" Component={VegetarianismStreak} />
          <Route path="/start" Component={CoursesOverview} />
          <Route path="/didYouEatMeat" Component={DidYouEatMeatToday} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

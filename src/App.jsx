import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VegetarianismStreak from './components/VegitarianismStreak';
import CoursesOverview from './components/CoursesOverview';
import DidYouEatMeatToday from './components/DidYouEatMeatToday';
import TestAPI from './components/TestAPI';
import Register from './components/Register';
import Login from './components/Login';
import Course from './components/Course';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/vegitarianismStreak" Component={VegetarianismStreak} />
          <Route path="/start" Component={CoursesOverview} />
          <Route path="/didYouEatMeat" Component={DidYouEatMeatToday} />
          <Route path="/testAPI" Component={TestAPI} />
          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Login} />
          <Route path="/course" Component={Course} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

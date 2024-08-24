import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VegetarianismStreak from "./components/VegitarianismStreak";
import CoursesOverview from "./components/CoursesList";
import DidYouEatMeatToday from "./components/DidYouEatMeatToday";
import TestAPI from "./components/TestAPI";
import Register from "./components/Register";
import Login from "./components/Login";
import Courses from "./components/Courses";
import CoursesList from "./components/CoursesList";
import CoursePage from "./components/CoursePage";
import CourseCard from "./components/CourseCard";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            exact
            path="/vegitarianismStreak"
            Component={VegetarianismStreak}
          />
          <Route path="/didYouEatMeat" Component={DidYouEatMeatToday} />
          <Route path="/testAPI" Component={TestAPI} />
          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Login} />
          <Route path="/courses" Component={Courses} />
          <Route path="/start" Component={CoursesList} />
          <Route path="/courses/:id" element={CoursePage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

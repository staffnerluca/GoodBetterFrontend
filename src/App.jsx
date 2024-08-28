import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import VegetarianismStreak from "./components/VegitarianismStreak";
import CoursesOverview from "./components/CoursesList";
import DidYouEatMeatToday from "./components/DidYouEatMeatToday";
import TestAPI from "./components/TestAPI";
import Register from "./components/Register";
import Login from "./components/Login";
import Courses from "./components/Courses";
import CoursesList from "./components/CoursesList";
import Footer from "./components/Footer";

function App({ location }) {
  const noFooter = ["/register", "/"];

  return (
    <div>
      <Routes>
        <Route path="/vegitarianismStreak" Component={VegetarianismStreak} />
        <Route path="/didYouEatMeat" Component={DidYouEatMeatToday} />
        <Route path="/testAPI" Component={TestAPI} />
        <Route path="/register" Component={Register} />
        <Route path="/" Component={Login} />
        <Route path="/courses" Component={Courses} />
        <Route path="/start" Component={CoursesList} />
      </Routes>
      {!noFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

function AppWrapper() {
  const location = useLocation();  // Now inside the Router context

  return (
    <App location={location} />
  );
}

export default function Root() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

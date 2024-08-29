import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { VegStreakProvider } from "./components/VegStreakContext";
import VegetarianismStreak from "./components/VegitarianismStreak";
import DidYouEatMeatToday from "./components/DidYouEatMeatToday";
import TestAPI from "./components/TestAPI";
import Register from "./components/Register";
import Login from "./components/Login";
import Courses from "./components/Courses";
import CoursesList from "./components/CoursesList";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoralityChatBot from "./components/MoralityChatbot";

function App({ location }) {
  const noFooter = ["/register", "/"];

  return (
    <VegStreakProvider>
      <Layout>
        <Routes>
          <Route path="/vegitarianismStreak" Component={VegetarianismStreak} />
          <Route path="/didYouEatMeat" Component={DidYouEatMeatToday} />
          <Route path="/testAPI" Component={TestAPI} />
          <Route path="/register" Component={Register} />
          <Route path="/" Component={Login} />
          <Route path="/courses" Component={Courses} />
          <Route path="/start" Component={CoursesList} />
          <Route path="moralityChatbot" Component={MoralityChatBot} />
        </Routes>
        {/* {!noFooter.includes(location.pathname) && <Footer />} */}
      </Layout>
    </VegStreakProvider>
  );
}

function AppWrapper() {
  const location = useLocation();

  return <App location={location} />;
}

export default function Root() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

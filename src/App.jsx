import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuScreen from './components/MenuScreen';
import StarterSurvey from './components/StarterSurvey';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" Component={MenuScreen} />
          <Route path="/start" Component={StarterSurvey} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

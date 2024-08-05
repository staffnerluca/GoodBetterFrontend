import { useState } from 'react';
import './../App.css';

function CoursesOverview() {
  const [userAttributes, setUserAttributes] = useState(0);

  function aboutYouForm() {
    console.log("hello");
  }

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default CoursesOverview;

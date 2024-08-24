import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/courses") //i'm testing this with a dummy backend server that runs locally, pls change this to the proper url :)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses!", error);
      });
  }, []);

  return (
    <div className="course-list">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          pictureUrl={course.pictureUrl}
        />
      ))}
    </div>
  );
}

export default CourseList;

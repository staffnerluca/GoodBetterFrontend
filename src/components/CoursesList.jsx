import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get_all_courses/")
      .then((response) => {
        setCourses(response.data);
        alert(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching courses!", error);
      });
  }, []);

  return (
    <div>
      <h1>Our courses</h1>
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.name}
            pictureUrl={course.imageUrl}
          />
        ))}
      </div>
    </div>
    
  );
}

export default CourseList;

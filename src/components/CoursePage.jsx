import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CoursePage() {
  const { id } = useParams(); // Extract course ID from the URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:4000/courses/${id}`) //need to change!
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course details!", error);
      });
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="course-page">
      <h1>{course.title}</h1>
      <img src={course.pictureUrl} alt={course.title} />
    </div>
  );
}

export default CoursePage;

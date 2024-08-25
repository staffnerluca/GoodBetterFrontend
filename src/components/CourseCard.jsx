import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ id, title, pictureUrl }) {
  return (
    <div className="course-card">
      <Link to={`/courses/${id}`}>
        <img src={pictureUrl} alt={"Image: "+ title} />
        <h3>{title}</h3>
      </Link>
    </div>
  );
}

export default CourseCard;

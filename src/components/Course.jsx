import React, { useState, useEffect } from "react";

function Course(){
    const [course, setCourse] = useState("1");
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [questionsDict, setQuestionsDict] = useState({});

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/course-questions/' + course + "/");
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                const questionIds = Object.keys(data);
                if (questionIds.length > 0) {
                    setCurrentQuestion(data[questionIds[0]]);
                }

                const restQuestions = questionIds.slice(1).reduce((acc, id) => {
                    acc[id] = data[id];
                    return acc;
                }, {});

                setQuestionsDict(restQuestions);
                console.log(questionsDict);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }

        fetchQuestions();
    }, []);

    return(
        <div>
            <h1>The Course</h1>
            {JSON.stringify(currentQuestion)}
            {JSON.stringify(questionsDict)}
        </div>
    )
}

export default Course;
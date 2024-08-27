import React, { useState, useEffect } from "react";

function Course() {
    const [course_id, setCourseID] = useState("1");
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [questionsDict, setQuestionsDict] = useState({});
    const [showTitleScreen, setShowTitleScreen] = useState(true);
    const [doneQuestions, setDoneQuestions] = useState([]);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/course-questions/' + course_id + "/");

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
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }

        fetchQuestions();
    }, [course_id]);

    function TitleScreen() {
        return (
            <div>
                <h1>This is the title screen</h1>
                <button onClick={() => setShowTitleScreen(false)}>Start</button>
            </div>
        );
    }

    function handleBoolQuestionButton(type) {
        setDoneQuestions([...doneQuestions, currentQuestion["id"]]);
        let question = "Course finished";
        if (type === "yes") {
            question = questionsDict["next_question_if_true"];
        } else if (type === "no") {
            question = questionsDict["next_question_if_false"];
        } else {
            alert("Not able to handle button press");
        }
        console.log(question);
        setCurrentQuestion(question);
    }

    function CourseQuestion() {
        if (currentQuestion["is_boolean"]) {
            return (
                <div>
                    <p>{currentQuestion["content"]}</p>
                    <button onClick={() => handleBoolQuestionButton("yes")}>Yes</button>
                    <button onClick={() => handleBoolQuestionButton("no")}>No</button>
                </div>
            );
        } else if (currentQuestion["options"] === "int") {
            return (
                <div>
                    <p>{currentQuestion["content"]}</p>
                    <label>Amount: </label> <input className="integerField" />
                </div>
            );
        } else if (currentQuestion["options"] === "percent") {
            return (
                <div>
                    <p>{currentQuestion["content"]}</p>
                    <div><label>Amount: </label> <input className="integerField" /> % </div>
                </div>
            );
        } else {
            return null; // Add a fallback if no condition matches
        }
    }

    function RenderPage() {
        if (showTitleScreen) {
            return <TitleScreen />;
        }
        return <CourseQuestion />;
    }

    return (
        <div>
            <RenderPage />
        </div>
    );
}

export default Course;

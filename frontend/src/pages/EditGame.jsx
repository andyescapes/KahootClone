import React from "react";
import InputField from ".././components/InputField";
import { useHistory, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  Container,
  Box,
  Button,
  Drawer,
} from "@material-ui/core";
import { getQuizzes } from "../helper/api.js";

function EditGame(props) {
  const [question, setQuestion] = React.useState("");
  const [questionType, setQuestionType] = React.useState("");
  const [timeLimit, setTimeLimit] = React.useState("");
  const [points, setPoints] = React.useState("");
  const [answers, setAnswers] = React.useState("");
  const [correctAnswer, setCorrectAnswer] = React.useState("");
  const [url, setURL] = React.useState("");

  const history = useHistory();
  const { gameid } = useParams();
  const [questions, setQuestions] = React.useState([]);

  const getQuizDetails = async (token, id) => {
    console.log(id);
    const request = await fetch(`http://localhost:5111/admin/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await request.json();
    console.log(result);
    setQuestions(result.questions);
  };

  const addQuizQuestion = async (token, id, questionObject) => {
    const body = { questions: questionObject };
    console.log(body);
    const request = await fetch(`http://localhost:5111/admin/quiz/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await request.json();
    console.log(result);
    setQuestions(result.questions);
  };

  React.useEffect(() => {
    getQuizDetails(props.token, gameid);
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        New Question
      </Typography>
      <InputField
        field="Question"
        setState={setQuestion}
        state={question}
      ></InputField>
      <InputField
        field="Question Type"
        setState={setQuestionType}
        state={questionType}
      ></InputField>
      <InputField
        field="Time Limit"
        setState={setTimeLimit}
        state={timeLimit}
      ></InputField>
      <InputField
        field="Points"
        setState={setPoints}
        state={points}
      ></InputField>
      <InputField
        field="Answers"
        setState={setAnswers}
        state={answers}
      ></InputField>
      <InputField
        field="Correct Answer"
        setState={setCorrectAnswer}
        state={correctAnswer}
      ></InputField>
      <InputField field="URL" setState={setURL} state={url}></InputField>
      {/* 
      {questions.map((question) => (
        <h1>{question.name}</h1>
      ))} */}
      <Button
        color="primary"
        variant="contained"
        onClick={() =>
          addQuizQuestion(props.token, gameid, [
            ...questions,
            {
              question: question,
              questionType: questionType,
              timeLimit: timeLimit,
              points: points,
              image: "asdfasdf",
              url: url,
              answers: [{ id: "asdfasdf", answer: "doge" }],
              correctAnswers: [123, 43, 122],
            },
          ])
        }
      >
        Add Question
      </Button>
    </>
  );
}

export default EditGame;

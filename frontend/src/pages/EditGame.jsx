import React from "react";

import InputField from "../components/InputField";
import AnswerField from "../components/AnswerField";
import { useHistory, useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  Checkbox,
} from "@material-ui/core";
import { getQuizzes } from "../helper/api.js";
import GameCard from "../components/GameCard";

function EditGame(props) {
  const [question, setQuestion] = React.useState("");
  const [timeLimit, setTimeLimit] = React.useState("");
  const [points, setPoints] = React.useState("");
  const [answers, setAnswers] = React.useState([0, 0, 0, 0, 0, 0]);
  const [correctAnswer, setCorrectAnswer] = React.useState("");
  const [error, setError] = React.useState("");

  const history = useHistory();
  const { gameid } = useParams();
  const [questions, setQuestions] = React.useState([]);

  const { randomBytes } = require("crypto");

  const newId = () => {
    return randomBytes(16).toString("hex");
  };

  const getQuizDetails = async (token, id) => {
    console.log(id);
    const request = await fetch(`http://localhost:5544/admin/quiz/${id}`, {
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
    // questionObject.answers.push({
    //   id: newId(),
    //   answer: questionObject.correctAnswer,
    // });
    const body = { questions: questionObject };
    console.log(body);
    if (!question || !timeLimit || !points) {
      setError("All fields must be full");
      return;
    }
    if (answers.filter((e) => e === 0).length > 4) {
      setError("You need atleast another answer!");
      return;
    }
    setError("");
    const request = await fetch(`http://localhost:5544/admin/quiz/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await request.json();
    console.log(result);
    setQuestions(questionObject);
  };

  const deleteQuizQuestion = async (token, gameId, questionId) => {
    console.log(questions);
    const questionDeleted = questions.filter((question) => {
      console.log(question.id, "then", questionId);

      return !(question.id === questionId);
    });

    const body = { questions: questionDeleted };

    console.log(questionDeleted);
    const request = await fetch(`http://localhost:5544/admin/quiz/${gameId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await request.json();
    console.log(result);
    if (request.status == 200) setQuestions(questionDeleted);
  };

  React.useEffect(() => {
    getQuizDetails(props.token, gameid);
  }, []);

  const renderError = () => {
    if (error) {
      return (
        <Typography color="secondary" variant="h5" display="block">
          {error}
        </Typography>
      );
    }
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Grid item xs={2}></Grid>
        <Grid item xs={10}>
          {questions.map((question, index) => (
            <Box m={3} mt={3} key={index}>
              <GameCard
                thumbnail={false}
                title={question.question}
                delete={deleteQuizQuestion}
                id={gameid}
                key={question.id}
                questionId={question.id}
                token={props.token}
              ></GameCard>
            </Box>
          ))}

          <Box m={3} mt={3}>
            <Typography variant="h5" gutterBottom>
              New Question
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  field="Question"
                  setState={setQuestion}
                  state={question}
                ></InputField>
              </Grid>
              <Grid item xs={6}>
                <InputField
                  field="Time Limit"
                  setState={setTimeLimit}
                  state={timeLimit}
                ></InputField>
              </Grid>
              <Grid item xs={6}>
                <InputField
                  field="Points"
                  setState={setPoints}
                  state={points}
                ></InputField>
              </Grid>

              <Grid item xs={6}>
                <AnswerField
                  field="Correct Answer"
                  setAnswers={setAnswers}
                  answers={answers}
                  num={0}
                ></AnswerField>
              </Grid>

              <Grid item xs={6}>
                <AnswerField
                  field="Answer 1"
                  setAnswers={setAnswers}
                  answers={answers}
                  num={1}
                ></AnswerField>
              </Grid>
              <Grid item xs={6}>
                <AnswerField
                  field="Answer 2"
                  setAnswers={setAnswers}
                  answers={answers}
                  num={2}
                ></AnswerField>
              </Grid>
              <Grid item xs={6}>
                <AnswerField
                  field="Answer 3"
                  setAnswers={setAnswers}
                  answers={answers}
                  num={3}
                ></AnswerField>
              </Grid>
              <Grid item xs={6}>
                <AnswerField
                  field="Answer 4"
                  setAnswers={setAnswers}
                  answers={answers}
                  num={4}
                ></AnswerField>
              </Grid>
              <Grid item xs={6}>
                <AnswerField
                  field="Answer 5"
                  setAnswers={setAnswers}
                  answers={answers}
                  num={5}
                ></AnswerField>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>

            {/* 
      {questions.map((question) => (
        <h1>{question.name}</h1>
      ))} */}
      <div className={"buttonStyle"}>

            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                const correctAnswerAdded = [...answers]
                correctAnswerAdded[0].correct = true
                addQuizQuestion(props.token, gameid, [
                  ...questions,
                  {
                    id: newId(),
                    question: question,
                    questionType: "single",
                    timeLimit: timeLimit,
                    points: points,
                    image: "",
                    url: "",
                    answers: correctAnswerAdded,
                  },
                ]);
              }}
            >
              Add Question
            </Button>
            <Button onClick ={()=>history.push("/dashboard")}>
              Back
            </Button></div>
            {renderError()}
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}

export default EditGame;

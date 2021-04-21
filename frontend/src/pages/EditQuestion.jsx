import React from "react";

import InputField from "../components/InputField";
import AnswerField from "../components/AnswerField";
import { fileToDataUrl } from "../helper/helper";
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
  const [error, setError] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [image, setImage] = React.useState("");

  const history = useHistory();
  const { gameid, questionid } = useParams();
  const [questions, setQuestions] = React.useState([]);

  const { randomBytes } = require("crypto");

  const newId = () => {
    return randomBytes(16).toString("hex");
  };

  console.log(answers, "lol");
  const getQuizDetails = async (token, id) => {
    console.log(id);
    const request = await fetch(`http://localhost:5543/admin/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await request.json();
    console.log(result);

    const selectedQuestion = result.questions.filter((question) => {
      return question.id === questionid;
    });
    const question = selectedQuestion[0];
    setQuestions(result.questions);
    setQuestion(question.question);
    setTimeLimit(question.timeLimit);
    setPoints(question.points);
    setAnswers(question.answers);

    setUrl(question.url);
    setImage(question.image);
  };

  const saveQuizQuestion = async (
    token,
    id,
    questionid,
    questions,
    questionObject
  ) => {
    //remove the
    const editedQuestionsArray = questions.filter((question) => {
      return !(question.id === questionid);
    });
    editedQuestionsArray.push(questionObject);

    const body = { questions: editedQuestionsArray };
    console.log(body, "this is the body");
    if (!question || !timeLimit || !points) {
      setError("All fields must be full");
      return;
    }
    if (answers.filter((e) => e === 0).length > 4) {
      console.log(answers, "whats going on here");
      setError("You need atleast another answer!");
      return;
    }
    if (answers.filter((e) => e.correct === true).length === 0) {
      console.log(answers, "whats going on here");
      setError("You need atleast one correct answer!");
      return;
    }

    // if (error.length > 0) {
    //   return;
    // }
    setError("");
    const request = await fetch(`http://localhost:5543/admin/quiz/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await request.json();
    console.log(request.status);
    setQuestions(questionObject);
    if (request.status === 200) {
      setError("success");
    }
  };

  React.useEffect(() => {
    getQuizDetails(props.token, gameid);
  }, []);

  const setCorrectAnswerState = (index, answers) => {
    const answersCopy = [...answers];
    //delete if input is 0
    if (answersCopy[index] !== 0) {
      answersCopy[index].correct =
        answersCopy[index].correct == false ? true : false;
      setAnswers(answersCopy);
    }

    console.log(answers);
  };

  const setAnswerState = (value, index, answers) => {
    const answersCopy = [...answers];
    //delete if input is 0
    if (value.length === 0) {
      answersCopy[index] = 0;
    } else {
      //if answer was never set create new id
      if (answersCopy[index] === 0) {
        answersCopy[index] = { id: newId(), answer: value };
        //if answer is set change the value
      } else {
        answersCopy[index].answer = value;
      }
    }

    console.log(answers);
    setAnswers(answersCopy);
  };

  const updateImageState = (event) => {
    try {
      fileToDataUrl(event.target.files[0]).then((res) => {
        // console.log(res);
        // const split_64_encoded = res.split(",");
        // console.log(split_64_encoded[1]);
        setImage(res);
      });
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  const renderError = () => {
    if (error) {
      if (error === "success") {
        return (
          <Typography color="primary" variant="h5" display="block">
            Success!
          </Typography>
        );
      } else {
        return (
          <Typography color="secondary" variant="h5" display="block">
            {error}
          </Typography>
        );
      }
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
            </Grid>
            <Box mt={3} mb={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Tick the desired correct answers
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <Typography variant="body2">Answer 1</Typography>
                  </div>
                  <TextField
                    onChange={(e) => {
                      setAnswerState(e.target.value, 0, answers);
                    }}
                    value={answers[0].answer || ""}
                  ></TextField>
                  <Checkbox
                    onChange={() => setCorrectAnswerState(0, answers)}
                    checked={answers[0].correct || false}
                  ></Checkbox>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <Typography variant="body2">Answer 2</Typography>
                  </div>
                  <TextField
                    onChange={(e) => {
                      setAnswerState(e.target.value, 1, answers);
                    }}
                    value={answers[1].answer || ""}
                  ></TextField>
                  <Checkbox
                    onChange={() => setCorrectAnswerState(1, answers)}
                    checked={answers[1].correct || false}
                  ></Checkbox>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <Typography variant="body2">Answer 3</Typography>
                  </div>
                  <TextField
                    onChange={(e) => {
                      setAnswerState(e.target.value, 2, answers);
                    }}
                    value={answers[2].answer || ""}
                  ></TextField>
                  <Checkbox
                    onChange={() => setCorrectAnswerState(2, answers)}
                    checked={answers[2].correct || false}
                  ></Checkbox>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <Typography variant="body2">Answer 4</Typography>
                  </div>
                  <TextField
                    onChange={(e) => {
                      setAnswerState(e.target.value, 3, answers);
                    }}
                    value={answers[3].answer || ""}
                  ></TextField>
                  <Checkbox
                    onChange={() => setCorrectAnswerState(3, answers)}
                    checked={answers[3].correct || false}
                  ></Checkbox>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <Typography variant="body2">Answer 5</Typography>
                  </div>
                  <TextField
                    onChange={(e) => {
                      setAnswerState(e.target.value, 4, answers);
                    }}
                    value={answers[4].answer || ""}
                  ></TextField>
                  <Checkbox
                    onChange={() => setCorrectAnswerState(4, answers)}
                    checked={answers[4].correct || false}
                  ></Checkbox>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <Typography variant="body2">Answer 6</Typography>
                  </div>
                  <TextField
                    onChange={(e) => {
                      setAnswerState(e.target.value, 5, answers);
                    }}
                    value={answers[5].answer || ""}
                  ></TextField>
                  <Checkbox
                    onChange={() => setCorrectAnswerState(5, answers)}
                    checked={answers[5].correct || false}
                  ></Checkbox>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <Typography variant="body2">URL</Typography>
                  </div>
                  <InputField setState={setUrl} state={url || ""}></InputField>
                </Grid>

                <Grid item xs={6}>
                  <div>
                    <Typography variant="body2">Upload Image</Typography>
                  </div>
                  <input type="file" onChange={updateImageState}></input>
                </Grid>
              </Grid>
            </Box>
            {/* 
      {questions.map((question) => (
        <h1>{question.name}</h1>
      ))} */}
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                const splitLink = url.split("watch?v=");
                const embedLink = splitLink.join("embed/");
                const questionType =
                  answers.filter((answer) => {
                    return answer.correct == true;
                  }).length > 1
                    ? "multiple"
                    : "single";
                saveQuizQuestion(props.token, gameid, questionid, questions, {
                  id: questionid,
                  question: question,
                  questionType: questionType,
                  timeLimit: timeLimit,
                  points: points,
                  answers: answers,
                  url: embedLink,
                  image: image,
                });
              }}
            >
              Save
            </Button>
            {renderError()}
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}

export default EditGame;

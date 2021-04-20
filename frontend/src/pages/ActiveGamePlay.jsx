import React from "react";
import "../App.css";
import InputField from "../components/InputField";
import AnswerField from "../components/AnswerField";
import { useHistory, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  Grid,
  Box,
  Checkbox,
  CardContent,
  Container,
  CardActionArea,
} from "@material-ui/core";
import { getQuizzes } from "../helper/api.js";
import GameCard from "../components/GameCard";
import ErrorPopUp from "../components/ErrorPopUp";

function JoinGameScreen(props) {
  const { sessionid, playerid } = useParams();
  // const [sessionID, setSessionID] = React.useState("");
  const [error, setError] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const [answers, setAnswers] = React.useState([]);
  const [image, setImage] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [questionType, setQuestionType] = React.useState(true);
  const [timeLeft, setTimeLeft] = React.useState(-1);
  const timerInterval = React.useRef(null);
  const serverPollRef = React.useRef(null);
  const [pollServer, setPollServer] = React.useState(true);

  console.log(answers);
  React.useEffect(() => {
    // getQuestion(playerid);
    if (pollServer) {
      serverPollRef.current = setInterval(() => {
        console.log("im polling");
        getQuestion(playerid);
      }, 2000);
    }

    // return () => clearInterval(pollQuestion);
  }, []);

  React.useEffect(() => {
    if (timeLeft >= 0) {
      setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
  }, [timeLeft]);

  async function getQuestion(playerid) {
    const request = await fetch(
      `http://localhost:5543/play/${playerid}/question`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await request.json();
    console.log(request);
    console.log(result);
    if (request.status !== 200) {
      setError(`${result.error}. Please wait until the admin starts the game`);
    } else if (request.status === 200) {
      clearInterval(serverPollRef.current);
      setPollServer(false);
      setQuestion(result.question.question);
      setImage(result.question.image);
      setUrl(result.question.url);

      const answerState = result.question.answers.filter((answer) => {
        return !(answer === 0);
      });
      answerState.forEach((answer) => {
        answer.selected = false;
      });
      setAnswers(answerState);
      setQuestionType(result.question.questionType);

      const gameStartedTime = new Date(
        result.question.isoTimeLastQuestionStarted
      );
      const currentTime = new Date();
      const remainingTime = Math.floor(
        result.question.timeLimit -
          (currentTime.getTime() - gameStartedTime.getTime()) / 1000
      );
      if (remainingTime > 0) {
        console.log(remainingTime);
        setTimeLeft(remainingTime);
        // setTimeout(getAnswer(playerid), 20000);
      }
    }
  }
  async function getAnswer(playerid) {
    const request = await fetch(
      `http://localhost:5543/play/${playerid}/answer`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await request.json();
    console.log(result, "whats good");
    if (request.status !== 200) {
      // setError(`${result.error}. Please wait until the admin starts the game`);
    } else if (request.status === 200) {
    }
  }

  const selectAnswer = (id, questionType) => {
    const selectedAnswerIds = [];

    if (questionType === "single") {
      const answersCopy = answers.map((answer) => {
        if (id === answer.id) {
          answer.selected = answer.selected === true ? false : true;
          if (answer.selected === true) {
            selectedAnswerIds.push(answer.id);
          }
        } else {
          answer.selected = false;
        }

        return answer;
      });
      setAnswers(answersCopy);
      sendPlayerAnswer(playerid, selectedAnswerIds);
    } else {
      const answersCopy = answers.map((answer) => {
        if (id === answer.id) {
          answer.selected = answer.selected === true ? false : true;
        }
        if (answer.selected === true) {
          selectedAnswerIds.push(answer.id);
        }
        return answer;
      });
      setAnswers(answersCopy);
      sendPlayerAnswer(playerid, selectedAnswerIds);
      //see if it actually sends i have no idea
    }
  };

  const timerBegins = () => {
    timerInterval.current = setInterval(() => {
      setTimeLeft((timer) => timeLeft - 1);
    }, 1000);
  };

  const sendPlayerAnswer = async (playerId, answerIds) => {
    const body = { answerIds: answerIds };

    const request = await fetch(
      `http://localhost:5543/play/${playerId}/answer`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const result = await request.json();
    console.log(result);
  };

  if (timeLeft === -1) {
    clearInterval(timerInterval.current);
    setTimeLeft(-2);
    getAnswer(playerid);
    // serverPollRef.current = setInterval(() => {
    //   console.log("im polling");
    //   getQuestion(playerid);
    // }, 2000);
  }
  //supposedly this polling works at the start and afte the timer is up, we need to get the answers though
  return (
    <>
      <Container maxWidth="sm">
        {url && (
          <iframe
            src={url}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        )}
        {image && (
          <img
            className={"image"}
            src={image}
            alt="Supplied image by question"
          ></img>
        )}

        {question && <Typography variant="h5">{question}</Typography>}

        {questionType == "multiple" && (
          <Typography variant="h6">There are multiple answers</Typography>
        )}
        {timeLeft >= 0 && (
          <Box m={3}>
            <Container maxWidth="xl">
              <Typography variant="h6">{timeLeft}</Typography>
            </Container>
          </Box>
        )}

        <Grid container spacing={1}>
          {answers.map((answer) => (
            <Grid item xs={6} key={answer.id}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    selectAnswer(answer.id, questionType);
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">
                      {answer.answer}
                      <Checkbox checked={answer.selected}></Checkbox>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => joinGame(name, sessionid)}
          >
            Submit
          </Button>
        </Box> */}
      </Container>
      {error && <ErrorPopUp setError={setError} error={error}></ErrorPopUp>}
    </>
  );
}

export default JoinGameScreen;

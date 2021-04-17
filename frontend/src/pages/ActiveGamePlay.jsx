import React from "react";

import InputField from "../components/InputField";
import AnswerField from "../components/AnswerField";
import { useHistory, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  Grid,
  Box,
  Button,
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

  React.useEffect(() => {
    // setSessionID(sessionid);
    getQuestion(playerid);
  }, []);

  async function getQuestion(playerid) {
    const request = await fetch(
      `http://localhost:5736/play/${playerid}/question`,
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
      setError(result.error);
    } else if (request.status === 200) {
      setQuestion(result.question.question);
      setImage(result.question.image);
      setUrl(result.question.url);
      setAnswers(
        result.question.answers.filter((answer) => {
          return !(answer === 0);
        })
      );
    }
  }

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
        {image && <image src={image} alt="Supplied image by question"></image>}
        {question && <Typography variant="h5">{question}</Typography>}

        <Grid container spacing={1}>
          {answers.map((answer) => (
            <Grid item xs={6} key={answer.id}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6">{answer.answer}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => joinGame(name, sessionid)}
          >
            Submit
          </Button>
        </Box>
      </Container>
      {error && <ErrorPopUp setError={setError} error={error}></ErrorPopUp>}
    </>
  );
}

export default JoinGameScreen;

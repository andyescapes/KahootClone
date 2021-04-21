import React from "react";

import InputField from "../components/InputField";
import AnswerField from "../components/AnswerField";
import { useHistory, useParams } from "react-router-dom";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Container,
  Grid,
} from "@material-ui/core";
import { getQuizzes } from "../helper/api.js";
import GameCard from "../components/GameCard";

function Results(props) {
  const { gameid, sessionid } = useParams();
  const [results, setResults] = React.useState("");
  const [scores, setScores] = React.useState([]);
  const [gameInfo, setGameInfo] = React.useState([]);

  React.useEffect(() => {
    getOverallResultsAndQuizDetails(props.token, sessionid, gameid);
    //getQuizDetails(props.token, gameid);
  }, []);

  const getQuizDetails = async (token, id) => {
    const request = await fetch(`http://localhost:5543/admin/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await request.json();
    console.log(result);
    setGameInfo(result.questions);
  };

  const getOverallResultsAndQuizDetails = async (token, sessionId, id) => {
    const request = await fetch(
      `http://localhost:5543/admin/session/${sessionId}/results`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await request.json();
    console.log(result);

    const quizRequest = await fetch(`http://localhost:5543/admin/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const quizResult = await quizRequest.json();
    console.log(quizResult);
    setGameInfo(quizResult.questions);

    // if (result.error)
    //   setError("Session is still active, please wait until game is complete");

    if (request.status === 200) {
      // setResults(result.results);
      // console.log(result.results, "myresults");

      const playerScoreInfo = [];
      result.results.map((result, index) => {
        const playerObject = { name: result.name, score: 0 };
        result.answers.map((answer, answerIndex) => {
          if (answer.correct === true) {
            playerObject.score =
              parseInt(playerObject.score, 10) +
              parseInt(quizResult.questions[answerIndex].points, 10);
          }
        });
        playerScoreInfo.push(playerObject);
      });

      setScores(
        playerScoreInfo.sort(
          (a, b) => parseFloat(b.score) - parseFloat(a.score)
        )
      );
      console.log(playerScoreInfo);
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
          <Container>
            <h1>Final Results!</h1>

            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Player</TableCell>
                    <TableCell align="right">Scores</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.map((scoreObject, index) => (
                    <TableRow key={scoreObject.name}>
                      <TableCell component="th" scope="row">
                        {scoreObject.name}
                      </TableCell>
                      <TableCell align="right">{scoreObject.score}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow></TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}

export default Results;

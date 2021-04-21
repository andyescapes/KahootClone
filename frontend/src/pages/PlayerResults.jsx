import React from "react";
import "../App.css";
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
  CardActionArea,
} from "@material-ui/core";
import { getQuizzes } from "../helper/api.js";
import GameCard from "../components/GameCard";
import ErrorPopUp from "../components/ErrorPopUp";

function JoinGameScreen(props) {
  const { playerid } = useParams();
  // const [sessionID, setSessionID] = React.useState("");
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    getResults(playerid);
  }, []);

  async function getResults(playerid) {
    const request = await fetch(
      `http://localhost:5544/play/${playerid}/results`,
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
      setResults(result);
    }
  }

  const getTotalCorrect = (results) => {
    return results.filter((result) => {
      return result.correct === true;
    }).length;
  };

  return (
    <>
      <Container>
        <h1>Your Results!</h1>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell align="right">Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={result.name}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">
                    {result.correct === true ? "✓" : "✕"}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell component="th" scope="row">
                  Total
                </TableCell>
                <TableCell align="right">
                  {getTotalCorrect(results)}/{results.length}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default JoinGameScreen;

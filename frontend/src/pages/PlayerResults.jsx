import React from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Container,
} from '@material-ui/core';

function PlayerResults (props) {
  const { playerid } = useParams();
  // const [sessionID, setSessionID] = React.useState("");
  const [results, setResults] = React.useState([]);

  // getting results first
  React.useEffect(() => {
    getResults(playerid);
  }, []);

  // getting players performance
  async function getResults (playerid) {
    const request = await fetch(
      `http://localhost:5546/play/${playerid}/results`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await request.json();

    if (request.status === 200) {
      setResults(result);
    }
  }

  // calculating the total sum of correct answers
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
                    {result.correct === true ? '✓' : '✕'}
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

export default PlayerResults;

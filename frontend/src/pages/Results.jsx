import React from 'react';
import { useParams } from 'react-router-dom';
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Container,
  Grid,
  Typography,
  Box
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2'
import PropTypes from 'prop-types';

function Results (props) {
  const { gameid, sessionid } = useParams();
  const [scores, setScores] = React.useState([]);
  const [avgResponse, setAvgResponse] = React.useState([]);
  const [chartData, setChartData] = React.useState('');

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  React.useEffect(() => {
    getOverallResultsAndQuizDetails(props.token, sessionid, gameid);
    // getQuizDetails(props.token, gameid);
  }, []);

  const getOverallResultsAndQuizDetails = async (token, sessionId, id) => {
    const request = await fetch(
      `http://localhost:5546/admin/session/${sessionId}/results`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await request.json();

    // getting quiz question information
    const quizRequest = await fetch(`http://localhost:5546/admin/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const quizResult = await quizRequest.json();

    if (request.status === 200) {
      const playerResults = result.results
      const quizQuestions = quizResult.questions

      // calculate players with the highest score
      const playerScoreInfo = [];
      playerResults.forEach((result, index) => {
        const playerObject = { name: result.name, score: 0 };
        result.answers.forEach((answer, answerIndex) => {
          if (answer.correct === true) {
            playerObject.score =
              parseInt(playerObject.score, 10) +
              parseInt(quizQuestions[answerIndex].points, 10);
          }
        });
        playerScoreInfo.push(playerObject);
      });
      // ordering top 5
      playerScoreInfo.sort(
        (a, b) => parseFloat(b.score) - parseFloat(a.score)
      )
      if (playerScoreInfo > 5) {
        const subtract = playerResults.length - 5
        playerScoreInfo.length -= subtract
      }
      setScores(playerScoreInfo);

      // calculate answer percentage for the table
      const averageResponseTimes = new Array(quizQuestions.length).fill(0);
      playerResults.forEach(user => {
        user.answers.forEach((answer, index) => {
          const questionStarted = new Date(answer.questionStartedAt)
          const questionAnswered = new Date(answer.answeredAt)
          // here if players don't answer we assume they took the whole time
          if (!questionAnswered) {
            averageResponseTimes[index] += answer.timeLimit
          } else {
            averageResponseTimes[index] += (questionAnswered.getTime() - questionStarted.getTime()) / 1000
          }
        })
      })

      setAvgResponse(averageResponseTimes.map(response => {
        return (response / result.results.length).toFixed(3)
      }))

      // get data for bar graph, breakdown of percentage of people who got questions right
      const percentageCorrectPerQuestion = new Array(quizQuestions.length).fill(0);

      playerResults.forEach(user => {
        user.answers.forEach((answer, index) => {
          if (answer.correct === true) {
            percentageCorrectPerQuestion[index] += 1
          }
        })
      })
      // setting data for the chart
      setChartData(
        {
          labels: quizQuestions.map((question, index) => {
            return (index + 1)
          }),
          datasets: [
            {
              label: '% of users who answered correctly by question',
              data: percentageCorrectPerQuestion.map(element => {
                return (element / playerResults.length.toFixed(3)) * 100
              }),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }
      )
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
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Container>
            <h1>Final Results!</h1>
            <Typography variant="h6">
              Leaderboard
            </Typography>
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

            <Box mt={2}>
              <Typography variant="h6">
                Average Response Times
              </Typography>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Question</TableCell>
                      <TableCell align="right">Response Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {avgResponse.map((response, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="right">{ isNaN(response) ? 0 : response}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow></TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          <Bar data={chartData} options={options} />
          </Container>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
}
Results.propTypes = {
  token: PropTypes.string
}
export default Results;

import React from 'react';
import '../App.css';
import { useHistory, useParams } from 'react-router-dom';
import {
  Typography,
  Card,
  Grid,
  Box,
  Checkbox,
  CardContent,
  Container,
  CardActionArea,
} from '@material-ui/core';
import SessionModal from '../components/SessionModal';
import ErrorPopUp from '../components/ErrorPopUp';

function ActiveGamePlay (props) {
  const { sessionid, playerid } = useParams();
  const [modalMessage, setModalMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  const [gameFinished, setGameFinished] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [answers, setAnswers] = React.useState([]);
  const [image, setImage] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [questionType, setQuestionType] = React.useState(true);
  const [timeLeft, setTimeLeft] = React.useState(-2);
  const serverPollRef = React.useRef(null);
  const history = useHistory();

  console.log(answers);

  React.useEffect(() => {
    console.log('USE EFFECT ACTIVE');
    serverPollRef.current = setInterval(() => {
      console.log('im polling');
      getQuestion(playerid);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (timeLeft >= -1) {
      setTimeout(() => {
        if (timeLeft === -1) {
          setTimeLeft(-2);
          console.log('what is this1');
          getAnswer(playerid);
          serverPollRef.current = setInterval(() => {
            console.log('second interval active');
            getQuestion(playerid);
          }, 2000);
        }
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
  }, [timeLeft]);

  async function getQuestion (playerid) {
    const request = await fetch(
      `http://localhost:5544/play/${playerid}/question`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await request.json();
    console.log(request);
    console.log(result);
    if (result.error === 'Session ID is not an active session') {
      setGameFinished(true);
      clearInterval(serverPollRef.current);
    } else if (result.error === 'Session has not started yet') {
      setModalMessage("Game hasn't started");
      setError(`${result.error}. Please wait until the admin starts the game`);
    } else if (request.status === 200 && question !== result.question.question) {
      clearInterval(serverPollRef.current);
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
  async function getAnswer (playerid) {
    const request = await fetch(
      `http://localhost:5544/play/${playerid}/answer`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await request.json();
    console.log(result, 'whats good');
    if (request.status !== 200) {
      // setError(`${result.error}. Please wait until the admin starts the game`);
    } else if (request.status === 200) {
      let answerString = 'The answer(s) was ';
      result.answerIds.forEach((answerId, index) => {
        answers.forEach((answerObject) => {
          if (answerId === answerObject.id) {
            if (index === result.answerIds.length - 1) {
              answerString += `${answerObject.answer}`;
            } else {
              answerString += `${answerObject.answer}, `;
            }
          }
        });
      });
      setModalMessage('Times up!');
      setError(answerString);
    }
  }

  const selectAnswer = (id, questionType) => {
    const selectedAnswerIds = [];

    if (questionType === 'single') {
      const answersCopy = answers.map((answer) => {
        if (id === answer.id) {
          answer.selected = answer.selected !== true;
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
          answer.selected = answer.selected !== true;
        }
        if (answer.selected === true) {
          selectedAnswerIds.push(answer.id);
        }
        return answer;
      });
      setAnswers(answersCopy);
      sendPlayerAnswer(playerid, selectedAnswerIds);
      // see if it actually sends i have no idea
    }
  };

  const sendPlayerAnswer = async (playerId, answerIds) => {
    const body = { answerIds: answerIds };
    console.log(body, 'my answers');
    const request = await fetch(
      `http://localhost:5544/play/${playerId}/answer`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const result = await request.json();
    console.log(result);
  };

  // if (timeLeft === -1) {
  //   setTimeLeft(-2);
  //   console.log("what is this1");
  //   // clearInterval(timerInterval.current);
  //   // console.log("what is this2");
  //   getAnswer(playerid);
  //   // serverPollRef.current = setInterval(() => {
  //   //   console.log("second interval active");
  //   //   getQuestion(playerid);
  //   // }, 2000);
  // }
  // supposedly this polling works at the start and afte the timer is up, we need to get the answers though
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
                className={'image'}
                src={image}
                alt="Supplied image by question"
              ></img>
            )}

            {question && <Typography variant="h5">{question}</Typography>}

            {questionType === 'multiple' && (
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
          </Container>
          {error && (
            <ErrorPopUp
              setError={setError}
              error={error}
              title={modalMessage}
            ></ErrorPopUp>
          )}
          {gameFinished && (
            <SessionModal
              setter={setGameFinished}
              message="Game Finished!"
              buttonMessage={'Results'}
              onClickFn={() =>
                history.push(`/play/${sessionid}/${playerid}/results`)
              }
            ></SessionModal>
          )}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}

export default ActiveGamePlay;

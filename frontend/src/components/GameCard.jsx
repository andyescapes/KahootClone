import React from 'react';
import '../App.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ErrorPopUp from '../components/ErrorPopUp';
import SessionModal from '../components/SessionModal';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

function GameCard (props) {
  const history = useHistory();

  const [error, setError] = React.useState(false);
  const [sessionId, setSessionId] = React.useState('');
  const [activeSession, setActiveSession] = React.useState('');
  const [gameStopped, setGameStopped] = React.useState(false);
  const [message, setMessage] = React.useState(false);

  // get the details of a particular quiz
  const getQuizDetails = async (token, id) => {
    const request = await fetch(`http://localhost:5546/admin/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await request.json();
    setSessionId(result.active);
    setActiveSession(true);
  };

  // handle calls fo start, stop and advance
  const gameApiCall = async (token, id, command) => {
    const request = await fetch(
      `http://localhost:5546/admin/quiz/${id}/${command}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await request.json();
    if (result.error) setError(result.error);

    if (request.status === 200) {
      if (command === 'start') {
        getQuizDetails(token, id);
      } else if (command === 'advance') {
        setMessage('The Quiz moved on to the next Question');
      } else {
        setGameStopped(true);
      }
    }
  };

  // error checking to see if a last game exists or not
  const endGameOnClick = () => {
    if (sessionId) {
      history.push(`/results/${props.id}/${sessionId}`);
    } else {
      setMessage('You have not finished a game since you signed in');
    }
  };

  const startGameOnClick = () => {
    navigator.clipboard.writeText(`http://localhost:3000/play/${sessionId}`);
  };

  // slight styled component
  const useStyles = makeStyles((theme) => ({
    root: {
      fontSize: '0.7em',
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Box mt ={1} mb={1}>
      <Card>
        <CardActionArea
          onClick={() =>
            props.dashboard
              ? history.push(`/edit/${props.id}`)
              : history.push(`/edit/${props.id}/${props.questionId}`)
          }
        >
          {props.thumbnail ?? (
            <CardMedia

              component="img"
              height="140"
              image={props.thumbnail}
              title="Contemplative Reptile"
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
              <svg
                onClick={(event) => {
                  event.stopPropagation();
                  if (props.dashboard) {
                    props.delete(
                      props.token,
                      props.id,
                      props.setQuizzes,
                      props.quizzes
                    );
                  } else {
                    props.delete(props.token, props.id, props.questionId);
                  }
                }}
                className="exit"
                height="329pt"
                viewBox="0 0 329.26933 329"
                width="329pt"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Close Card"
              >
                <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
              </svg>
            </Typography>

            {props.details ?? (
              <Typography variant="body2" color="textSecondary" component="p">
                {props.details}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>{' '}
        {props.dashboard && (
          <>
            <CardActions>
              <Button
                className={classes.root}
                size="small"
                color="primary"
                variant="contained"
                onClick={(event) => {
                  event.stopPropagation();
                  gameApiCall(props.token, props.id, 'start');
                }}
                data-test-target="Start"
              >
                Start Game
              </Button>
              <Button
                className={classes.root}
                size="small"
                color="secondary"
                variant="contained"
                onClick={(event) => {
                  event.stopPropagation();
                  gameApiCall(props.token, props.id, 'end');
                }}
                data-test-target="Stop"
              >
                Stop Game
              </Button>{' '}
              <Button
                className={classes.root}
                size="small"
                color="primary"
                variant="contained"
                onClick={(event) => {
                  event.stopPropagation();
                  gameApiCall(props.token, props.id, 'advance');
                }}
              >
                Advance Question
              </Button>
              <Button
                className={classes.root}
                size="small"
                color="primary"
                variant="contained"
                onClick={(event) => {
                  event.stopPropagation();
                  if (sessionId) {
                    history.push(`/results/${props.id}/${sessionId}`);
                  } else {
                    setMessage(
                      'You have not finished a game since you signed in'
                    );
                  }
                }}
              >
                Last Results
              </Button>
            </CardActions>
          </>
        )}
      </Card>
      {error && <ErrorPopUp setError={setError} error={error}></ErrorPopUp>}
      {activeSession && (
        <SessionModal
          setter={setActiveSession}
          data={sessionId}
          message={'New Session Started'}
          buttonMessage={'Copy Link'}
          onClickFn={startGameOnClick}
        ></SessionModal>
      )}
      {gameStopped && (
        <SessionModal
          setter={setGameStopped}
          message={'Would you like to view the results?'}
          buttonMessage={'View Results'}
          onClickFn={endGameOnClick}
        ></SessionModal>
      )}
      {message && (
        <ErrorPopUp title="" setError={setMessage} error={message}></ErrorPopUp>
      )}
      </Box>
    </div>
  );
}

GameCard.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  dashboard: PropTypes.bool,
  questionId: PropTypes.string,
  thumbnail: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  token: PropTypes.string,
  setQuizzes: PropTypes.func,
  details: PropTypes.string,
  title: PropTypes.string,
  delete: PropTypes.func,
  quizzes: PropTypes.array
}

export default GameCard;

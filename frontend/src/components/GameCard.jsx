import React from "react";
import "../App.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ErrorPopUp from "../components/ErrorPopUp";
import SessionModal from "../components/SessionModal";
import { Link, useHistory } from "react-router-dom";

function GameCard(props) {
  const history = useHistory();

  const [error, setError] = React.useState(false);
  const [sessionId, setSessionId] = React.useState("");
  const [activeSession, setActiveSession] = React.useState("");
  const [gameStopped, setGameStopped] = React.useState(false);

  const getQuizDetails = async (token, id) => {
    const request = await fetch(`http://localhost:5543/admin/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await request.json();
    console.log(result);
    setSessionId(result.active);
    setActiveSession(true);
  };

  const gameApiCall = async (token, id, command) => {
    const request = await fetch(
      `http://localhost:5543/admin/quiz/${id}/${command}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await request.json();
    console.log(result);
    if (result.error) setError(result.error);

    if (request.status === 200) {
      console.log("gey");

      if (command === "start") {
        // setActiveSessionPopUp(true);
        getQuizDetails(token, id);
      } else {
        setGameStopped(true);
      }
    }
  };

  const endGameOnClick = () => {
    history.push(`/results/${sessionId}`);
  };

  const startGameOnClick = () => {
    navigator.clipboard.writeText(`http://localhost:3000/play/${sessionId}`);
  };

  return (
    <div>
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
        </CardActionArea>{" "}
        {props.dashboard && (
          <>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                onClick={(event) => {
                  event.stopPropagation();
                  gameApiCall(props.token, props.id, "start");
                }}
              >
                Start Game
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={(event) => {
                  event.stopPropagation();
                  gameApiCall(props.token, props.id, "end");
                }}
              >
                Stop Game
              </Button>{" "}
              <Button
                color="primary"
                variant="contained"
                onClick={(event) => {
                  event.stopPropagation();
                  gameApiCall(props.token, props.id, "advance");
                }}
              >
                Advance Question
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
          message={"New Session Started"}
          buttonMessage={"Copy Link"}
          onClickFn={startGameOnClick}
        ></SessionModal>
      )}
      {gameStopped && (
        <SessionModal
          setter={setGameStopped}
          message={"Would you like to view the results?"}
          buttonMessage={"View Results"}
          onClickFn={endGameOnClick}
        ></SessionModal>
      )}
    </div>
  );
}

export default GameCard;

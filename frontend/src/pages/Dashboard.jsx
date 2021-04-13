import React from "react";
import InputField from ".././components/InputField";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { newQuiz, getQuizzes } from "../helper/api.js";
import GameCard from "../components/GameCard";

function Dashboard(props) {
  const [quizName, setQuizName] = React.useState("");
  const history = useHistory();
  const [quizzes, setQuizzes] = React.useState([]);

  React.useEffect(() => {
    getQuizzes(props.token, setQuizzes);
  }, []);

  return (
    <>
      {quizzes.map((quiz) => (
        <GameCard
          title={quiz.name}
          key={quiz.id}
          id={quiz.id}
          thumbnail={quiz.thumbnail}
          token={props.token}
        ></GameCard>
      ))}
      <InputField
        field="Insert new quiz name"
        setState={setQuizName}
        state={quizName}
      ></InputField>
      <Button
        variant="contained"
        color="primary"
        onClick={() => newQuiz(props.token, quizName)}
      >
        Create New Game
      </Button>
    </>
  );
}

export default Dashboard;

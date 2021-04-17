import React from "react";
import InputField from "../components/InputField";
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

  const addNewQuiz = (token, quizName, setQuizzes) => {
    newQuiz(token, quizName);
    getQuizzes(token, setQuizzes);
  };

  const deleteQuiz = async (token, id, setQuizzes, quizzes) => {
    const request = await fetch(`http://localhost:5736/admin/quiz/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await request.json();
    console.log(result, "done bro");
    if (request.status == "200") {
      setQuizzes(
        quizzes.filter((quiz) => {
          return !(quiz.id === id);
        })
      );
    }
  };

  return (
    <>
      {quizzes.map((quiz) => (
        <GameCard
          title={quiz.name}
          key={quiz.id}
          id={quiz.id}
          thumbnail={quiz.thumbnail}
          token={props.token}
          delete={deleteQuiz}
          setQuizzes={setQuizzes}
          quizzes={quizzes}
          dashboard={true}
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
        onClick={() => addNewQuiz(props.token, quizName, setQuizzes)}
      >
        Create New Game
      </Button>
    </>
  );
}

export default Dashboard;

import React from 'react';
import InputField from '../components/InputField';
import { Button, Grid, Box } from '@material-ui/core';
import { newQuiz, getQuizzes } from '../helper/api.js';
import GameCard from '../components/GameCard';
import PropTypes from 'prop-types';

function Dashboard (props) {
  const [quizName, setQuizName] = React.useState('');
  const [quizzes, setQuizzes] = React.useState([]);

  React.useEffect(() => {
    getQuizzes(props.token, setQuizzes);

    return () => {
      setQuizzes('')
    }
  }, []);

  // add a new quiz
  const addNewQuiz = (token, quizName, setQuizzes) => {
    newQuiz(token, quizName);
    getQuizzes(token, setQuizzes);
  };

  // delete an existing quiz
  const deleteQuiz = async (token, id, setQuizzes, quizzes) => {
    const request = await fetch(`http://localhost:5546/admin/quiz/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (request.status === 200) {
      setQuizzes(
        quizzes.filter((quiz) => {
          return !(quiz.id === id);
        })
      );
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
          <Box mt={3}>
            <Button
              className="buttonMargin"
              variant="contained"
              color="primary"
              onClick={() => addNewQuiz(props.token, quizName, setQuizzes)}
              data-test-target="Dashboard"
            >
              Create New Game
            </Button>
          </Box>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
}
Dashboard.propTypes = {
  token: PropTypes.string,
}

export default Dashboard;

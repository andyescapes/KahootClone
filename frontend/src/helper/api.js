// getting all existing quizzes/games
export const getQuizzes = async (token, setQuizzes) => {
  const request = await fetch('http://localhost:5546/admin/quiz', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await request.json();
  if (request.status === 200 && setQuizzes) {
    setQuizzes(result.quizzes);
  }
};

// adding a quiz
export const newQuiz = async (token, name) => {
  const body = {
    name: name,
  };

  const request = await fetch('http://localhost:5546/admin/quiz/new', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  console.log(request)
};

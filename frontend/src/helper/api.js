export const getQuizzes = async (token, setQuizzes) => {
  const request = await fetch("http://localhost:5736/admin/quiz", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const result = await request.json();
  console.log(result);
  if (request.status == "200" && setQuizzes) {
    setQuizzes(result.quizzes);
  }
};

export const newQuiz = async (token, name) => {
  const body = {
    name: name,
  };

  const request = await fetch("http://localhost:5736/admin/quiz/new", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await request.json();
  console.log(result, "new quiz");
};

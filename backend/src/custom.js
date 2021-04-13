/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
// question = {
//   questionType: "multi",
//   question: "what is a dog",
//   timeLimit: 10,
//   points: 4,
//   image: "asdfasdf",
//   url: "www.asdfasdf",
//   answers: [{ id: "asdfasdf", answer: "doge" }],
//   correctAnswers: [123, 43, 122],
// };

export const quizQuestionPublicReturn = (question) => {
  console.log("See question: ", question);
  return question.correctAnswer;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = (question) => {
  return question.correctAnswers; // For a single answer
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = (question) => {
  const answers = [];
  question.answers.forEach((answer) => {
    answers.push(answer.id);
  });
  return answers;
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = (question) => {
  return question.timeLimit;
};

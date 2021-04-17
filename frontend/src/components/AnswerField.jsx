import React from "react";
import TextField from "@material-ui/core/TextField";

function AnswerField(props) {
  const { randomBytes } = require("crypto");

  const newId = () => {
    return randomBytes(16).toString("hex");
  };

  const setAnswersState = (answers, setAnswers, newAnswer, num) => {
    const inputAnswer = { id: newId(), answer: newAnswer, correct: false };
    answers[parseInt(num, 10)] = inputAnswer;
    setAnswers(answers);
  };

  return (
    <>
      <TextField
        onChange={(e) =>
          setAnswersState(
            props.answers,
            props.setAnswers,
            e.target.value,
            props.num
          )
        }
        label={props.field}
      />
      {/* <input 
        type = {props.type ?? "text"}
        onChange = {e=> props.setState(e.target.value)
        }>
      </input> */}
    </>
  );
}

export default AnswerField;

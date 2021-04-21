import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

function AnswerField (props) {
  const { randomBytes } = require('crypto');

  const newId = () => {
    return randomBytes(16).toString('hex');
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

AnswerField.propTypes = {
  answers: PropTypes.array,
  setAnswers: PropTypes.func,
  num: PropTypes.number,
  field: PropTypes.string
}
export default AnswerField;

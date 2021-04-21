import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

function InputField (props) {
  return (
    <div>
      <TextField
        onChange={(e) => props.setState(e.target.value)}
        label={props.field}
        value={props.state}
        type={props.type ?? 'text'}
        name={props.field}
      />
      {/* <input
        type = {props.type ?? "text"}
        onChange = {e=> props.setState(e.target.value)
        }>
      </input> */}
    </div>
  );
}
InputField.propTypes = {
  state: PropTypes.string,
  type: PropTypes.string,
  setState: PropTypes.func,
  field: PropTypes.string
}
export default InputField;

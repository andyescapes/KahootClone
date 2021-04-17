import React from "react";
import TextField from "@material-ui/core/TextField";

function InputField(props) {
  return (
    <div>
      <TextField
        onChange={(e) => props.setState(e.target.value)}
        label={props.field}
        value={props.state}
      />
      {/* <input 
        type = {props.type ?? "text"}
        onChange = {e=> props.setState(e.target.value)
        }>
      </input> */}
    </div>
  );
}

export default InputField;

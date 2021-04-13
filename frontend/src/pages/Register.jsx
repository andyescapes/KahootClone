import React from "react";
import InputField from ".././components/InputField";
import { Button, Typography, Container, Box } from "@material-ui/core";

function App(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const registerUser = (inputEmail, inputPassword, inputName) => {
    const body = {
      email: inputEmail,
      password: inputPassword,
      name: inputName,
    };
    async function logInRequest(body) {
      const result = await fetch("http://localhost:5111/admin/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const tokenObject = await result.json();
      console.log(tokenObject);
      props.setToken(tokenObject.token);
    }
    logInRequest(body);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Register Now!
        </Typography>
        <InputField field="Name" setState={setName}></InputField>
        <InputField field="Email" setState={setEmail}></InputField>
        <InputField
          field="Password"
          type="password"
          setState={setPassword}
        ></InputField>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => registerUser(email, password, name)}
          >
            Register
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default App;

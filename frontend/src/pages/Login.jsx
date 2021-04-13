import React from "react";
import InputField from ".././components/InputField";
import { Button, Typography, Container, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  console.log(email);
  console.log(password);

  const logIn = (inputEmail, inputPassword) => {
    const body = {
      email: inputEmail,
      password: inputPassword,
    };

    async function logInRequest(body) {
      const result = await fetch("http://localhost:5111/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const tokenObject = await result.json();
      console.log(tokenObject);
      props.setToken(tokenObject.token);
      if (result.status == "200") {
        history.push("/dashboard");
        props.setIsLoggedIn(true);
      }
    }

    logInRequest(body);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Sign in
        </Typography>
        <InputField
          field="Email"
          setState={setEmail}
          state={email}
        ></InputField>
        <InputField
          field="Password"
          setState={setPassword}
          state={password}
          type="password"
        ></InputField>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => logIn(email, password)}
          >
            Log in!
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Login;

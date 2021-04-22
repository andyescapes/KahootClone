import React from 'react';
import InputField from '.././components/InputField';
import { Button, Typography, Container, Box, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Login (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  // allowing a user to log in
  const logIn = (inputEmail, inputPassword) => {
    const body = {
      email: inputEmail,
      password: inputPassword,
    };

    async function logInRequest (body) {
      const result = await fetch('http://localhost:5546/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const tokenObject = await result.json();
      props.setToken(tokenObject.token);
      if (result.status === 200) {
        // storing token
        props.setIsLoggedIn(true);
        history.push('/dashboard');
      }
    }

    logInRequest(body);
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
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
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
              <div className="buttonStyle">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => logIn(email, password)}
                >
                  Log in
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push('/register');
                  }}
                >
                  Register
                </Button>
              </div>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}
Login.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func,
  Dashboard: PropTypes.bool,
  setIsLoggedIn: PropTypes.func
}
export default Login;

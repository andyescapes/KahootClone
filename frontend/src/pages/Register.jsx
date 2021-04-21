import React from 'react';
import InputField from '.././components/InputField';
import { Button, Typography, Container, Box, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Register (props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  const registerUser = (inputEmail, inputPassword, inputName) => {
    const body = {
      email: inputEmail,
      password: inputPassword,
      name: inputName,
    };
    async function logInRequest (body) {
      const result = await fetch('http://localhost:5544/admin/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const tokenObject = await result.json();
      console.log(tokenObject);
      props.setToken(tokenObject.token);
      if (result.status === 200) {
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
              Register Now!
            </Typography>
            <InputField field="Name" setState={setName}></InputField>
            <InputField field="Email" setState={setEmail}></InputField>
            <InputField
              field="Password"
              type="password"
              setState={setPassword}
            ></InputField>
            <Box mt={3}>
              <div className="buttonStyle">
                <Button
                  name ="register"
                  variant="contained"
                  color="primary"
                  onClick={() => registerUser(email, password, name)}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push('/login')}
                >
                  Back
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
Register.propTypes = {
  setToken: PropTypes.func,
}
export default Register;

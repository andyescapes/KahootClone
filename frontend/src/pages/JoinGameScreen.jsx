import React from 'react';
import InputField from '../components/InputField';
import { useHistory, useParams } from 'react-router-dom';
import {
  Typography,
  Grid,
  Box,
  Button,
  Container,
} from '@material-ui/core';
import ErrorPopUp from '../components/ErrorPopUp';

function JoinGameScreen (props) {
  const { sessionid } = useParams();
  const [name, setName] = React.useState('');
  const [sessionID, setSessionID] = React.useState('');
  const [error, setError] = React.useState(false);
  const history = useHistory();
  React.useEffect(() => {
    setSessionID(sessionid);
  }, []);

  // allow a player to join a game
  async function joinGame (name, sessionid) {
    const body = {
      name: name,
    };
    const request = await fetch(
      `http://localhost:5546/play/join/${sessionid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const result = await request.json();
    if (request.status !== 200) {
      setError(result.error);
    } else if (request.status === 200) {
      history.push(`/play/${sessionid}/${result.playerId}`);
    }
  }

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
        <Grid item xs={10}>
          <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
              Join the Session!
            </Typography>
            <InputField
              field="Session ID"
              state={sessionID}
              setState={setSessionID}
            ></InputField>
            <InputField
              field="Name"
              setState={setName}
              state={name}
            ></InputField>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => joinGame(name, sessionid)}
              >
                Join!
              </Button>
            </Box>
          </Container>
          {error ?? (
            <ErrorPopUp setError={setError} errorr={error}></ErrorPopUp>
          )}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}

export default JoinGameScreen;

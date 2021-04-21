import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

function NavBar (props) {
  const history = useHistory();

  const logOut = async (token) => {
    const request = await fetch('http://localhost:5544/admin/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await request.json();
    console.log(result, 'hahahaS');
    if (request.status === 200) history.push('/login');
  };

  const homeLink = (e) => {
    history.push('/dashboard');
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Button color="inherit" onClick={homeLink}>
          Home
        </Button>
        <Button color="inherit" edge="end" onClick={() => logOut(props.token)}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  token: PropTypes.string
}
export default NavBar;

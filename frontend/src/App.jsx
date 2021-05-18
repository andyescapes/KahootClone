import React from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EditGame from './pages/EditGame';
import NavBar from './components/NavBar';
import EditQuestion from './pages/EditQuestion';
import JoinGameScreen from './pages/JoinGameScreen';
import Results from './pages/Results';
import ActiveGamePlay from './pages/ActiveGamePlay';
import PlayerResults from './pages/PlayerResults';

import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';

function App () {
  const [token, setToken] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  console.log(token);
  return (
    <>
      <Switch>
        <Route path="/login">
          <Login setToken={setToken} setIsLoggedIn={setIsLoggedIn}></Login>
        </Route>
        <Route path="/register">
          <Register
            setToken={setToken}
            setIsLoggedIn={setIsLoggedIn}
          ></Register>
        </Route>
        <Route path="/dashboard">
          {/* {isLoggedIn ?  <><NavBar token={token}></NavBar>
          <Dashboard token={token}></Dashboard></> : <Redirect to="/login" />} */}
          {!isLoggedIn && <Redirect to="/login" />}
          <>
            <NavBar token={token} setIsLoggedIn={setIsLoggedIn}></NavBar>
            <Dashboard token={token}></Dashboard>
          </>
        </Route>
        <Route exact path="/edit/:gameid">
          {!isLoggedIn && <Redirect to="/login" />}
          <NavBar token={token} setIsLoggedIn={setIsLoggedIn}></NavBar>
          <EditGame token={token}></EditGame>
        </Route>
        <Route exact path="/edit/:gameid/:questionid">
          {!isLoggedIn && <Redirect to="/login" />}
          <NavBar token={token} setIsLoggedIn={setIsLoggedIn}></NavBar>
          <EditQuestion token={token}></EditQuestion>
        </Route>
        <Route exact path="/results/:gameid/:sessionid">
          {!isLoggedIn && <Redirect to="/login" />}
          <NavBar token={token} setIsLoggedIn={setIsLoggedIn}></NavBar>
          <Results token={token}></Results>
        </Route>
        <Route exact path="/play/:sessionid">
          <NavBar token={token} setIsLoggedIn={setIsLoggedIn}></NavBar>
          <JoinGameScreen token={token}></JoinGameScreen>
        </Route>
        <Route exact path="/play/:sessionid/:playerid">
          <NavBar token={token} setIsLoggedIn={setIsLoggedIn}></NavBar>
          <ActiveGamePlay token={token}></ActiveGamePlay>
        </Route>
        <Route exact path="/play/:sessionid/:playerid/results">
          <NavBar token={token} setIsLoggedIn={setIsLoggedIn}></NavBar>
          <PlayerResults token={token}></PlayerResults>
        </Route>

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </>
  );
}

export default App;

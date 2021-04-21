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

import {
  useHistory,
  BrowserRouter as Switch,
  Route,
  Redirect,
} from 'react-router-dom';

function App () {
  const [token, setToken] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const checkLoggedIn = () => {
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }
  };

  console.log(token);
  return (
    <>
      <Switch>
        <Route path="/login">
          <Login setToken={setToken} setIsLoggedIn={setIsLoggedIn}></Login>
        </Route>
        <Route path="/register">
          <Register setToken={setToken}></Register>
        </Route>
        <Route path="/dashboard">
          <NavBar token={token}></NavBar>
          <Dashboard token={token}></Dashboard>
        </Route>
        <Route exact path="/edit/:gameid">
          <NavBar token={token}></NavBar>
          <EditGame token={token}></EditGame>
        </Route>
        <Route exact path="/edit/:gameid/:questionid">
          <NavBar token={token}></NavBar>
          <EditQuestion token={token}></EditQuestion>
        </Route>
        <Route exact path="/results/:gameid/:sessionid">
          <NavBar token={token}></NavBar>
          <Results token={token}></Results>
        </Route>
        <Route exact path="/play/:sessionid">
          <NavBar token={token}></NavBar>
          <JoinGameScreen token={token}></JoinGameScreen>
        </Route>
        <Route exact path="/play/:sessionid/:playerid">
          <NavBar token={token}></NavBar>
          <ActiveGamePlay token={token}></ActiveGamePlay>
        </Route>
        <Route exact path="/play/:sessionid/:playerid/results">
          <NavBar token={token}></NavBar>
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

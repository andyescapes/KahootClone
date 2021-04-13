import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditGame from "./pages/EditGame";
import NavBar from "./components/NavBar";
import {
  useHistory,
  BrowserRouter as Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [token, setToken] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const history = useHistory();

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
          {/* {checkLoggedIn()} */}
          <NavBar></NavBar>
          <Dashboard token={token}></Dashboard>
        </Route>
        <Route path="/edit/:gameid">
          <NavBar></NavBar>
          <EditGame token={token}></EditGame>
        </Route>

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </>
  );
}

export default App;

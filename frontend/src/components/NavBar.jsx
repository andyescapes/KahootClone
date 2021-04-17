import React from "react";
import InputField from ".././components/InputField";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { newQuiz, getQuizzes } from "../helper/api.js";
import GameCard from "../components/GameCard";

function NavBar(props) {
  const history = useHistory();

  const logOut = async (token) => {
    const request = await fetch("http://localhost:5736/admin/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await request.json();
    console.log(result, "hahahaS");
    if (request.status == "200") history.push("/login");
  };

  const homeLink = (e) => {
    history.push("/dashboard");
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

export default NavBar;

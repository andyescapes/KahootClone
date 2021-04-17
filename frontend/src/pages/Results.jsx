import React from "react";

import InputField from "../components/InputField";
import AnswerField from "../components/AnswerField";
import { useHistory, useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  Drawer,
} from "@material-ui/core";
import { getQuizzes } from "../helper/api.js";
import GameCard from "../components/GameCard";

function Results(props) {
  const { gameid } = useParams();
  return (
    <>
      <h1>lolol</h1>
    </>
  );
}

export default Results;

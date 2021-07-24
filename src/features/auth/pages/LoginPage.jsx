import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },

  box: {
    padding: theme.spacing(2),
  },
}));

function LoginPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const isLogging = useSelector(state => state.auth.logging)

  const handlerLoginClick = () => {
    // TODO: Get username + password from login form
    dispatch(authActions.login({
      username: '',
      password: ''
    }))
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box marginTop={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handlerLoginClick}>
            {isLogging && <CircularProgress size={20} color='secondary' />} &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

export default LoginPage;

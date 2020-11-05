import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
  },
}));

export default ({ children, ...props }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            OMDB
          </Typography>
          <Button
            color="inherit"
            onClick={() => history.push("/")}
          >
            Home
          </Button>
          <Button color="inherit" onClick={() => history.push("/recently-viewed")}>Recently Viewed</Button>
          <Button color="inherit" onClick={() => history.push("/watch-list")}>Watch List</Button>
       
        </Toolbar>
      </AppBar>
      <Grid container className={classes.container}>
        {children}
      </Grid>
    </div>
  );
};
import React from 'react';
import { Grid } from '@material-ui/core';


const Dashboard = props => {
 

  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
          
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;

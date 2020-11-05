import React from 'react';
import { Grid } from '@material-ui/core';
import Template from '../../template';

const Dashboard = props => {
 

  return (
    <React.Fragment>
      <Template>
        <h1>WatchList</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
            </Grid>
          </Grid>
        </Grid>
      </Template>
    </React.Fragment>
  );
};

export default Dashboard;

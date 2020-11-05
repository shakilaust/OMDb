import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Template from '../../template';
import { getFetch, postFetch } from '../../actions';
import CardView from '../CardView'; 
import { makeStyles } from '@material-ui/core/styles';
import {VISITOR_WATCH_LIST_UPDATE_URL} from '../../urls';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    justifyContent: 'right',
    paddingLeft: 600
  },
  
}));


const MoviePage = props => {
    
  const { type, id} = props.match.params;
  const [ itemInfo, setItemInfo ] = useState(null);
  const classes = useStyles();
  const [sendRequest, setSendRequest] = useState(true);
  const updateRecentWatchList = () => {
    const username = localStorage.getItem('username');
    const postData = {
      'username': username,
      'imdb_id': id
    };
    postFetch(VISITOR_WATCH_LIST_UPDATE_URL, postData).then(response => {
      console.log('got', response);
    });
  }
  useEffect(() => {
    if(sendRequest) {
      setSendRequest(false);
      let url =  `http://www.omdbapi.com/?apikey=200273d1&type=${type}&i=${id}`;
      getFetch(url).then(response => {
        setItemInfo(response);
        console.log('get fetch');
        updateRecentWatchList();
      });
    }

  },[sendRequest]);

  return (
    <React.Fragment>
      <Template>
        <h1>Review Page</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <div className={classes.root}>
                <CardView intemInfo={itemInfo} showLink={false}/>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Template>
    </React.Fragment>
  );
};

export default MoviePage;

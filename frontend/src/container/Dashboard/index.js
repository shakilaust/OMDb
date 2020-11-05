import React , {useState } from 'react';
import { Grid } from '@material-ui/core';
import Template from '../../template';
import SearchView from './SearchView';
import CardView from '../CardView';
import { OMDBAPI_URL_PREFIX } from '../../urls';
import { getFetch } from '../../actions';
const Dashboard = props => {
  
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchAndFilter = params => {
    let url= `http://www.omdbapi.com/?apikey=200273d1&` ; // process.env not working
    if(params.searchKeyword) url += "s="+params.searchKeyword;
    if(params.type) url += "&type="+params.type;
    getFetch(url).then(response => {
        setSearchResults(response && response.Search);

    });
  };

  return (
    <React.Fragment>
      <Template>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <SearchView onClickSearch={handleSearchAndFilter}/>
            </Grid>
          </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
          {searchResults && searchResults.map((info, indx) => (
            <Grid item xs={3} key={indx}>
              <CardView intemInfo={info}/>
            </Grid>
          ))}
          </Grid>
        </Grid>

        </Grid>
      </Template>
    </React.Fragment>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { TextField, InputAdornment, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';


const useStyles = makeStyles((theme) => ({
}));


const TYPE_OPTIONS = [
  { label: 'Movie', value: 'movie' },
  { label: 'Series', value: 'series' },
  { label: 'Episode', value: 'episode' }
];


const SearchAndFilterView = props => {
  const {onClickSearch = () => {}} = props;
  const classes = useStyles();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [type, setType] = useState();


  const handleOnClickSearch = () => {
    onClickSearch({
      searchKeyword,
      type: type ? type.value : null,
      
    });
  };

  const handleOnClickClear = () => {
    setSearchKeyword("");
    setType(null);
    onClickSearch({});
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={6}>
              <TextField
                className={classes.margin}
                id="input-with-icon-textfield"
                label="TextField"
                variant="outlined"
                fullWidth
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                value={type}
                options={TYPE_OPTIONS}
                onChange={(val, _) => setType(val)}
                placeholder="Select Type"
              />
            </Grid>
          
            <Grid item xs={1}>
              <Button
                data-testid="submit"
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleOnClickSearch}
              >
                  Search
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                data-testid="submit"
                type="submit"
                variant="contained"
                color="secondary"
                onClick={handleOnClickClear}
              >
                  Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>



    </React.Fragment>
  );
};

export default SearchAndFilterView;
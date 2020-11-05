import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {postFetch} from '../actions';
import {VISITOR_USER_NAME_CREATE_URL} from '../urls';


import DialogTitle from '@material-ui/core/DialogTitle';

  
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    statusContainerHeader: {
        padding: theme.spacing(1)
        },
    total: {
    background: '#E2E2E2'
    },
    closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
    },
    saveButton: {
    position: 'absolute',
    right: theme.spacing(1),
    buttom: theme.spacing(1),
    color: 'red'
    }
}));


const UserNameModal = props => {
    
   const {showModal, setShowModal, history} = props;
   const [errors, setErrors] = useState([]);
   const [username, setUsername] = useState('');
     const onSubmitAction = () => {
      const url = VISITOR_USER_NAME_CREATE_URL;
      const postData = {
          'username': username
      }
      postFetch( url, postData ).then(res => {
          localStorage.setItem('username', res.username);
          console.log('fromlocalStorage', localStorage.getItem('username') );
         // setShowModal(false);
          history.push('/');
          //console.log('res', res, 'username', res.username);
      })
   }

   const handleDialogClose = () => {
       setShowModal(false);
   }
  return (
    <React.Fragment>
       
       <Dialog
        open={showModal}
        keepMounted
        onClose={handleDialogClose}
        fullWidth={true}
        maxWidth={'sm'}
        disableBackdropClick={true}
      >
        <DialogTitle id="customized-dialog-title">
          Please Enter your preferable username
        </DialogTitle>
        <DialogContent>
            <Grid item xs={12}>
                <TextField
                data-testid="username-field"
                id="username-field"
                label="username"
                type="text"
                value={username}
                defaultValue={username}
                variant="outlined"
                onChange={event => setUsername(event.target.value)}
                required
                fullWidth
                margin="dense"
                name="username"
                error={errors ? true : false}
                helperText={errors}
                />
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmitAction} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default UserNameModal;

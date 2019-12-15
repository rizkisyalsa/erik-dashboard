import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import SnackbarComponent from '../../components/Snackbar/SnackbarComponent';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import _ from 'underscore';

// Material helpers
import { withStyles } from '@material-ui/core/styles/index';

// Material components
import Grid from '@material-ui/core/Grid/index';
import Button from '@material-ui/core/Button/index';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import TextField from '@material-ui/core/TextField/index';
import Typography from '@material-ui/core/Typography/index';

// Component styles
import styles from './styles';

const SignIn = props => {
  const authContext = useContext(AuthContext);
  const { token, login, error, clearErrors, isAuthenticated } = authContext;

  const [state, setState] = useState({
    values: {
      username: '',
      password: ''
    },
    touched: {
      username: false,
      password: false
    },
    errors: {
      username: null,
      password: null
    },
    isValid: false,
    isLoading: false,
    submitError: null
  });

  const [snackbarAdd, setSnackbarAdd] = useState({
    open: false,
    message: '',
    variant: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Incorrect username or password') {
      setSnackbarAdd({
        open: true,
        message: 'Username atau password yang anda masukan salah',
        variant: 'error'
      });
      setState({...state,
        isLoading: false,
        serviceError: error
      });
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  useEffect(() => {
    if (token) {
      props.history.push('/');
    }
    //eslint-disable-next-line
  }, []);

  // const validateForm = _.debounce(() => {
  //   const { values } = state;

  //   const newState = { ...state };
  //   const errors = validate(values, schema);

  //   newState.errors = errors || {};
  //   newState.isValid = errors ? false : true;

  //   setState(newState);
  // }, 300);

  const handleFieldChange = (field, value) => {
    const newState = { ...state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    setState(newState);
  };


  const handleSignIn = (e) => {
    e.preventDefault()
    const { values } = state;

    setState({...state, isLoading: true });
    login(values);
    // history.push('/dashboard');
    // if error
    // this.setState({
    //   isLoading: false,
    //   serviceError: error
    // });
  };

  const handleCloseSnackbarAdd = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarAdd({
      open: false,
      message: '',
      variant: ''
    });
  };

  const { classes } = props;
  const { values, touched, errors, isValid, submitError, isLoading } = state;

  const showUsernameError = touched.username && errors.username;
  const showPasswordError = touched.password && errors.password;

  return (
    <div className={classes.root}>
      {snackbarAdd.open && (
        <SnackbarComponent
          handleClose={handleCloseSnackbarAdd}
          message={snackbarAdd.message}
          open={snackbarAdd.open}
          variant={snackbarAdd.variant}
        />
      )}
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteWrapper}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div
              className={classes.quoteInner}
              style={{ backgroundColor: 'rgba(0,0,0,.4)', padding: '20px' }}
            >
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                PT PANCAMITRA PACKINDO
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Sistem informasi
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Pengelolaan dan laporan produksi
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn}>
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Sistem informasi <br />
                  Pengelolaan dan Laporan Produksi
                </Typography>
                <div className={classes.fields}>
                  <TextField
                    className={classes.textField}
                    label="Username"
                    name="username"
                    onChange={event =>
                      handleFieldChange('username', event.target.value)
                    }
                    type="text"
                    value={values.username}
                    variant="outlined"
                  />
                  {showUsernameError && (
                    <Typography
                      className={classes.fieldError}
                      variant="body2"
                    >
                      {errors.username[0]}
                    </Typography>
                  )}
                  <TextField
                    className={classes.textField}
                    label="Password"
                    name="password"
                    onChange={event =>
                      handleFieldChange('password', event.target.value)
                    }
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  {showPasswordError && (
                    <Typography
                      className={classes.fieldError}
                      variant="body2"
                    >
                      {errors.password[0]}
                    </Typography>
                  )}
                </div>
                {submitError && (
                  <Typography
                    className={classes.submitError}
                    variant="body2"
                  >
                    {submitError}
                  </Typography>
                )}
                {isLoading ? (
                  <CircularProgress className={classes.progress} />
                ) : (
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    size="large"
                    type='submit'
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                )}
                <Typography
                  className={classes.signUp}
                  variant="body1"
                >
                  Don't have an account? Please contact Admin
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(SignIn);

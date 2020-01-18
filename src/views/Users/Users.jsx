import React, { useEffect, useState } from 'react';
import axios from 'axios';

import DashboardLayout from 'layouts/Dashboard';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import SnackbarComponent from '../../components/Snackbar/SnackbarComponent'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  },
  table: {},
  avatar: {
    backgroundColor: theme.palette.primary.main,
    display: 'inline-flex',
    fontSize: '14px',
    fontWeight: 500,
    height: '36px',
    width: '36px'
  },
  nameText: {
    display: 'inline-block',
    marginLeft: theme.spacing.unit * 2,
    fontWeight: 500,
    cursor: 'pointer'
  },
  tableCellInner: {
    display: 'flex',
    alignItems: 'center'
  },
  tableCell: {
    whiteSpace: 'nowrap'
  },
  field: {
    margin: theme.spacing.unit * 3
  },
  textField: {
    width: '420px',
    maxWidth: '100%',
    marginRight: theme.spacing.unit * 3
  },
  button: {
    marginLeft: '20px',
    marginBottom: '20px'
  }
});

const Users = props => {

  useEffect(() => {
    getUser();
  }, []);

  const [snackbarAdd, setSnackbarAdd] = useState({
    open: false,
    message: '',
    variant: ''
 })
 const handleCloseSnackbarAdd = (event, reason) => {
    if (reason === 'clickaway') {
       return;
    }
    setSnackbarAdd({
       open: false,
       message: '',
       variant: ''
    })
 }

  const [users, setUsers] = useState();
  const [state, setState] = useState({
    username: '',
    password: '',
    name: '',
    role: 'Marketing'
  });

  const getUser = async () => {
    try {
      const result = await axios.get('http://localhost:8001/api/user');
      setUsers(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const result = await axios.post(
        'http://localhost:8001/api/user/register',
        state,
        config
      );
      if(result.data.msg === "Username already exists"){
        setSnackbarAdd({
          open: true,
          message: "username sudah ada, silahkan masukan username baru",
          variant: 'error'
       })
        return
      }
      getUser()
      setSnackbarAdd({
        open: true,
        message: 'User berhasil ditambahkan',
        variant: 'success'
     })
      setState({
        username: '',
        password: '',
        name: '',
        role: 'Marketing'
      })
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete ID '+id+'?')){
      try {
        await axios.delete(`http://localhost:8001/api/user/${id}`);
        setSnackbarAdd({
          open: true,
          message: 'User berhasil dihapus',
          variant: 'success'
       })
       getUser()
      } catch (err) {
        console.log(err)
      }
    }}

  const { classes } = props;
  return (
    <DashboardLayout title="Users">
      {snackbarAdd.open &&
               <SnackbarComponent
                  open={snackbarAdd.open}
                  handleClose={handleCloseSnackbarAdd}
                  variant={snackbarAdd.variant}
                  message={snackbarAdd.message}
               />
            }

      <div className={classes.root}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={7}
            md={7}
          >
            <TableContainer component={Paper}>
              <Table
                aria-label="simple table"
                className={classes.table}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Username</TableCell>
                    <TableCell align="right">id</TableCell>
                    <TableCell align="right">Role</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users &&
                    users.map(user => (
                      <TableRow key={user.username}>
                        <TableCell className={classes.tableCell}>
                          <div className={classes.tableCellInner}>
                            <Avatar
                              className={classes.avatar}
                              src={
                                'http://localhost:8001/foto/' + user.foto
                              }
                            />
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {user.name}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell align="right">{user.username}</TableCell>
                        <TableCell align="right">{user.id}</TableCell>
                        <TableCell align="right">{user.role}</TableCell>
                        <TableCell align="right">
                          <IconButton color="secondary" aria-label="delete" className={classes.margin} onClick={()=>handleDelete(user.id)}>
                            <DeleteIcon fontSize="small" />                    
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            item
            lg={5}
            md={5}
          >
            <Paper>
              <form
                autoComplete="off"
                noValidate
                onSubmit={handleAdd}
                style={{ padding: '1px 0' }}
              >
                <div
                  className={classes.field}
                  style={{ textAlign: 'center' }}
                >
                  <h3 style={{ marginBottom: '10px' }}>Add User</h3>
                  <TextField
                    className={classes.textField}
                    label="Username"
                    margin="dense"
                    name="username"
                    onChange={handleChange}
                    required
                    value={state.username}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    label="Password"
                    margin="dense"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    required
                    value={state.password}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    label="Name"
                    margin="dense"
                    name="name"
                    onChange={handleChange}
                    required
                    value={state.name}
                    variant="outlined"
                  />
                  <div style={{ marginTop: '10px' }}>
                    <TextField
                      className={classes.textField}
                      label="Select Role"
                      margin="dense"
                      name="role"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{
                        native: true
                      }}
                      value={state.role}
                      variant="outlined">
                      <option
                        key="1"
                        value="Marketing"
                      >
                        Marketing
                      </option>
                      <option
                        key="2"
                        value="Manager"
                      >
                        Manager
                      </option>
                      <option
                        key="3"
                        value="Kepala gudang jadi"
                      >
                        Kepala gudang jadi
                      </option>
                    </TextField>
                  </div>
                </div>
                <Button
                  className={classes.button}
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Create
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  );
};

export default withStyles(styles)(Users);

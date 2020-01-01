import React, { useState, useEffect } from 'react';

import moment from 'moment';

import DashboardLayout from 'layouts/Dashboard';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  input: {
    margin: theme.spacing(1)
  }
});

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const Laporan = props => {
  const { classes } = props;

  const [state, setState] = useState({
    start: '',
    end: '',
    status: ''
  });

  const [last30, setLast30] = useState();

  useEffect(() => {
    fetch('http://localhost:8001/api/po/last30Days')
      .then(res => res.json())
      .then(result => {
        setLast30(result.data);
      });
  }, []);

  const [openAdd, setOpenAdd] = useState(false);
  const modalAdd = func => setOpenAdd(!openAdd);

  const handleSearch = (e) => {
   e.preventDefault();
   fetch(`http://localhost:8001/api/po/search?start=${state.start}&status=${state.status}&end=${state.end}`)
      .then(res => res.json())
      .then(result => {
        setLast30(result.data);
        setOpenAdd(false)
      });
  };

  const handleFieldChange = e =>
    setState({ ...state, [e.target.name]: e.target.value });

  return (
    <DashboardLayout title="Data PO">
      <div className={classes.root}>
         <div style={{'marginBottom': '10px'}}>
            <Button
               onClick={modalAdd}
               variant="contained"
            >
               Search
            </Button>
         </div>
        <TableContainer component={Paper}>
          <Table
            aria-label="simple table"
            className={classes.table}
          >
            <TableHead>
              <TableRow>
                <TableCell>No PO</TableCell>
                <TableCell align="right">Tanggal PO</TableCell>
                <TableCell align="right">Pelanggan</TableCell>
                <TableCell align="right">Nama Barang</TableCell>
                <TableCell align="right">Jumlah</TableCell>
                <TableCell align="right">Tanggal Kirim</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {last30 && last30.map(row => (
                <TableRow key={row.no_po}>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    {row.no_po}
                  </TableCell>
                  <TableCell align="right">{moment(row.tgl_po).format("DD-MM-YYYY")}</TableCell>
                  <TableCell align="right">{row.nama_plg}</TableCell>
                  <TableCell align="right">{row.nama_brg}</TableCell>
                  <TableCell align="right">{row.jumlah}</TableCell>
                  <TableCell align="right">{moment(row.tgl_krm).format("DD-MM-YYYY")}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog
        aria-labelledby="draggable-dialog-title"
        onClose={modalAdd}
        open={openAdd}
        PaperComponent={PaperComponent}>
        <DialogTitle
          id="draggable-dialog-title"
          style={{ cursor: 'move' }}
        >
          Search Laporan
        </DialogTitle>
        <form onSubmit={handleSearch}>
          <DialogContent>
            <div className={classes.container}>
              <TextField
                className={classes.input}
                id="date"
                InputLabelProps={{
                  shrink: true
                }}
                label="Start Date"
                name="start"
                onChange={handleFieldChange}
                required
                type="date"
                value={state.start}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="Status">Status</InputLabel>
                <Select
                  labelId="Status"
                  name="status"
                  onChange={handleFieldChange}
                  required
                  value={state.status}
                >
                  <MenuItem value="success">success</MenuItem>
                  <MenuItem value="pending">pending</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.input}
                id="date"
                InputLabelProps={{
                  shrink: true
                }}
                label="End Date"
                name="end"
                onChange={handleFieldChange}
                required
                type="date"
                value={state.end}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              color="primary"
              onClick={modalAdd}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
            >
              Search
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </DashboardLayout>
  );
};

export default withStyles(styles)(Laporan);

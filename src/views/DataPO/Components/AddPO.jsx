import React, { useState } from 'react';
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
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles(theme => ({
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
}));

const AddBarang = ({ openAdd, modalAdd, addFunc, namaBarang }) => {
  const classes = useStyles();

  

  const [po, setPo] = useState({
    nama_plg: '',
    nama_brg: '',
    jumlah: '',
    tgl_krm: ''
  });

  

  const handleFieldChange = e =>
    setPo({ ...po, [e.target.name]: e.target.value });

  const { nama_plg, nama_brg, jumlah, tgl_krm } = po;

  const handleAdd = e => {
    e.preventDefault();
    addFunc(po);
    setPo({
      nama_plg: '',
      nama_brg: '',
      jumlah: '',
      tgl_krm: ''
    });
  };

  console.log(po)

  return (
    <Dialog
      aria-labelledby="draggable-dialog-title"
      onClose={modalAdd}
      open={openAdd}
      PaperComponent={PaperComponent}>
      <DialogTitle
        id="draggable-dialog-title"
        style={{ cursor: 'move' }}
      >
        Tambah PO
      </DialogTitle>
      <form onSubmit={handleAdd}>
        <DialogContent>
          <div className={classes.container}>
            <TextField
              className={classes.input}
              id="date"
              InputLabelProps={{
                shrink: true
              }}
              label="Tanggal Kirim"
              name="tgl_krm"
              onChange={handleFieldChange}
              type="date"
              value={tgl_krm}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="Nama Barang">Nama Barang</InputLabel>
              <Select
                labelId="Nama Barang"
                onChange={handleFieldChange}
                value={nama_brg}
                name="nama_brg"
              >
                 {
                    namaBarang.map((row) => <MenuItem value={row.nama_barang}>{row.nama_barang}</MenuItem> )
                 }
              </Select>
            </FormControl>
            <Input
              className={classes.input}
              inputProps={{
                'aria-label': 'Nama Pelanggan'
              }}
              name="nama_plg"
              onChange={handleFieldChange}
              placeholder="Nama Pelanggan"
              required
              value={nama_plg}
            />
            {/* <Input
                     placeholder="Nama Barang"
                     className={classes.input}
                     inputProps={{
                        'aria-label': 'Nama Barang',
                     }}
                     name="nama_brg"
                     value={nama_brg}
                     onChange={handleFieldChange}
                     required
                  /> */}
            <Input
              className={classes.input}
              inputProps={{
                'aria-label': 'jumlah'
              }}
              name="jumlah"
              onChange={handleFieldChange}
              placeholder="Jumlah"
              required
              value={jumlah}
            />
            {/* <Input
                     placeholder="Status"
                     className={classes.input}
                     inputProps={{
                        'aria-label': 'Status',
                     }}
                     name="status"
                     value={status}
                     onChange={handleFieldChange}
                     required
                  /> */}
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
            Tambah
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddBarang;

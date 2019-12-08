import React, { useState } from 'react';
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
   container: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   input: {
      margin: theme.spacing(1),
   },
}));

const AddBarang = ({ openAdd, modalAdd, addFunc }) => {
   const classes = useStyles();

   const [barang, setBarang] = useState({
      kode_barang: '',
      nama_barang: '',
      tipe: '',
      accept: '',
      rejects: '',
      harga: ''
   })

   const handleFieldChange = e => setBarang({ ...barang, [e.target.name]: e.target.value })

   const {kode_barang, nama_barang, tipe, accept, rejects, harga} = barang

   const handleAdd = (e) => {
      e.preventDefault()
      addFunc(barang)
      setBarang({
         kode_barang: '',
         nama_barang: '',
         tipe: '',
         accept: '',
         rejects: '',
         harga: ''
      })
   }

   return (
      <Dialog
         open={openAdd}
         onClose={modalAdd}
         PaperComponent={PaperComponent}
         aria-labelledby="draggable-dialog-title"
      >
         <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Tambah Barang
         </DialogTitle>
         <form onSubmit={handleAdd}>
            <DialogContent>
               <div className={classes.container}>
                  <Input
                     placeholder="Kode Barang"
                     className={classes.input}
                     inputProps={{
                        'aria-label': "Kode Barang",
                     }}
                     name="kode_barang"
                     value={kode_barang}
                     onChange={handleFieldChange}
                     required
                  />
                  <Input
                     placeholder="Nama Barang"
                     className={classes.input}
                     inputProps={{
                        'aria-label': "Nama Barang",
                     }}
                     name="nama_barang"
                     value={nama_barang}
                     onChange={handleFieldChange}
                     required
                  />
                  <Input
                     placeholder="Tipe"
                     className={classes.input}
                     inputProps={{
                        'aria-label': 'Tipe',
                     }}
                     name="tipe"
                     value={tipe}
                     onChange={handleFieldChange}
                     required
                  />
                  <Input
                     placeholder="Accept"
                     className={classes.input}
                     inputProps={{
                        'aria-label': 'Accept',
                     }}
                     name="accept"
                     value={accept}
                     onChange={handleFieldChange}
                     required
                  />
                  <Input
                     placeholder="Rejects"
                     className={classes.input}
                     inputProps={{
                        'aria-label': 'Rejects',
                     }}
                     name="rejects"
                     value={rejects}
                     onChange={handleFieldChange}
                     required
                  />
                  <Input
                     placeholder="Harga"
                     className={classes.input}
                     inputProps={{
                        'aria-label': 'Harga',
                     }}
                     name="harga"
                     value={harga}
                     onChange={handleFieldChange}
                     required
                  />
               </div>
            </DialogContent>
            <DialogActions>
               <Button autoFocus onClick={modalAdd} color="primary">
                  Cancel
               </Button>
               <Button type="submit" color="primary">
                  Tambah
               </Button>
            </DialogActions>
         </form>
      </Dialog>
   )
}

export default AddBarang

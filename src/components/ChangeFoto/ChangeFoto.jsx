import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'relative'
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: '#fafafa',
    cursor: 'pointer'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const ChangeFoto = ({ open, handleClose, loadUser, user }) => {
  const classes = useStyles();

  const [fotoState, setFotoState] = useState({
    foto: null
  });


  const handleInputImage = e => {
    setFotoState({ foto: e.target.files[0] });
  };

  const handleSetFoto = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', fotoState.foto);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authentication': localStorage.getItem('token')
      }
    };

    try {
      // REQ.PARAMS.ID MASIH HARDCODE
      await axios.put(`http://localhost:8001/api/user/foto/${user.id}`, formData, config);
      loadUser()
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal
        aria-describedby="transition-modal-description"
        aria-labelledby="transition-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        className={classes.modal}
        closeAfterTransition
        onClose={handleClose}
        open={open}>
        <Fade in={open}>
          <form
            className={classes.paper}
            onSubmit={handleSetFoto}
          >
            <CloseIcon
              className={classes.closeIcon}
              onClick={handleClose}
            />
            <Input
              name="foto"
              onChange={handleInputImage}
              type="file"
            />
            <Button
              className={classes.button}
              color="default"
              size="small"
              startIcon={<CloudUploadIcon />}
              type="submit"
              variant="contained"
            >
              set Foto
            </Button>
          </form>
        </Fade>
      </Modal>
    </div>
  );
};

export default ChangeFoto;

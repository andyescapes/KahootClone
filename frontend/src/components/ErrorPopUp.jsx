import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';

// Modal Styled component
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ErrorPopUp (props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    props.setError(false);
  };

  return (
    <div>
      {open && (
        <>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">{props.title ?? 'Error'}</h2>
                <p id="transition-modal-description">{props.error}</p>
              </div>
            </Fade>
          </Modal>
        </>
      )}
    </div>
  );
}

ErrorPopUp.propTypes = {
  setError: PropTypes.func,
  title: PropTypes.string,
  error: PropTypes.string
}

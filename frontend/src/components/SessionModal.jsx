import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';

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

export default function SessionModal (props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    props.setter(false);
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
                <h2 id="transition-modal-title">{props.message}</h2>
                <p id="transition-modal-description">{props.data}</p>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={props.onClickFn}
                  data-test-target="Results"
                >
                  {props.buttonMessage}
                </Button>
              </div>
            </Fade>
          </Modal>
        </>
      )}
    </div>
  );
}

SessionModal.propTypes = {
  message: PropTypes.string,
  setter: PropTypes.func,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  field: PropTypes.string,
  buttonMessage: PropTypes.string,
  onClickFn: PropTypes.func,
}

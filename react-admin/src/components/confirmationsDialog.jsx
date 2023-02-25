import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function AlertDialog({ setConfirmed, open, setOpen, message }) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirmed = () => {
    setConfirmed(true);

  };
 
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Alerta Vidi Vici!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmed}>Da</Button>
          <Button onClick={handleClose} autoFocus>
            Nu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

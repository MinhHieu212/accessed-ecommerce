import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

interface DiscardProductDialogProps {
  children: React.ReactNode;
  onCancel: () => void;
  onAccept: () => void;
  title: string;
  content: string;
}

export default function DiscardProductDialog({
  onCancel,
  onAccept,
  children,
  title,
  content,
}: DiscardProductDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    handleClose();
    onCancel();
  };

  const handleAccept = () => {
    handleClose();
    onAccept();
  };

  return (
    <React.Fragment>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleAccept} autoFocus>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

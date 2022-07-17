import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import { Messages, setMessage } from '../../lib/messages';
import { notificationService } from '../../lib/notificationService';
import { Divider } from '@mui/material';

type FCProps = {
  open: boolean;
  name?: string;
  onClose: () => void;
  onDelete: () => Promise<void>;
  onFinish?: () => void;
};

export const DeleteDialog: React.FC<FCProps> = props => {
  const { open, onDelete, onClose, onFinish } = props;

  const name = props.name || '';

  const handleDelete = async () => {
    try {
      await onDelete();

      onClose();

      onFinish && onFinish();
    } catch (err) {
      notificationService.handleError(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} onBackdropClick={() => {}}>
      <DialogTitle id="alert-dialog-title">{`Xoá ${name}`}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Bạn có chắc chắn muốn xoá ${name}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{setMessage(Messages.action.cancel)}</Button>
        <LoadingButton
          variant="contained"
          type="submit"
          onClick={handleDelete}
          autoFocus
        >
          {setMessage(Messages.action.agree)}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

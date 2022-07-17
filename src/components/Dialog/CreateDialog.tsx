import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AppBar,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { setMessage } from '../../lib/messages';
import {
  CancelButton,
  CreateButton,
  ResetButton,
} from '../Button/ActionButton';
import { Transition } from './Transition';

type FCProps = {
  name?: string;
  open: boolean;
  onClose: () => void;
  onReset: () => void;
  isSubmitting?: boolean;
  onSubmit: () => void;
  fullscreen?: boolean;
  submitButtonTitle?: string;
};

export const CreateDialog: React.FC<FCProps> = props => {
  const {
    open,
    onClose,
    onSubmit,
    onReset,
    children,
    isSubmitting,
    fullscreen = true,
    submitButtonTitle,
  } = props;

  const name = props.name || '';

  return (
    <Dialog
      fullScreen={fullscreen}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            onClick={onClose}
          >
            <FontAwesomeIcon icon="x" />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {`Tạo mới ${setMessage(name)}`}
          </Typography>
          {fullscreen && (
            <CreateButton loading={isSubmitting} title={submitButtonTitle} />
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <form noValidate onSubmit={onSubmit} onReset={onReset}>
          <DialogContent>{children}</DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <CancelButton onClick={onClose} />
            <ResetButton />
            <CreateButton loading={isSubmitting} title={submitButtonTitle} />
          </DialogActions>
        </form>
      </Container>
    </Dialog>
  );
};

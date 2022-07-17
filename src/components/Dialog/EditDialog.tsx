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

import { setMessage } from '../../lib/messages';
import {
  CancelButton,
  ResetButton,
  UpdateButton,
} from '../Button/ActionButton';
import { Transition } from './Transition';

type FCProps = {
  name?: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isSubmitting?: boolean;
};

export const EditDialog: React.FC<FCProps> = props => {
  const { open, onClose, onSubmit, onReset, children, isSubmitting } = props;

  const name = props.name || '';

  return (
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      open={open}
      onClose={onClose}
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
            {`Cập nhật ${setMessage(name)}`}
          </Typography>
          <UpdateButton loading={isSubmitting} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <form noValidate onSubmit={onSubmit} onReset={onReset}>
          <DialogContent>{children}</DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <CancelButton onClick={onClose}></CancelButton>
            <ResetButton />
            <UpdateButton
              loading={isSubmitting}
              type="submit"
              variant="contained"
            />
          </DialogActions>
        </form>
      </Container>
    </Dialog>
  );
};

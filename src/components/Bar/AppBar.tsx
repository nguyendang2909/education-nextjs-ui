import { AppBar, styled, Toolbar } from '@mui/material';
import { APPBAR_DESKTOP, APPBAR_MOBILE } from '../../config';

export const AppBarBottom = styled(AppBar)(({ theme }) => ({
  top: 'auto',
  bottom: 0,
  backgroundColor: theme.palette.background.default,
  color: '#212b36',
}));

export const ToolbarBottom = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

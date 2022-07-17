import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { styled } from '../../styles/theme';

const APP_BAR_MOBILE = 64;

const APP_BAR_DESKTOP = 92;

export const MainContentLayout = styled<FC>(({ children, ...gridProps }) => (
  <Grid container direction="column" {...gridProps}>
    {children}
  </Grid>
))(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP,
  },
}));

export const MainContentBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  flexGrow: 1,
  width: '100%',
  overflowX: 'hidden',
  paddingBottom: theme.spacing(10),
}));

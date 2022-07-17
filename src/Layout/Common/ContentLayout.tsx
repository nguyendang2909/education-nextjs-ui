import { Grid } from '@mui/material';
import { FC } from 'react';
import { styled } from '../../styles/theme';

export const ContentLayout = styled<FC>(({ children, ...gridProps }) => (
  <Grid container direction="column" {...gridProps}>
    {children}
  </Grid>
))(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: 12,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: 16,
  },
}));

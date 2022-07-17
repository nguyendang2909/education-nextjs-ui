import { Stack } from '@mui/material';
import { styled } from '../../styles/theme';

export const LayoutStyle = styled('div')(() => ({
  // display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
}));

export const LayoutStack = styled(Stack)(() => ({
  minHeight: '100vh',
  overflow: 'hidden',
}));

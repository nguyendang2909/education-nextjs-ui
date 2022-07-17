import { Stack, styled } from '@mui/material';

export const StackSpaceBetween = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

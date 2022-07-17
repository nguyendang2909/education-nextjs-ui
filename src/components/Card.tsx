import { Card, CardContent } from '@mui/material';
import { styled } from '../styles/theme';

export const CardContentCenter = styled(CardContent)(() => ({
  // justifyContent: 'center',
  textAlign: 'center',
}));

export const CardFullHeight = styled(Card)(() => ({
  height: '100%',
}));

export const CardZ8 = styled(Card)(({ theme }) => ({
  boxShadow: theme.customShadows.z8,
}));

export const CardZ1 = styled(Card)(({ theme }) => ({
  boxShadow: theme.customShadows.z1,
}));

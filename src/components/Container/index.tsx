import { Container, styled } from '@mui/material';

export const ContainerSpacing = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const ContainerSpacingBottom = styled(Container)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
}));

export const ContainerSpacingBig = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
}));

export const ContainerMarginVertical = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
}));

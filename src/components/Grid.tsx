import { Grid, styled } from '@mui/material';

export const GridStrech = styled(Grid)(() => ({
  alignItems: 'stretch',
}));

export const GridPadding = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const GridPaddingHorizontal = styled(Grid)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

export const GridSpacing = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

export const GridNoWrap = styled(Grid)(() => ({
  flexWrap: 'nowrap',
}));

export const GridMiddleMargin = styled(Grid)(() => ({
  marginTop: 'auto',
  marginBottom: 'auto',
}));

export const GridAlignItemsCenter = styled(Grid)(() => ({
  alignItems: 'center',
}));

export const GridFlexGrow = styled(Grid)(() => ({
  flexGrow: 1,
}));

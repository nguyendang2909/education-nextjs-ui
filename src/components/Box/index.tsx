import { Box } from '@mui/material';
import { styled } from '../../styles/theme';

export const BoxBackground = styled(Box)(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

// export const BoxMercuryBackground = styled(Box)(() => ({
//   backgroundColor: '#e1e1e1',
// }));

export const BoxBackgroundSecondary = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.secondary,
}));

export const BoxSpacing = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

export const BoxPadding = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const BoxCenter = styled(Box)(() => ({
  textAlign: 'center',
}));

export const BoxRightText = styled(Box)(() => ({
  textAlign: 'right',
}));

export const BoxSpacingTop = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

export const BoxSpacingBottom = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
}));

export const BoxCenterSpacingBottom = styled(BoxCenter)(() => ({
  mb: 2,
}));

export const BoxSpacingHorizontal = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
}));

export const BoxSpacingBig = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
}));

export const BoxBorderBottom = styled(Box)(() => ({
  borderBottom: '1px solid',
  borderColor: '#e5e8eb',
}));

export const BoxMinHeight = styled(Box)(() => ({
  minHeight: '300px',
}));

export const BoxMinHeightBig = styled(Box)(() => ({
  minHeight: '500px',
}));

export const BoxFloatRight = styled(Box)(() => ({
  float: 'right',
}));

export const BoxPositionAbsolute = styled(Box)(() => ({
  position: 'absolute',
}));

export const BoxPositionRelative = styled(Box)(() => ({
  position: 'relative',
}));

import { Typography } from '@mui/material';
import { styled } from '../../styles/theme';

export const TypographyCapitalize = styled(Typography)(() => ({
  '&:first-letter': {
    textTransform: 'uppercase',
  },
}));

export const TypographyCenter = styled(Typography)(() => ({
  textAlign: 'center',
}));

export const TypographyUppercase = styled(Typography)(() => ({
  textTransform: 'uppercase',
}));

export const TypographyCenterUppercase = styled(TypographyCenter)(() => ({
  textTransform: 'uppercase',
}));

export const TypographyWhite = styled(Typography)(() => ({
  color: '#fff',
}));

export const TypographyShadowWhite = styled(TypographyWhite)(() => ({
  textShadow: '0px 2px 3px rgb(0 0 0 / 70%)',
}));

export const TypographyCenterShadowWhite = styled(TypographyShadowWhite)(
  () => ({ textAlign: 'center' }),
);

export const TypographyColorSecond = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
}));

export const TypographyTwoLine = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}));

export const TypographyOneLine = styled(Typography)(() => ({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}));

export const TypographySpacingHorizontal = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 2),
}));

export const TypographyFontLargeBold = styled(Typography)(() => ({
  fontSize: '1.2rem',
  fontWeight: 600,
}));

export const TypographyUppercaseColorSecondary = styled(TypographyUppercase)(
  ({ theme }) => ({
    color: theme.palette.grey[600],
  }),
);

export const TypographyBold = styled(Typography)(() => ({
  fontWeight: 600,
}));

export const TypographyPrice = styled(Typography)(({ theme }) => ({
  color: theme.palette.price.primary,
  fontWeight: 700,
}));

export const TypographyBorderBottom = styled(Typography)(({ theme }) => ({
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
}));

export const TypographyItalic = styled(Typography)(() => ({
  fontStyle: 'italic',
}));

import { createTheme } from '@mui/material/styles';
import shape, { customShape, CustomShape } from './shape';
import palette, { CustomPalette } from './palette';
import typography, { CustomTypography } from './typography';
import componentsOverride from './overrides';
import shadows, { CustomShadows, customShadows } from './shadows';
import { createStyled, Spacing } from '@mui/system';
import { Mixins } from '@mui/material/styles/createMixins';
import { Shadows } from '@mui/material/styles/shadows';
import { Typography } from '@mui/material/styles/createTypography';
import { ZIndex } from '@mui/material/styles/zIndex';
import { Palette } from '@mui/material/styles/createPalette';
import { Transitions } from '@mui/material/styles/createTransitions';
import { Components } from '@mui/material/styles/components';
import { Theme as SystemTheme } from '@mui/system/createTheme';

interface BaseTheme extends SystemTheme {
  mixins: Mixins;
  palette: Palette;
  shadows: Shadows;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
}

export type CustomTheme = {
  palette: CustomPalette;
  shape: CustomShape;
  customShadows: CustomShadows;
  customShape: CustomShape;
  spacing: Spacing;
  typography: CustomTypography;
  components?: Components<BaseTheme>;
};

export const theme = createTheme({
  palette,
  shape,
  shadows,
  customShadows,
  customShape,
  // @ts-ignore
  typography,
});

export const styled = createStyled({ defaultTheme: theme });

theme.components = componentsOverride(theme);

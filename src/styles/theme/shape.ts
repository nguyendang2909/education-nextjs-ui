import { Shape } from '@mui/system/createTheme/shape';

export type CustomShape = Shape & {
  borderRadiusSm: number | string;
  borderRadiusMd: number | string;
};

const shape = {
  borderRadius: 8,
  borderRadiusSm: 12,
  borderRadiusMd: 16,
};

export const customShape = shape;

export default shape;

import { alpha } from '@mui/material/styles';
import { colors } from './colors';

// function createGradient(color1: string, color2: string) {
//   return `linear-gradient(to bottom, ${color1}, ${color2})`;
// }

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

// const PRIMARY = {
//   lighter: '#C8FACD',
//   light: '#5BE584',
//   main: '#00AB55',
//   dark: '#007B55',
//   darker: '#005249',
//   contrastText: '#fff',
// };
// const SECONDARY = {
//   lighter: '#D6E4FF',
//   light: '#84A9FF',
//   main: '#3366FF',
//   dark: '#1939B7',
//   darker: '#091A7A',
//   contrastText: '#fff',
// };
// const INFO = {
//   lighter: '#D0F2FF',
//   light: '#74CAFF',
//   main: '#1890FF',
//   dark: '#0C53B7',
//   darker: '#04297A',
//   contrastText: '#fff',
// };
// const SUCCESS = {
//   lighter: '#E9FCD4',
//   light: '#AAF27F',
//   main: '#54D62C',
//   dark: '#229A16',
//   darker: '#08660D',
//   contrastText: GREY[800],
// };
// const WARNING = {
//   lighter: '#FFF7CD',
//   light: '#FFE16A',
//   main: '#FFC107',
//   dark: '#B78103',
//   darker: '#7A4F01',
//   contrastText: GREY[800],
// };
// const ERROR = {
//   lighter: '#FFE7D9',
//   light: '#FFA48D',
//   main: '#FF4842',
//   dark: '#B72136',
//   darker: '#7A0C2E',
//   contrastText: '#fff',
// };

// const GRADIENTS = {
//   primary: createGradient(PRIMARY.light, PRIMARY.main),
//   info: createGradient(INFO.light, INFO.main),
//   success: createGradient(SUCCESS.light, SUCCESS.main),
//   warning: createGradient(WARNING.light, WARNING.main),
//   error: createGradient(ERROR.light, ERROR.main),
// };

// const CHART_COLORS = {
//   violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
//   blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
//   green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
//   yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
//   red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
// };

const palette = {
  common: { black: colors.darkPaper, white: '#fff' },
  primary: {
    // lighter: '#C8FACD',
    light: colors.primaryLight,
    main: colors.primaryMain,
    dark: colors.primaryDark,
    200: colors?.primary200,
    800: colors?.primary800,
    // darker: '#005249',
    contrast: '#fff',
  },
  // primary: { ...PRIMARY },
  secondary: {
    light: colors?.secondaryLight,
    main: colors?.secondaryMain,
    dark: colors?.secondaryDark,
    200: colors?.secondary200,
    800: colors?.secondary800,
    contrastText: '#fff',
  },
  price: { primary: '#e8121b', secondary: 'black', third: '#ee4d2d' },
  info: {
    // lighter: '#D0F2FF',
    // light: '#74CAFF',
    main: '#1890FF',
    // dark: '#0C53B7',
    // darker: '#04297A',
    // contrastText: '#fff',
  },
  success: {
    // lighter: '#E9FCD4',
    light: colors.successLight,
    main: colors.successMain,
    dark: colors?.warningDark,
    // darker: '#08660D',
    200: colors?.success200,
  },
  warning: {
    // lighter: '#FFF7CD',
    light: colors?.warningLight,
    main: colors?.warningMain,
    dark: colors?.warningDark,
    // darker: '#7A4F01',
    // contrastText: GREY[800],
  },
  error: {
    // lighter: '#FFE7D9',
    light: colors.errorLight,
    main: colors.errorMain,
    dark: colors.errorDark,
    // darker: '#7A0C2E',
    // contrastText: '#fff',
  },
  grey: {
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
    500_8: alpha('#919EAB', 0.08),
    500_12: alpha('#919EAB', 0.12),
    500_16: alpha('#919EAB', 0.16),
    500_24: alpha('#919EAB', 0.24),
    500_32: alpha('#919EAB', 0.32),
    500_48: alpha('#919EAB', 0.48),
    500_56: alpha('#919EAB', 0.56),
    500_80: alpha('#919EAB', 0.8),
  },
  dark: {
    light: colors?.darkTextPrimary,
    main: colors?.darkLevel1,
    dark: colors?.darkLevel2,
    800: colors?.darkBackground,
    900: colors?.darkPaper,
  },
  // gradients: GRADIENTS,
  // chart: CHART_COLORS,
  divider: alpha('#919EAB', 0.24),
  text: {
    primary: colors.grey700,
    secondary: colors.grey500,
    disabled: colors.grey300,
  },
  background: {
    paper: colors.paper,
    default: colors.paper,
    primary: colors.darkBackground,
    secondary: colors.grey200,
  },
  action: {
    active: GREY[600],
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export type CustomPalette = typeof palette;

export default palette;

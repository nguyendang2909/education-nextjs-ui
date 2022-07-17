import { CustomTheme } from '..';

export const CustomLink = (theme: CustomTheme) => {
  return {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  };
};

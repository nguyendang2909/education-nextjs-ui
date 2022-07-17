import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Hidden, Link, Typography } from '@mui/material';
import { Logo } from '../../components/Logo';
import NextLink from 'next/link';

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

// ----------------------------------------------------------------------

export const AuthSider: FC = ({ children }) => {
  return (
    <HeaderStyle>
      <NextLink href="/" passHref>
        <Link>
          <Logo />
        </Link>
      </NextLink>

      <Hidden smDown>
        <Typography
          variant="body2"
          sx={{
            mt: { md: -2 },
          }}
        >
          {children}
        </Typography>
      </Hidden>
    </HeaderStyle>
  );
};

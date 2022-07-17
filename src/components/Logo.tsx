import { Box, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/system';
import Image from 'next/image';
import { FC } from 'react';
import { Messages, setMessage } from '../lib/messages';
import { AppLink } from './Link';

type LogoProps = {
  sx?: SxProps<Theme>;
};

export const Logo: FC<LogoProps> = ({ sx }) => {
  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <Image alt="logo" src="/logo.svg" width={40} height={40} />
    </Box>
  );
};

type LogoWithShortTitleProps = {
  sx?: SxProps<Theme>;
};

export const LogoWithShortTitle: FC<LogoWithShortTitleProps> = ({ sx }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Logo sx={{ mr: 1 }} />
      <Typography variant="h4" color="text.primary">
        {setMessage(Messages.app.shortTitle)}
      </Typography>
    </Box>
  );
};

type LogoLinkWithShortTitleProps = {
  sx?: SxProps<Theme>;
};

export const LogoLinkWithShortTitle: FC<LogoLinkWithShortTitleProps> = ({
  sx,
}) => {
  return (
    <>
      <AppLink href="/" sx={{ display: 'flex', alignItems: 'center' }}>
        <LogoWithShortTitle />
      </AppLink>
    </>
  );
};

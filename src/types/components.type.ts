import { SxProps, Theme } from '@mui/material';
import { NextPage } from 'next';
import { FC } from 'react';

export type NextPageWithLayout = NextPage & {
  // getLayout: (page: ReactElement) => ReactNode;
  layout?: FC;
};

export type SxType = {
  sx?: SxProps<Theme>;
};

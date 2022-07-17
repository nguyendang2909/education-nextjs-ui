import { Box } from '@mui/material';
import React from 'react';
import { LAYOUT_CONFIG } from '../../config';
import { styled } from '../../styles/theme';
import { FirstTopbar, SecondTopbar, TopAppBar } from '../Common/Topbar';

const MainTopbarHeight = styled(Box)(({ theme }) => ({
  minHeight:
    LAYOUT_CONFIG.main.topbar.first.mobileHeight +
    LAYOUT_CONFIG.main.topbar.second.mobileHeight,
  maxHeight:
    LAYOUT_CONFIG.main.topbar.first.mobileHeight +
    LAYOUT_CONFIG.main.topbar.second.mobileHeight,
  [theme.breakpoints.up('lg')]: {
    minHeight:
      LAYOUT_CONFIG.main.topbar.first.height +
      LAYOUT_CONFIG.main.topbar.second.height,
    maxHeight:
      LAYOUT_CONFIG.main.topbar.first.height +
      LAYOUT_CONFIG.main.topbar.second.height,
  },
}));

type TopbarProps = {
  onOpenSidebar: () => void;
};

export const MainTopbar: React.FC<TopbarProps> = ({ onOpenSidebar }) => {
  return (
    <>
      <TopAppBar>
        <FirstTopbar onOpenSidebar={onOpenSidebar} />

        <SecondTopbar />
      </TopAppBar>

      <MainTopbarHeight />
    </>
  );
};

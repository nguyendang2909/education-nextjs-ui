import { Box } from '@mui/material';
import React from 'react';
import { LAYOUT_CONFIG } from '../../config';
import { styled } from '../../styles/theme';
import { FirstTopbar, SecondTopbar, TopAppBar } from '../Common/Topbar';

const TopbarHeight = styled(Box)(({ theme }) => ({
  minHeight: LAYOUT_CONFIG.main.topbar.first.mobileHeight,
  maxHeight: LAYOUT_CONFIG.main.topbar.first.mobileHeight,
  [theme.breakpoints.up('lg')]: {
    minHeight: LAYOUT_CONFIG.main.topbar.first.height,
    maxHeight: LAYOUT_CONFIG.main.topbar.first.height,
  },
}));

type TopbarProps = {
  onOpenSidebar: () => void;
};

export const ClassroomTopbar: React.FC<TopbarProps> = ({ onOpenSidebar }) => {
  return (
    <>
      <TopAppBar>
        <FirstTopbar onOpenSidebar={onOpenSidebar} maxWidth={false} />
      </TopAppBar>

      <TopbarHeight />
    </>
  );
};

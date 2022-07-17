import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { varWrapEnter } from './variants';

type MotionContainerProps = {
  open: boolean;
};

export const MotionContainer: FC<MotionContainerProps> = ({
  open,
  children,
}) => {
  return (
    <Box
      component={motion.div}
      // initial={false}
      animate={open ? 'animate' : 'exit'}
      variants={varWrapEnter}
      initial="initial"
    >
      {children}
    </Box>
  );
};

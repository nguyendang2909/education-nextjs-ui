import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { setMessage } from '../../lib/messages';
import { MotionContainer } from '../animate/MotionContainer';
import { varBounceIn } from '../animate/variants';
import { BoxSpacing } from '../Box';
import { TypographyCenter } from '../Text/Typography';

type NotificationBoxProps = {
  actions?: ReactNode;
  image?: ReactNode;
  subtitle?: string;
  title?: string;
};

export const NotificationBox: FC<NotificationBoxProps> = ({
  actions,
  image,
  subtitle,
  title,
}) => {
  return (
    <>
      <MotionContainer open>
        <BoxSpacing>
          <motion.div variants={varBounceIn}>
            {title && (
              <TypographyCenter variant="h3">
                {setMessage(title)}
              </TypographyCenter>
            )}
            {subtitle && (
              <TypographyCenter>{setMessage(subtitle)}</TypographyCenter>
            )}
          </motion.div>
        </BoxSpacing>

        {image && (
          <motion.div variants={varBounceIn}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: { xs: 2, sm: 4 },
              }}
            >
              {image}
            </Box>
          </motion.div>
        )}

        <BoxSpacing sx={{ textAlign: 'center' }}>
          {actions && actions}
        </BoxSpacing>
      </MotionContainer>
    </>
  );
};

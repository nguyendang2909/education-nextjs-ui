import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Messages, setMessage } from '../../lib/messages';
import { varBounceIn } from '../animate/variants';
import { MotionContainer } from '../animate/MotionContainer';
import NextLink from 'next/link';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const NotFoundContent: FC = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <RootStyle>
      <MotionContainer open>
        <Box sx={{ maxWidth: 768, margin: 'auto', textAlign: 'center' }}>
          <motion.div variants={varBounceIn}>
            <Typography variant="h3" paragraph>
              Không tìm thấy nội dung! Vui lòng thử lại.
            </Typography>
          </motion.div>

          <motion.div variants={varBounceIn}>
            <Box
              component="img"
              src="/static/images/status_code/404.svg"
              sx={{ height: 260, mx: 'auto', padding: { xs: 2, sm: 4 } }}
            />
          </motion.div>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button
              size="large"
              variant="contained"
              startIcon={<FontAwesomeIcon icon="arrow-left" />}
              onClick={goBack}
            >
              {setMessage(Messages.navigator.goBack)}
            </Button>

            <NextLink href="/" passHref>
              <Button
                size="large"
                variant="outlined"
                startIcon={<FontAwesomeIcon icon={faHome} />}
              >
                {setMessage(Messages.navigator.homePage)}
              </Button>
            </NextLink>
          </Stack>
        </Box>
      </MotionContainer>
    </RootStyle>
  );
};

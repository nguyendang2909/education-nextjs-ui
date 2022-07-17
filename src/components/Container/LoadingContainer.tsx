import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';

type LoadingContainerProps = {
  loading?: boolean;
};

export const LoadingContainer: FC<LoadingContainerProps> = ({
  children,
  loading = true,
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      {!!loading && (
        <Box
          sx={{
            position: 'absolute',
            left: '0px',
            right: '0px',
            top: '0px',
            bottom: '0px',
            textAlign: 'center',
            zIndex: 99,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(0,0,0, 0.5)',
              borderRadius: '8px',
              width: '100px',
              margin: '100px auto',
              padding: 2,
            }}
          >
            <CircularProgress />
          </Box>
        </Box>
      )}
    </Box>
  );
};

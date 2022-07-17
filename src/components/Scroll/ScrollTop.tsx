import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Fab, Fade, useScrollTrigger } from '@mui/material';
import { FC, MouseEvent } from 'react';

export const ScrollTop: FC = props => {
  // const { children, window } = props;

  const trigger = useScrollTrigger({
    target: typeof window !== 'undefined' ? window : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'start',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 100 }}
      >
        <Fab size="small" aria-label="scroll back to top">
          <FontAwesomeIcon icon={faAngleUp} />
        </Fab>
      </Box>
    </Fade>
  );
};

import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, styled, Tooltip } from '@mui/material';
import { FC } from 'react';
import { APP_URL } from '../../config';
import { Messages, setMessage } from '../../lib/messages';
import { NextLink } from '../Link';

export const IconButtonMedium = styled(IconButton)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
}));

export const BackToHomeIconButton: FC = () => {
  return (
    <NextLink href={APP_URL.home} passHref>
      <Tooltip title={setMessage(Messages.navigator.backToHome)}>
        <IconButtonMedium>
          <FontAwesomeIcon icon={faRotateLeft} />
        </IconButtonMedium>
      </Tooltip>
    </NextLink>
  );
};

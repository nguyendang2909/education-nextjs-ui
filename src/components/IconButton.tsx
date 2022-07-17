import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, IconButtonProps, styled } from '@mui/material';
import { FC } from 'react';

export const IconButtonMenuTop = styled(IconButton)(() => ({
  width: 44,
  height: 44,
}));

export const IconButtonLarge = styled(IconButton)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
}));

type EditIconButtonProps = IconButtonProps & {};

export const EditIconButton: FC<EditIconButtonProps> = ({
  ...iconButtonProps
}) => {
  return (
    <IconButton {...iconButtonProps}>
      <FontAwesomeIcon icon={faEdit} />
    </IconButton>
  );
};

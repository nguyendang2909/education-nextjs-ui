import React, { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { Messages, setMessage } from '../../lib/messages';
import {
  faCheck,
  faEdit,
  faHome,
  faPaperPlane,
  faPlus,
  faSearch,
  faSync,
  faTimes,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { APP_URL } from '../../config';
import { SxType } from '../../types/components.type';
import { ButtonLink } from './ButtonLink';

export const AccpetButton = (props: LoadingButtonProps) => (
  <LoadingButton
    type="submit"
    variant="contained"
    color="primary"
    size="large"
    startIcon={<FontAwesomeIcon icon={faCheck} />}
    {...props}
  >
    {Messages.action.accept}
  </LoadingButton>
);

export const CancelButton = (props: ButtonProps) => (
  <Button
    variant="outlined"
    size="large"
    startIcon={<FontAwesomeIcon icon={faTimes} />}
    {...props}
  >
    {Messages.action.cancel}
  </Button>
);

export const CreateButton = (
  props: LoadingButtonProps & { title?: string },
) => {
  const { title, ...loadingButtonProps } = props;
  return (
    <LoadingButton
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      startIcon={<FontAwesomeIcon icon={faPlus} />}
      {...loadingButtonProps}
    >
      {title || Messages.action.create}
    </LoadingButton>
  );
};

export const EditButton = (props: ButtonProps) => (
  <Button
    // variant="contained"
    // color="primary"
    // size="large"
    startIcon={<FontAwesomeIcon icon={faEdit} />}
    {...props}
  >
    {Messages.action.edit}
  </Button>
);

export const DeleteButton = (props: ButtonProps) => (
  <Button
    variant="contained"
    size="large"
    startIcon={<FontAwesomeIcon icon={faEdit} />}
    {...props}
  >
    {Messages.action.delete}
  </Button>
);

export const ResetButton = (props: ButtonProps) => (
  <Button
    type="reset"
    variant="outlined"
    size="large"
    startIcon={<FontAwesomeIcon icon={faSync} />}
    {...props}
  >
    {Messages.action.reset}
  </Button>
);

export const UpdateButton = (props: LoadingButtonProps) => (
  <LoadingButton
    type="submit"
    variant="contained"
    color="primary"
    size="large"
    startIcon={<FontAwesomeIcon icon={faEdit} />}
    {...props}
  >
    {Messages.action.update}
  </LoadingButton>
);

export const SendButton = (props: LoadingButtonProps) => (
  <LoadingButton
    type="submit"
    variant="contained"
    color="primary"
    size="large"
    startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
    {...props}
  >
    {Messages.action.send}
  </LoadingButton>
);

export const UploadButton = (props: LoadingButtonProps) => (
  <LoadingButton
    type="submit"
    variant="contained"
    color="primary"
    size="large"
    startIcon={<FontAwesomeIcon icon={faUpload} />}
    {...props}
  >
    {Messages.action.upload}
  </LoadingButton>
);

type ButtonToCoursesProps = SxType & {};

export const ButtonToCourses: FC<ButtonToCoursesProps> = ({ sx = {} }) => {
  return (
    <ButtonLink
      href={APP_URL.courses}
      sx={{ ...sx }}
      size="large"
      variant="contained"
      startIcon={<FontAwesomeIcon icon={faSearch} />}
    >
      {setMessage(Messages.action.search, Messages.course.name)}
    </ButtonLink>
  );
};

type ButtonToHomeProps = SxType & {};

export const ButtonToHome: FC<ButtonToHomeProps> = ({ sx = {} }) => {
  return (
    <ButtonLink
      href="/"
      sx={{ ...sx }}
      size="large"
      variant="outlined"
      startIcon={<FontAwesomeIcon icon={faHome} />}
    >
      {setMessage(Messages.navigator.homePage)}
    </ButtonLink>
  );
};

export const SearchButton = (props: LoadingButtonProps) => (
  <LoadingButton
    type="submit"
    variant="contained"
    color="primary"
    size="large"
    startIcon={<FontAwesomeIcon icon={faSearch} />}
    {...props}
  >
    {Messages.action.search}
  </LoadingButton>
);

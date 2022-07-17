import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/material/styles';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Messages, setMessage } from '../../lib/messages';
import { iconLibrary } from '../../data/icons';

const IconWithRightSpace = styled(FontAwesomeIcon)(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
  marginRight: theme.spacing(2),
}));

type FCProps = {
  required?: boolean;
  value?: IconProp;
  onChange: (event: unknown) => void;
  error?: boolean;
  helperText?: React.ReactNode;
};

export const IconField: React.FC<FCProps> = props => {
  const { required, value, onChange, error, helperText } = props;

  return (
    <TextField
      select
      variant="outlined"
      size="small"
      margin="normal"
      required={required || false}
      fullWidth
      id="icon"
      label={setMessage(Messages.common.icon)}
      name="icon"
      value={value}
      onChange={onChange}
      error={error || false}
      helperText={helperText || <></>}
    >
      {iconLibrary.map(item => {
        const { name, icon } = item;

        return (
          <MenuItem
            key={name}
            value={icon.toString()}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <IconWithRightSpace icon={icon} size="lg" />

            {setMessage(name)}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

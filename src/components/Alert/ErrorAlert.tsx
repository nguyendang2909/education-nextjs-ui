import { Alert, Collapse } from '@mui/material';
import { FC } from 'react';

type CollapseErrorAlertProps = {
  message?: any;
};

export const CollapseErrorAlert: FC<CollapseErrorAlertProps> = props => {
  const message = props.message.toString();

  return (
    <Collapse in={!!message}>
      <Alert severity="error" sx={{ justifyContent: 'center' }}>
        {message}
      </Alert>
    </Collapse>
  );
};

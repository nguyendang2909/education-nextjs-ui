import React from 'react';
import { Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { requestService } from '../../lib/request';
import { ButtonLink } from '../Button/ButtonLink';

export default function AuthSocial() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <ButtonLink
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          href={requestService.getURL('auth/facebook')}
        >
          <FontAwesomeIcon
            icon={faFacebook}
            color="#4267B2
"
          />
        </ButtonLink>

        <ButtonLink
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          href={requestService.getURL('auth/google')}
        >
          <FontAwesomeIcon icon={faGoogle} color="#DF3E30" />
        </ButtonLink>
      </Stack>
    </>
  );
}

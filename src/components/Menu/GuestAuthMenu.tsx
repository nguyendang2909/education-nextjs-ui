import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Hidden, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Messages, setMessage } from '../../lib/messages';
import NextLink from 'next/link';

export const GuestAuthMenu = () => {
  const router = useRouter();

  const currentUrl = router.asPath;

  return (
    <>
      <Hidden smUp>
        <NextLink
          href={{
            pathname: '/login',
            query: {
              redirect: currentUrl,
            },
          }}
          passHref
        >
          <IconButton>
            <FontAwesomeIcon icon="sign-in-alt" />
          </IconButton>
        </NextLink>
      </Hidden>
      <Hidden smDown>
        <NextLink
          href={{
            pathname: '/login',
            query: {
              redirect: currentUrl,
            },
          }}
          passHref
        >
          <Button>{setMessage(Messages.action.login)}</Button>
        </NextLink>
        <NextLink
          href={{
            pathname: '/register',
            query: {
              redirect: currentUrl,
            },
          }}
          passHref
        >
          <Button variant="outlined">
            {setMessage(Messages.action.register)}
          </Button>
        </NextLink>
      </Hidden>
    </>
  );
};

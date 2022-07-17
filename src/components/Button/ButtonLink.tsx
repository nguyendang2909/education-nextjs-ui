import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';
import { UrlObject } from 'url';
import { NextLink } from '../Link';

type ButtonLinkProps = ButtonProps & {
  href: string | UrlObject;
};

export const ButtonLink: FC<ButtonLinkProps> = ({
  href,
  children,
  ...buttonProps
}) => {
  return (
    <NextLink href={href} passHref>
      <Button {...buttonProps}>{children}</Button>
    </NextLink>
  );
};

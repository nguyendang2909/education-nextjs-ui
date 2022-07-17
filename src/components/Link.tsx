import { Link, LinkProps } from '@mui/material';
import NextJSLink from 'next/link';
import { FC } from 'react';
import { UrlObject } from 'url';

export const NextLink = NextJSLink;

export const AppLink: FC<LinkProps & { href: UrlObject | string }> = ({
  href,
  children,
  ...linkProps
}) => {
  return (
    <NextJSLink href={href} passHref>
      <Link {...linkProps}>{children}</Link>
    </NextJSLink>
  );
};

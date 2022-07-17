import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import { Messages, setMessage } from '../../lib/messages';
import NextLink from 'next/link';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIconSpacing } from '../Icon';
import { APP_URL } from '../../config';

export type BreadcrumbProps = {
  title?: string;
  icon?: IconProp;
  path?: string;
  sx?: SxProps<Theme>;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = props => {
  const { title, icon, path, sx = {} } = props;

  if (!path) {
    return (
      <>
        {icon ? <FontAwesomeIconSpacing icon={icon} /> : <></>}
        {setMessage(title)}
      </>
    );
  }

  return (
    <NextLink href={path} passHref>
      <Link underline="hover" color="inherit">
        <Typography sx={{ ...sx }}>
          {icon ? <FontAwesomeIconSpacing icon={icon} /> : <></>}
          {setMessage(title)}
        </Typography>
      </Link>
    </NextLink>
  );
};

type BreadcrumbHomeProps = {
  sx?: SxProps<Theme>;
};

export const BreadcrumbHome: React.FC<BreadcrumbHomeProps> = ({ sx = {} }) => {
  return (
    <Breadcrumb
      icon={faHome}
      title={Messages.app.shortTitle}
      path="/"
      sx={{ ...sx }}
    />
  );
};

type BreadcrumbTeacherProps = {
  sx?: SxProps<Theme>;
};

export const BreadcrumbTeacher: React.FC<BreadcrumbTeacherProps> = ({
  sx = {},
}) => {
  return (
    <Breadcrumb
      icon={faHome}
      title={Messages.teacher.name}
      path={APP_URL.teacher.management}
      sx={{ ...sx }}
    />
  );
};

type BreadcrumbAdminProps = {
  sx?: SxProps<Theme>;
};

export const BreadcrumbAdmin: React.FC<BreadcrumbAdminProps> = ({
  sx = {},
}) => {
  return (
    <Breadcrumb
      icon={faHome}
      title={Messages.admin.name}
      path={APP_URL.admin.home}
      sx={{ ...sx }}
    />
  );
};

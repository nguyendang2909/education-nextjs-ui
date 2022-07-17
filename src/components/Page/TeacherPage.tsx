import { Box, Breadcrumbs, Typography } from '@mui/material';
import Head from 'next/head';
import { FC, Fragment, ReactNode } from 'react';
import { messagesService, setMessage } from '../../lib/messages';
import { Breadcrumb, BreadcrumbProps, BreadcrumbTeacher } from '../Breadcrumbs';
import { ContainerSpacing } from '../Container';
import { StackSpaceBetween } from '../Stack';

type TeacherPageProps = {
  title: string;
  header?: {
    title?: string;
    breadcrumbs?: BreadcrumbProps[];
    action?: ReactNode;
  };
};

export const TeacherPage: FC<TeacherPageProps> = ({
  title,
  header,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{messagesService.setPageTitle(title)}</title>
      </Head>

      {!!header && (
        <ContainerSpacing>
          {!!header.breadcrumbs && (
            <Breadcrumbs>
              <BreadcrumbTeacher />
              {header.breadcrumbs.map((breadcrumbProps, index) => {
                return <Breadcrumb {...breadcrumbProps} key={index} />;
              })}
            </Breadcrumbs>
          )}

          <StackSpaceBetween>
            <Box>
              <Typography variant="h1">
                {setMessage(header.title || title)}
              </Typography>
            </Box>
            {!!header.action && <Box>{header.action}</Box>}
          </StackSpaceBetween>
        </ContainerSpacing>
      )}

      {children}
    </>
  );
};

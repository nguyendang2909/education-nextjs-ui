import { Box, Breadcrumbs, Typography } from '@mui/material';
import Head from 'next/head';
import { FC, Fragment, ReactNode } from 'react';
import { messagesService, setMessage } from '../../lib/messages';
import { Breadcrumb, BreadcrumbAdmin, BreadcrumbProps } from '../Breadcrumbs';
import { ContainerSpacing } from '../Container';
import { StackSpaceBetween } from '../Stack';

type AdminPageProps = {
  title: string;
  header?: {
    title?: string;
    breadcrumbs?: BreadcrumbProps[];
    action?: ReactNode;
  };
};

export const AdminPage: FC<AdminPageProps> = ({ title, header, children }) => {
  return (
    <>
      <Head>
        <title>{messagesService.setPageTitle(title)}</title>
      </Head>

      {!!header && (
        <ContainerSpacing>
          {!!header.breadcrumbs && (
            <Breadcrumbs>
              <BreadcrumbAdmin />
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

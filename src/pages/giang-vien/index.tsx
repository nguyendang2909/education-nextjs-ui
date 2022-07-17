import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumbs, Container, Typography } from '@mui/material';
import Head from 'next/head';
import { Breadcrumb, BreadcrumbHome } from '../../components/Breadcrumbs';
import { ContainerSpacingBottom } from '../../components/Container';
import { MainLayout } from '../../Layout/MainLayout';
import { Messages, messagesService, setMessage } from '../../lib/messages';
import { NextPageWithLayout } from '../../types/components.type';

const Page: NextPageWithLayout = () => {
  const pageTitle = Messages.teacher.name;

  return (
    <>
      <Head>
        <title>{messagesService.setPageTitle(pageTitle)}</title>
      </Head>

      <ContainerSpacingBottom>
        <Breadcrumbs>
          <BreadcrumbHome />
          <Breadcrumb title={Messages.teacher.name} icon={faUser} />
        </Breadcrumbs>
        <Typography variant="h1">{setMessage(pageTitle)}</Typography>
      </ContainerSpacingBottom>

      <Container>asdasd</Container>
    </>
  );
};

Page.layout = MainLayout;

export default Page;

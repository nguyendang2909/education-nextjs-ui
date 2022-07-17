import { Container } from '@mui/material';
import Head from 'next/head';
import { TypographyCenterUppercase } from '../components/Text/Typography';
import { Messages, messagesService } from '../lib/messages';
import { NextPageWithLayout } from '../types/components.type';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>
          {messagesService.setPageTitle(Messages.app.privacyPolicy)}
        </title>
      </Head>
      <Container>
        <TypographyCenterUppercase variant="h1">
          {Messages.app.privacyPolicy}
        </TypographyCenterUppercase>
      </Container>
    </>
  );
};

export default Page;

import Head from 'next/head';
import { NotFoundContent } from '.';
import { messagesService } from '../../lib/messages';

export const NotFoundPage = () => {
  return (
    <Head>
      <title>
        {messagesService.setPageTitle('404 - Không tìm thấy nội dung')}
      </title>

      <NotFoundContent />
    </Head>
  );
};

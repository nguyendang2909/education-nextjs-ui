import Head from 'next/head';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { TypographyCenter } from '../../components/Text/Typography';
import { NoneLayout } from '../../Layout/NoneLayout';
import { NextPageWithLayout } from '../../types/components.type';

const Page: NextPageWithLayout = () => {
  useEffect(() => {
    window.close();
  }, []);

  return (
    <>
      <Head>
        <title>Đăng nhập thành công</title>
      </Head>

      <Box sx={{ mt: 8 }}>
        <TypographyCenter variant="h3">Đăng nhập thành công</TypographyCenter>
      </Box>
    </>
  );
};

Page.layout = NoneLayout;

export default Page;

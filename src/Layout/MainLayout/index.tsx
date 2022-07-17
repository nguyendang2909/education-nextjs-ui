import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourseCategoriesThunk } from '../../store/reducers/course-categories.reducer';
import { MainSidebar } from '../../components/Bar/MainSidebar';
import Head from 'next/head';
import { Messages, setMessage } from '../../lib/messages';
import { MainTopbar } from './MainTopbar';
import { MainFooter } from './MainFooter';
import { ContentLayout } from '../Common/ContentLayout';
import { LayoutStack, LayoutStyle } from '../Common/Layout';
import { Box, Stack } from '@mui/material';

export const MainLayout: React.FC = ({ children }) => {
  const [isOpenSidebar, setSidebar] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCourseCategoriesThunk());
  }, [dispatch]);

  const handleSetOpenSidebar = () => {
    setSidebar(prev => !prev);
  };

  const handleCloseSidebar = () => {
    setSidebar(false);
  };

  return (
    <>
      <Head>
        <title>{setMessage(Messages.app.title)}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <LayoutStack>
        <MainTopbar onOpenSidebar={handleSetOpenSidebar} />

        <MainSidebar
          isOpenSidebar={isOpenSidebar}
          onCloseSidebar={handleCloseSidebar}
        />

        <ContentLayout>{children}</ContentLayout>

        <MainFooter />
      </LayoutStack>
    </>
  );
};

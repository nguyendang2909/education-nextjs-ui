import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourseCategoriesThunk } from '../../store/reducers/course-categories.reducer';
import { MainSidebar } from '../../components/Bar/MainSidebar';
import { useAppSelector } from '../../store/hooks';
import { useRouter } from 'next/router';
import { APP_URL } from '../../config';
import { ContentLayout } from '../Common/ContentLayout';
import { MainFooter } from '../MainLayout/MainFooter';
import { PrivateMainTopbar } from './PrivateMainTopbar';
import Head from 'next/head';
import { Messages, setMessage } from '../../lib/messages';
import { Stack } from '@mui/material';
import { LayoutStack } from '../Common/Layout';

export const PrivateMainLayout: React.FC = ({ children }) => {
  const [isOpenSidebar, setSidebar] = React.useState<boolean>(false);

  const router = useRouter();

  const logged = useAppSelector(state => state.user?.logged);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourseCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (logged === false) {
      router.replace({
        pathname: APP_URL.login,
        query: {
          redirect: router.asPath,
        },
      });
    }
  }, [logged, router]);

  const handleSetOpenSidebar = () => {
    setSidebar(prev => !prev);
  };

  const handleCloseSidebar = () => {
    setSidebar(false);
  };

  if (!logged) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{setMessage(Messages.app.title)}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <LayoutStack>
        <PrivateMainTopbar onOpenSidebar={handleSetOpenSidebar} />

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

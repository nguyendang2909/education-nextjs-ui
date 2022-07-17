import React, { FC, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../store/hooks';
import { TeacherSidebar } from './TeacherSidebar';
import { TeacherTopbar } from './TeacherTopbar';
import { ERole } from '../../types/enums';
import { useRouter } from 'next/router';
import { APP_URL } from '../../config';
import { MainContentBox, MainContentLayout } from '../Content';
import { MainFooter } from '../Footer/MainFooter';
import { LayoutStyle } from '../Common/Layout';
import { SecondFooter } from '../Common/Footer';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
});

export const TeacherLayout: FC = ({ children }) => {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const logged = useAppSelector(state => state.user?.logged);

  const userRole = useAppSelector(state => state.user?.info?.role);

  useEffect(() => {
    switch (logged) {
      case true:
        if (!userRole || userRole !== ERole.Teacher) {
          router.replace({
            pathname: APP_URL.notFound,
          });
        }
        break;

      case false:
        router.replace({
          pathname: APP_URL.login,
          query: {
            redirect: router.asPath,
          },
        });
        break;

      default:
        break;
    }
  }, [logged, router, userRole]);

  const handleSetOpen = () => {
    setOpen(prev => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!logged) {
    return <></>;
  }

  if (!userRole || userRole !== ERole.Teacher) {
    return <></>;
  }

  return (
    <>
      <RootStyle>
        <TeacherTopbar onOpenSidebar={handleSetOpen} />

        <TeacherSidebar isOpenSidebar={open} onCloseSidebar={handleClose} />

        <MainContentLayout>
          <MainContentBox>{children}</MainContentBox>
          <SecondFooter />
        </MainContentLayout>
      </RootStyle>
    </>
  );
};

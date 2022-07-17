import React, { FC, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../../store/hooks';
import { AdminSidebar } from '../../components/Bar/AdminSidebar';
import { ERole } from '../../types/enums';
import { useRouter } from 'next/router';
import { APP_URL } from '../../config';
import { MainContentBox, MainContentLayout } from '../Content';
import { AdminFooter } from '../Footer/AdminFooter';
import { AdminTopbar } from './AdminTopbar';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
});

export const AdminLayout: FC = ({ children }) => {
  const router = useRouter();

  const [open, setOpen] = React.useState<boolean>(false);

  const logged = useAppSelector(state => state.user?.logged);

  const userRole = useAppSelector(state => state.user?.info?.role);

  useEffect(() => {
    switch (logged) {
      case true:
        if (!userRole || userRole !== ERole.Admin) {
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!logged) {
    return <></>;
  }

  if (!userRole || userRole !== ERole.Admin) {
    return <></>;
  }

  return (
    <>
      <RootStyle>
        <AdminTopbar onOpenSidebar={handleSetOpen} />

        <AdminSidebar isOpenSidebar={open} onCloseSidebar={handleClose} />

        <MainContentLayout>
          <MainContentBox>{children}</MainContentBox>
          <AdminFooter />
        </MainContentLayout>
      </RootStyle>
    </>
  );
};

import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { MainSidebar } from '../../components/Bar/MainSidebar';
import { APP_URL } from '../../config';
import { useRouter } from 'next/router';
import { LayoutStyle } from '../Common/Layout';
import { ContentLayout } from '../Common/ContentLayout';
import { ClassroomFooter } from './ClassroomFooter';
import { ClassroomTopbar } from './ClassroomTopbar';

export const ClassroomLayout: FC = ({ children }) => {
  const [isOpenSidebar, setSidebar] = React.useState<boolean>(false);

  const router = useRouter();

  const userId = useAppSelector(state => state.user?.info?.id);

  const logged = useAppSelector(state => state.user?.logged);

  const handleSetOpenSidebar = () => {
    setSidebar(prev => !prev);
  };

  const handleCloseSidebar = () => {
    setSidebar(false);
  };

  useEffect(() => {
    switch (logged) {
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
  }, [logged, router]);

  return (
    <>
      {userId ? (
        <LayoutStyle>
          <ClassroomTopbar onOpenSidebar={handleSetOpenSidebar} />

          <MainSidebar
            isOpenSidebar={isOpenSidebar}
            onCloseSidebar={handleCloseSidebar}
          />

          <ContentLayout>{children}</ContentLayout>

          <ClassroomFooter />
        </LayoutStyle>
      ) : (
        <></>
      )}
    </>
  );
};

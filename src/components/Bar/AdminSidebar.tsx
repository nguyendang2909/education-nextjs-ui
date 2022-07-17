import { FC, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer, Hidden, Link } from '@mui/material';
import { Scrollbar } from '../Scrollbar';
import { Logo } from '../Logo';
import { NextLink } from '../Link';
import { SiderMenu } from '../Menu/SiderMenu';
import { UserBox } from '../User/UserBox';
import { useRouter } from 'next/router';
import { adminSidebarConfig } from '../../data/admin/admin-sidebar-config';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

type AdminSidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
};

export const AdminSidebar: FC<AdminSidebarProps> = ({
  isOpenSidebar,
  onCloseSidebar,
}) => {
  const router = useRouter();

  const { pathname } = router;

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <NextLink href="/admin" passHref>
          <Link>
            <Logo />
          </Link>
        </NextLink>
      </Box>

      <UserBox />

      <SiderMenu navConfig={adminSidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <Hidden lgUp>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>

      <Hidden lgDown>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </RootStyle>
  );
};

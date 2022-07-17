import { Box, Drawer, Hidden, styled } from '@mui/material';
import React from 'react';
import { mainSidebarConfig } from '../../data/main-sidebar-config';
import { LogoLinkWithShortTitle } from '../Logo';
import { SiderMenu } from '../Menu/SiderMenu';
import { Scrollbar } from '../Scrollbar';
import { UserBox } from '../User/UserBox';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    // width: DRAWER_WIDTH,
  },
}));

type SidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
};

export const MainSidebar: React.FC<SidebarProps> = ({
  isOpenSidebar,
  onCloseSidebar,
}) => {
  // const { pathname } = useLocation();

  // React.useEffect(() => {
  //   if (isOpenSidebar) {
  //     onCloseSidebar();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

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
        <LogoLinkWithShortTitle />
      </Box>

      <UserBox />
      <SiderMenu navConfig={mainSidebarConfig} />
      {/* <NavSection navConfig={sidebarConfig} /> */}
      <Box sx={{ flexGrow: 1 }} />
      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 2.5,
            pt: 5,
            borderRadius: 2,
            position: 'relative',
            bgcolor: 'grey.200',
          }}
        >
          <Box
            component="img"
            src="/static/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Nhận thêm ưu đãi?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Chỉ từ 100k
            </Typography>
          </Box>

          <Button
            fullWidth
            href="https://material-ui.com/store/items/minimal-dashboard/"
            target="_blank"
            variant="contained"
          >
            Đăng ký thành viên VIP
          </Button>
        </Stack>
      </Box> */}
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

      {/* <Hidden lgDown>
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
      </Hidden> */}
    </RootStyle>
  );
};

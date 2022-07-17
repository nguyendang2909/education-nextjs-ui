import React from 'react';
import {
  AppBar,
  Box,
  Container,
  Hidden,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { styled, alpha } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faGear,
  faSchool,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { LogoLinkWithShortTitle } from '../Logo';
import { AuthMenu } from '../Menu/AuthMenu';
import NextLink from 'next/link';
import { CartMenu } from '../../modules/Cart/CartMenu';
import { APPBAR_DESKTOP, APPBAR_MOBILE, APP_URL } from '../../config';
import { useAppSelector } from '../../store/hooks';
import { ERole } from '../../types/enums';
import Searchbar from './CourseSearchbar';
import { ButtonLink } from '../Button/ButtonLink';

const RootStyle = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

type TopbarProps = {
  onOpenSidebar: () => void;
};

export const MainTopbar: React.FC<TopbarProps> = ({ onOpenSidebar }) => {
  const currentUserRole = useAppSelector(state => state.user?.info?.role);

  return (
    <RootStyle>
      <Container sx={{ padding: 0 }}>
        <ToolbarStyle>
          <Hidden lgUp>
            <IconButton
              onClick={onOpenSidebar}
              sx={{ mr: 1, color: 'text.primary' }}
            >
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
          </Hidden>

          <Hidden lgDown>
            <LogoLinkWithShortTitle />
          </Hidden>
          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 1.5 }}
          >
            <Hidden mdDown>
              <ButtonLink
                href={APP_URL.courseUnlock}
                startIcon={<FontAwesomeIcon icon={faUnlock} />}
              >
                Kích hoạt khoá học
              </ButtonLink>
            </Hidden>

            <Searchbar />

            {currentUserRole === ERole.Teacher && (
              <NextLink href={APP_URL.teacher.management} passHref>
                <Tooltip title="Trang quản lý cho giáo viên">
                  <IconButton>
                    <FontAwesomeIcon icon={faSchool} />
                  </IconButton>
                </Tooltip>
              </NextLink>
            )}

            {currentUserRole === ERole.Admin && (
              <NextLink href={APP_URL.admin.home} passHref>
                <Tooltip title="Trang quản lý cho admin">
                  <IconButton>
                    <FontAwesomeIcon icon={faGear} />
                  </IconButton>
                </Tooltip>
              </NextLink>
            )}

            <CartMenu />
            <AuthMenu />
          </Stack>
        </ToolbarStyle>
      </Container>
    </RootStyle>
  );
};

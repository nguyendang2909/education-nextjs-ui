import {
  faBars,
  faBook,
  faGear,
  faSchool,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  alpha,
  AppBar,
  Box,
  Breakpoint,
  Container,
  Grid,
  Hidden,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { FC } from 'react';
import Searchbar from '../../components/Bar/CourseSearchbar';
import { ButtonLink } from '../../components/Button/ButtonLink';
import { GridFlexGrow } from '../../components/Grid';
import { NextLink } from '../../components/Link';
import { LogoLinkWithShortTitle } from '../../components/Logo';
import { AuthMenu } from '../../components/Menu/AuthMenu';
import { APP_URL, LAYOUT_CONFIG } from '../../config';
import { Messages, setMessage } from '../../lib/messages';
import { CartMenu } from '../../modules/Cart/CartMenu';
import { CourseCategoryDropdownMenu } from '../../modules/CourseCategory/CourseCategoryDropdownMenu';
import { useAppSelector } from '../../store/hooks';
import { styled } from '../../styles/theme';
import { ERole } from '../../types/enums';

export const TopAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

const FirstTopbarToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: LAYOUT_CONFIG.main.topbar.first.mobileHeight,
  maxHeight: LAYOUT_CONFIG.main.topbar.first.mobileHeight,
  [theme.breakpoints.up('lg')]: {
    minHeight: LAYOUT_CONFIG.main.topbar.first.height,
    maxHeight: LAYOUT_CONFIG.main.topbar.first.height,
    padding: theme.spacing(1, 2),
  },
}));

type FirstTopbarProps = {
  onOpenSidebar: () => void;
  maxWidth?: Breakpoint | false;
};

export const FirstTopbar: FC<FirstTopbarProps> = ({
  onOpenSidebar,
  maxWidth,
}) => {
  const currentUserRole = useAppSelector(state => state.user?.info?.role);

  return (
    <>
      <FirstTopbarToolbar id="top-anchor">
        <Container maxWidth={maxWidth} sx={{ padding: 0 }}>
          <Grid container>
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
          </Grid>
        </Container>
      </FirstTopbarToolbar>
    </>
  );
};

const SecondTopbarToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: '#1f2934',
  [theme.breakpoints.down('lg')]: {
    minHeight: LAYOUT_CONFIG.main.topbar.second.mobileHeight,
    maxHeight: LAYOUT_CONFIG.main.topbar.second.mobileHeight,
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: LAYOUT_CONFIG.main.topbar.second.height,
    maxHeight: LAYOUT_CONFIG.main.topbar.second.height,
    padding: theme.spacing(0, 2),
  },
}));

export const SecondTopbar = () => {
  return (
    <>
      <SecondTopbarToolbar>
        <Container>
          <Grid container gap={2} wrap="nowrap">
            <Hidden mdDown>
              <CourseCategoryDropdownMenu />

              <ButtonLink
                sx={{ color: 'primary.contrast', textTransform: 'uppercase' }}
                href={APP_URL.registerTeacher}
              >
                {setMessage(Messages.action.register, Messages.teacher.name)}
              </ButtonLink>
            </Hidden>

            <GridFlexGrow />

            <Hidden mdDown>
              <ButtonLink
                sx={{ color: 'primary.contrast' }}
                href={APP_URL.courseUnlock}
                startIcon={<FontAwesomeIcon icon={faUnlock} />}
              >
                {setMessage(Messages.course.unlock)}
              </ButtonLink>
            </Hidden>

            <ButtonLink
              sx={{ color: 'primary.contrast' }}
              href={APP_URL.classrooms}
              startIcon={<FontAwesomeIcon icon={faBook} />}
            >
              khoá học của tôi
            </ButtonLink>
          </Grid>
        </Container>
      </SecondTopbarToolbar>
    </>
  );
};

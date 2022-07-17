import { FC } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Hidden } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthMenu } from '../../components/Menu/AuthMenu';
import { BackToHomeIconButton } from '../../components/Button/IconButton';
import { APPBAR_DESKTOP, APPBAR_MOBILE, DRAWER_WIDTH } from '../../config';

const RootStyle = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

type TeacherTopbarProps = {
  onOpenSidebar: () => void;
};

export const TeacherTopbar: FC<TeacherTopbarProps> = ({ onOpenSidebar }) => {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Hidden lgUp>
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: 'text.primary' }}
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        </Hidden>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <BackToHomeIconButton />
          <AuthMenu />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

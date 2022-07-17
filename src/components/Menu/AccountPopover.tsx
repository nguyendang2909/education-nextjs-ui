import React, { FC, Fragment } from 'react';
import { alpha } from '@mui/material/styles';
import {
  Button,
  Box,
  Divider,
  Typography,
  MenuItem,
  Link,
  IconButton,
} from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { useDispatch } from 'react-redux';
import { requestAPI } from '../../lib/request';
import { logout } from '../../store/reducers/user.reducer';
import { toast } from 'react-toastify';
import { MenuPopover } from './MenuPopover';
import { Messages, setMessage } from '../../lib/messages';
import { ACCOUNT_MENU_CONFIG } from '../../data/account-menu-config';
import { NextLink } from '../Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AvatarUser } from '../User/AvatarUser';

export const AccountPopover: FC = () => {
  const anchorRef = React.useRef(null);

  const dispatch = useDispatch();

  const currentUser = useAppSelector(state => state.user?.info);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();

      await requestAPI.get('/auth/logout');

      dispatch(logout());
    } catch (err) {
      toast.error('Lỗi khi đăng xuất, vui lòng thử lại');
    }
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: theme => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <AvatarUser data={currentUser}></AvatarUser>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {currentUser?.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {currentUser?.displayEmail}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {currentUser?.phoneNumber || ''}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {ACCOUNT_MENU_CONFIG.filter(option => {
          if (
            option.roles &&
            currentUser?.role &&
            !option.roles.includes(currentUser?.role)
          ) {
            return false;
          }

          return true;
        }).map((option, index) => {
          const { icon, name, path } = option;

          return (
            <Fragment key={index}>
              <NextLink href={path} passHref>
                <Link>
                  <MenuItem sx={{ py: 1, px: 2.5 }} onClick={handleCloseMenu}>
                    <Box
                      sx={{
                        mr: 2,
                        width: 24,
                        height: 24,
                      }}
                    >
                      <Typography color="text.primary">
                        {icon && <FontAwesomeIcon icon={icon} size="lg" />}
                      </Typography>
                    </Box>
                    <Typography color="text.primary">
                      {setMessage(name)}
                    </Typography>
                  </MenuItem>
                </Link>
              </NextLink>
            </Fragment>
          );
        })}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
          >
            {setMessage(Messages.action.logout)}
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
};

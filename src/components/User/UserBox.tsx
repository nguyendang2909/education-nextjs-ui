import React from 'react';
import { Avatar, Link, Typography, Box, Hidden } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useAppSelector } from '../../store/hooks';
import { AppLink, NextLink } from '../Link';
import { requestService } from '../../lib/request';
import { APP_URL } from '../../config';
import { Messages, setMessage } from '../../lib/messages';
import { Formatter } from '../../lib/formatter';

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme?.spacing(2, 2.5),
  borderRadius: theme.customShape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

export const UserBox: React.FC = () => {
  const user = useAppSelector(state => state.user?.info);

  const userId = user?.id;

  const userAvatarURL = user?.displayAvatarURL;

  const fullname = user?.displayName;

  const theme = useTheme();

  return (
    <Box sx={{ mb: 5, mx: 2.5 }}>
      {userId ? (
        <NextLink href="#">
          <Link underline="none">
            <AccountStyle>
              <Avatar
                src={
                  userAvatarURL
                    ? requestService.getURL(userAvatarURL)
                    : undefined
                }
              >
                {fullname && fullname[0]}
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {fullname}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user?.role && setMessage(Formatter.formatRole(user?.role))}
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        </NextLink>
      ) : (
        <Hidden smUp>
          <AccountStyle>
            <Typography
              sx={{
                color: theme.palette.primary.light,
                fontWeight: 'bold',
                textAlign: 'center',
                width: '100%',
              }}
            >
              <AppLink href={APP_URL.login}>
                {setMessage(Messages.action.login)}
              </AppLink>
              {' / '}
              <AppLink href={APP_URL.register}>
                {setMessage(Messages.action.register)}
              </AppLink>
            </Typography>
          </AccountStyle>
        </Hidden>
      )}
    </Box>
  );
};

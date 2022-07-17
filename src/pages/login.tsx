import React, { useEffect } from 'react';
import {
  Card,
  Stack,
  Link,
  Typography,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
  CardContent,
  Button,
} from '@mui/material';
import { appShortTitle, Messages, setMessage } from '../lib/messages';
import NextLink from 'next/link';
import { LoginForm } from '../components/Form/LoginForm';
import { NextPageWithLayout } from '../types/components.type';
import { useRouter } from 'next/router';
import { NoneLayout } from '../Layout/NoneLayout';
import { useAppSelector } from '../store/hooks';
import { AppPage } from '../components/Page/AppPage';
import { styled } from '../styles/theme';
import { LogoLinkWithShortTitle } from '../components/Logo';
import { TypographyCenter } from '../components/Text/Typography';
import AuthSocial from '../components/Auth/AuthSocial';

// const RootStyle = styled(Box)(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     display: 'flex',
//   },
// }));

// const SectionStyle = styled(Card)(({ theme }) => ({
//   width: '100%',
//   maxWidth: 464,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   margin: theme.spacing(2, 0, 2, 2),
// }));

// const ContentStyle = styled('div')(({ theme }) => ({
//   maxWidth: 480,
//   margin: 'auto',
//   display: 'flex',
//   minHeight: '100vh',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   padding: theme.spacing(12, 0),
// }));

export const AuthPageBackground = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  minHeight: '100vh',
}));

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const logged = useAppSelector(state => state.user?.logged);

  const redirect =
    (Array.isArray(router.query.redirect)
      ? router.query.redirect[0]
      : router.query.redirect) || '/';

  useEffect(() => {
    if (logged) {
      router.replace(redirect);
    }
  }, [logged, redirect, router]);

  return (
    <AppPage title={Messages.action.login}>
      <AuthPageBackground>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          sx={{ minHeight: '100vh' }}
        >
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: 'calc(100vh - 68px)' }}
            >
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <Card
                  sx={{
                    maxWidth: { xs: 400, lg: 475 },
                    margin: { xs: 2.5, md: 3 },
                    '& > *': {
                      flexGrow: 1,
                      flexBasis: '50%',
                    },
                  }}
                >
                  <CardContent>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item sx={{ mb: 3 }}>
                        <LogoLinkWithShortTitle />
                      </Grid>

                      <Grid item xs={12}>
                        <Grid
                          container
                          direction={matchDownSM ? 'column-reverse' : 'row'}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Grid item>
                            <Stack
                              alignItems="center"
                              justifyContent="center"
                              spacing={1}
                            >
                              <Typography
                                color={theme.palette.secondary.main}
                                gutterBottom
                                variant={'h2'}
                              >
                                {setMessage(Messages.action.login)}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <AuthSocial />
                      </Grid>

                      <Grid item xs={12}>
                        <Divider sx={{ my: 3 }}>
                          <Button
                            variant="outlined"
                            sx={{
                              cursor: 'unset',
                              m: 2,
                              py: 0.5,
                              px: 7,
                              borderColor: `${theme.palette.grey[100]} !important`,
                              color: `${theme.palette.grey[900]}!important`,
                              fontWeight: 500,
                              textTransform: 'none',
                              // borderRadius: `${customization.borderRadius}px`,
                            }}
                            disableRipple
                            disabled
                          >
                            hoặc
                          </Button>
                        </Divider>
                      </Grid>
                      <Grid item xs={12}>
                        <LoginForm redirect={redirect} />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          item
                          container
                          direction="column"
                          alignItems="center"
                          xs={12}
                        >
                          <TypographyCenter variant="subtitle2">
                            Chưa có {Messages.user.account}? &nbsp;
                            <NextLink href="/register" passHref>
                              <Link>
                                {setMessage(Messages.action.register)}
                              </Link>
                            </NextLink>
                          </TypographyCenter>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
            <Stack direction="row" justifyContent="space-between">
              <NextLink href="/" passHref>
                <Typography
                  variant="subtitle2"
                  component={Link}
                  target="_blank"
                  underline="hover"
                >
                  {appShortTitle}
                </Typography>
              </NextLink>
              <NextLink href="/" passHref>
                <Typography
                  variant="subtitle2"
                  component={Link}
                  target="_blank"
                  underline="hover"
                >
                  &copy; 2022 {appShortTitle}
                </Typography>
              </NextLink>
            </Stack>
          </Grid>
        </Grid>
      </AuthPageBackground>
    </AppPage>
  );
};

Page.layout = NoneLayout;

export default Page;

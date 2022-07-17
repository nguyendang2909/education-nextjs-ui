import {
  Card,
  CardContent,
  Grid,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ChangePasswordForm } from '../components/Form/ChangePasswordForm';
import { NextLink } from '../components/Link';
import { LogoLinkWithShortTitle } from '../components/Logo';
import { AppPage } from '../components/Page/AppPage';
import { NoneLayout } from '../Layout/NoneLayout';
import { appShortTitle, Messages, setMessage } from '../lib/messages';
import { useAppSelector } from '../store/hooks';
import { NextPageWithLayout } from '../types/components.type';
import { AuthPageBackground } from './login';

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
                                {setMessage(
                                  Messages.action.change,
                                  Messages.user.password,
                                )}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <ChangePasswordForm />
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

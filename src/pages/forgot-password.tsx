import {
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ForgotPasswordForm } from '../components/Form/ForgotPasswordForm';
import { NextLink } from '../components/Link';
import { LogoLinkWithShortTitle } from '../components/Logo';
import { AppPage } from '../components/Page/AppPage';
import { TypographyCenter } from '../components/Text/Typography';
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
    <AppPage title={Messages.action.forgotPassword}>
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
                                {setMessage(Messages.action.forgotPassword)}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <ForgotPasswordForm redirect={redirect} />
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

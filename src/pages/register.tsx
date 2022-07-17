import React from 'react';
import {
  Card,
  Link,
  Typography,
  Grid,
  CardContent,
  Stack,
  useMediaQuery,
  useTheme,
  Divider,
  Button,
} from '@mui/material';
import AuthSocial from '../components/Auth/AuthSocial';
import NextLink from 'next/link';
import { appShortTitle, Messages, setMessage } from '../lib/messages';
import { RegisterForm } from '../components/Form/RegisterForm';
import { NextPageWithLayout } from '../types/components.type';
import { useRouter } from 'next/router';
import { APP_URL } from '../config';
import { NoneLayout } from '../Layout/NoneLayout';
import { AppPage } from '../components/Page/AppPage';
import { AuthPageBackground } from './login';
import { LogoWithShortTitle } from '../components/Logo';
import { TypographyCenter } from '../components/Text/Typography';

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

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const redirect = router.query.redirect as string;

  // return (
  //   <>
  //     <Head>
  //       <title>{messagesService.setPageTitle(Messages.action.register)}</title>
  //     </Head>
  //     <RootStyle>
  //       <AuthSider>
  //         {setMessage(
  //           `${Messages.action.alreadyHave} ${Messages.user.account}?`,
  //         )}
  //         &nbsp;
  //         <NextLink href={APP_URL.login} passHref>
  //           <Link underline="none" variant="subtitle2">
  //             {setMessage(Messages.action.login)}
  //           </Link>
  //         </NextLink>
  //       </AuthSider>

  //       <Hidden mdDown>
  //         <SectionStyle>
  //           <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
  //             Học tập online dễ dàng với {shortTitle}
  //           </Typography>
  //           <Image
  //             alt="register"
  //             src="/static/images/banners/register_banner.png"
  //             width={480}
  //             height={360}
  //           />
  //         </SectionStyle>
  //       </Hidden>

  //       <Container>
  //         <ContentStyle>
  //           <Box sx={{ mb: 5 }}>
  //             <Typography variant="h4" gutterBottom>
  //               Bắt đầu học miễn phí
  //             </Typography>
  //             <Typography sx={{ color: 'text.secondary' }}>
  //               Hiệu quả. Giáo trình chất lượng.
  //             </Typography>
  //           </Box>

  //           <AuthSocial />

  //           <RegisterForm redirect={redirect} />

  //           <Typography
  //             variant="body2"
  //             align="center"
  //             sx={{ color: 'text.secondary', mt: 3 }}
  //           >
  //             Tôi đồng ý với {shortTitle} &nbsp;
  //             <NextLink href={APP_URL.termsOfService} passHref>
  //               <Link underline="always" sx={{ color: 'text.primary' }}>
  //                 {setMessage(Messages.app.termsOfService)}
  //               </Link>
  //             </NextLink>
  //             &nbsp;và&nbsp;
  //             <NextLink href={APP_URL.privacyPolicy} passHref>
  //               <Link underline="always" sx={{ color: 'text.primary' }}>
  //                 {setMessage(Messages.app.privacyPolicy)}
  //               </Link>
  //             </NextLink>
  //             .
  //           </Typography>

  //           <Hidden smUp>
  //             <Typography
  //               variant="subtitle2"
  //               sx={{ mt: 3, textAlign: 'center' }}
  //             >
  //               {setMessage(
  //                 `${Messages.action.alreadyHave} ${Messages.user.account}?`,
  //               )}
  //               &nbsp;
  //               <NextLink href={APP_URL.login} passHref>
  //                 <Link>{setMessage(Messages.action.login)}</Link>
  //               </NextLink>
  //             </Typography>
  //           </Hidden>
  //         </ContentStyle>
  //       </Container>
  //     </RootStyle>
  //   </>
  // );

  return (
    <AppPage title={Messages.action.register}>
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
                        <LogoWithShortTitle />
                      </Grid>

                      <Grid item xs={12}>
                        <Grid
                          container
                          direction={matchDownSM ? 'column-reverse' : 'row'}
                          alignItems="center"
                          justifyContent="center"
                        >
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
                              {setMessage(Messages.action.register)}
                            </Typography>
                          </Stack>
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
                        <RegisterForm redirect={redirect} />
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
                            {setMessage(
                              `${Messages.action.alreadyHave} ${Messages.user.account}?`,
                            )}
                            &nbsp;
                            <NextLink href={APP_URL.login} passHref>
                              <Link>{setMessage(Messages.action.login)}</Link>
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

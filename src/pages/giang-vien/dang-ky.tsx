import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BoxRightText, BoxSpacingBottom } from '../../components/Box';
import { ButtonToHome } from '../../components/Button/ActionButton';
import { ContainerSpacing } from '../../components/Container';
import { AppLink, NextLink } from '../../components/Link';
import { AppPage } from '../../components/Page/AppPage';
import { TypographyCenter } from '../../components/Text/Typography';
import { CardEditUserInfo } from '../../components/User/CardEditUserInfo';
import { APP_URL } from '../../config';
import { PrivateMainLayout } from '../../Layout/PrivateMainLayout';
import { appShortTitle, Messages } from '../../lib/messages';
import { notificationService } from '../../lib/notificationService';
import { usersService } from '../../lib/users.service';
import { useAppSelector } from '../../store/hooks';
import { fetchCurrentUserThunk } from '../../store/reducers/user.reducer';
import { NextPageWithLayout } from '../../types/components.type';
import { ERegisterTeacher, ERole } from '../../types/enums';

const Page: NextPageWithLayout = () => {
  const userInfo = useAppSelector(state => state.user?.info);

  const [isLoading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleRegisterTeacher = async (register: ERegisterTeacher) => {
    try {
      setLoading(true);

      await usersService.update({ registerTeacher: register });

      dispatch(fetchCurrentUserThunk());
    } catch (err) {
      notificationService.handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = `${Messages.action.register} ${Messages.teacher.name}`;

  return (
    <AppPage
      title={pageTitle}
      header={{
        breadcrumbs: [
          {
            title: pageTitle,
          },
        ],
      }}
    >
      <ContainerSpacing>
        {userInfo?.role === ERole.Teacher && (
          <>
            <TypographyCenter variant="h3" gutterBottom>
              B???n ???? l?? gi???ng vi??n
            </TypographyCenter>
            <Box sx={{ textAlign: 'center' }}>
              <NextLink href={APP_URL.teacher.management}>
                <Button size="large" variant="contained">
                  Truy c???p trang qu???n l??
                </Button>
              </NextLink>
            </Box>
          </>
        )}

        {userInfo?.role !== ERole.Teacher &&
          userInfo?.registerTeacher === ERegisterTeacher.pending && (
            <Grid item xs={12} md={6} sx={{ margin: '0 auto' }}>
              <Box>
                <Alert severity="success">
                  <Typography variant="h3" gutterBottom>
                    ????ng k?? th??nh c??ng
                  </Typography>

                  <Typography gutterBottom>
                    {userInfo.displayName} ??i, b???n ???? ho??n th??nh th??? t???c ????ng k??
                    gi???ng vi??n t???i {appShortTitle} r???i nh??
                  </Typography>
                  <Typography gutterBottom>
                    {appShortTitle} s??? g???i k???t qu??? t???i email c???a b???n trong 24
                    gi??? t???i.
                  </Typography>
                  <Typography gutterBottom>
                    Trong l??c ?????i b???n vui l??ng tham quan{' '}
                    <AppLink href={APP_URL.home}>{appShortTitle}</AppLink> nh??!
                  </Typography>
                </Alert>
                <BoxRightText mt={3}>
                  <ButtonToHome />
                </BoxRightText>
              </Box>
            </Grid>
          )}

        {userInfo?.role !== ERole.Teacher &&
          userInfo?.registerTeacher !== ERegisterTeacher.pending &&
          (!userInfo?.fullname ||
            !userInfo?.avatarURL ||
            !userInfo?.description ||
            !userInfo.title) && (
            <>
              <BoxSpacingBottom>
                <TypographyCenter>
                  B???n c???n b??? sung th??ng tin c?? nh??n tr?????c khi ????ng k?? gi???ng vi??n
                </TypographyCenter>
              </BoxSpacingBottom>

              <Grid item xs={12} md={6} sx={{ margin: '0 auto', pb: 2 }}>
                <CardEditUserInfo
                  fullname={!userInfo?.fullname}
                  avatar={!userInfo?.avatarURL}
                  title={!userInfo?.title}
                  address={!userInfo?.address}
                  experience={!userInfo?.experience}
                  description={!userInfo?.description}
                />
              </Grid>
            </>
          )}

        {userInfo?.role !== ERole.Teacher &&
          userInfo?.registerTeacher !== ERegisterTeacher.pending &&
          !!userInfo?.fullname &&
          !!userInfo?.avatarURL &&
          !!userInfo?.description &&
          !!userInfo.title && (
            <>
              <>
                <TypographyCenter variant="h4" gutterBottom>
                  B???n ???? ??i???n ?????y th??? th??ng tin ????? ????ng k?? gi???ng vi??n v???i{' '}
                  {appShortTitle}.
                </TypographyCenter>
                <TypographyCenter variant="h4" gutterBottom>
                  Vui l??ng nh???n x??c nh???n ????? ????ng k??.
                </TypographyCenter>
                <Box sx={{ textAlign: 'center' }}>
                  <LoadingButton
                    variant="contained"
                    size="large"
                    loading={isLoading}
                    onClick={() => {
                      handleRegisterTeacher(ERegisterTeacher.pending);
                    }}
                    sx={{ width: 200 }}
                  >
                    {Messages.action.register} {Messages.teacher.name}
                  </LoadingButton>
                </Box>
              </>
            </>
          )}
      </ContainerSpacing>
    </AppPage>
  );
};

Page.layout = PrivateMainLayout;

export default Page;

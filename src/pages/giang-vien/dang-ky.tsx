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
              Bạn đã là giảng viên
            </TypographyCenter>
            <Box sx={{ textAlign: 'center' }}>
              <NextLink href={APP_URL.teacher.management}>
                <Button size="large" variant="contained">
                  Truy cập trang quản lý
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
                    Đăng ký thành công
                  </Typography>

                  <Typography gutterBottom>
                    {userInfo.displayName} ơi, bạn đã hoàn thành thủ tục đăng ký
                    giảng viên tại {appShortTitle} rồi nhé
                  </Typography>
                  <Typography gutterBottom>
                    {appShortTitle} sẽ gửi kết quả tới email của bạn trong 24
                    giờ tới.
                  </Typography>
                  <Typography gutterBottom>
                    Trong lúc đợi bạn vui lòng tham quan{' '}
                    <AppLink href={APP_URL.home}>{appShortTitle}</AppLink> nhé!
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
                  Bạn cần bổ sung thông tin cá nhân trước khi đăng ký giảng viên
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
                  Bạn đã điền đầy thủ thông tin để đăng ký giảng viên với{' '}
                  {appShortTitle}.
                </TypographyCenter>
                <TypographyCenter variant="h4" gutterBottom>
                  Vui lòng nhấn xác nhận để đăng ký.
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

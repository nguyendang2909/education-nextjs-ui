import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import {
  BoxBackground,
  BoxBackgroundSecondary,
  BoxCenter,
  BoxSpacing,
  BoxSpacingBig,
} from '../components/Box';
import { CardContentCenter, CardFullHeight } from '../components/Card';
import { GridPadding, GridStrech } from '../components/Grid';
import { NextLink } from '../components/Link';
import {
  TypographyCenter,
  TypographyCenterShadowWhite,
} from '../components/Text/Typography';
import { APP_URL } from '../config';
import { appShortTitle, Messages, messagesService } from '../lib/messages';
import { CourseImplementationProcess } from '../modules/Teacher/Course/CourseImplementationProcess';
import { NextPageWithLayout } from '../types/components.type';

const Page: NextPageWithLayout = () => {
  const pageTitle = `Hợp tác giảng dạy cùng ${appShortTitle}`;

  return (
    <>
      <Head>
        <title>{messagesService.setPageTitle(pageTitle)}</title>
      </Head>
      <BoxBackground
        sx={{
          marginTop: -2,
          backgroundImage:
            'url("/static/images/backgrounds/dang-ky-giang-vien-1.jpg")',
        }}
      >
        <Container
          sx={{
            height: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <BoxSpacing>
              <TypographyCenterShadowWhite
                variant="h1"
                sx={{ textAlign: 'center' }}
              >
                {pageTitle}
              </TypographyCenterShadowWhite>
            </BoxSpacing>
            <BoxSpacing>
              <TypographyCenterShadowWhite>
                {'“'}MỖI CHÚNG TA ĐỀU CÓ MỘT SƯ MỆNH CHIA SẺ LẠI GIÁ TRỊ CHO THẾ
                HỆ SAU{'”'}
              </TypographyCenterShadowWhite>
            </BoxSpacing>
            <BoxSpacing>
              <BoxCenter>
                <NextLink href={APP_URL.teacher.register}>
                  <Button
                    variant="contained"
                    // variant="outlined"
                    size="large"
                    sx={{ width: '200px' }}
                  >
                    {Messages.action.registerNow}
                  </Button>
                </NextLink>
              </BoxCenter>
            </BoxSpacing>
          </Box>
        </Container>
      </BoxBackground>

      <Box>
        <BoxSpacingBig>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              <TypographyCenter variant="h2">
                Khám phá tiềm năng của chính bạn
              </TypographyCenter>
              <GridStrech container>
                <GridPadding item xs={12} sm={6} md={12 / 5}>
                  <CardFullHeight>
                    <CardContentCenter>
                      <Box>
                        <Image
                          alt="lam 1 lan ban n lan"
                          src="/static/images/hop-tac/lam-1-lan-ban-n-lan.png"
                          width={100}
                          height={100}
                        />
                      </Box>
                      <Typography>Chia sẻ kiến thức đến mọi người</Typography>
                    </CardContentCenter>
                  </CardFullHeight>
                </GridPadding>
                <GridPadding item xs={12} sm={6} md={12 / 5}>
                  <Card sx={{ height: '100%' }}>
                    <CardContentCenter>
                      <Box>
                        <Image
                          alt="quang ba"
                          src="/static/images/hop-tac/quang-ba.png"
                          width={100}
                          height={100}
                        />
                      </Box>
                      <Typography>Xây dựng cộng đồng học viên</Typography>
                    </CardContentCenter>
                  </Card>
                </GridPadding>
                <GridPadding item xs={12} sm={6} md={12 / 5}>
                  <Card sx={{ height: '100%' }}>
                    <CardContentCenter>
                      <Box>
                        <Image
                          alt="chia se loi nhuan"
                          src="/static/images/hop-tac/chia-se-loi-nhuan.png"
                          width={100}
                          height={100}
                        />
                      </Box>
                      <Typography>Chia sẻ lợi nhuận 30%-100%</Typography>
                    </CardContentCenter>
                  </Card>
                </GridPadding>
                <GridPadding item xs={12} sm={6} md={12 / 5}>
                  <Card sx={{ height: '100%' }}>
                    <CardContentCenter>
                      <Box>
                        <Image
                          alt="thanh toan"
                          src="/static/images/hop-tac/thanh-toan.png"
                          width={100}
                          height={100}
                        />
                      </Box>
                      <Typography>
                        Thanh toán trước ngày 15 hàng tháng
                      </Typography>
                    </CardContentCenter>
                  </Card>
                </GridPadding>
                <GridPadding item xs={12} sm={6} md={12 / 5}>
                  <Card sx={{ height: '100%' }}>
                    <CardContentCenter>
                      <Box>
                        <Image
                          alt="hoc online"
                          src="/static/images/hop-tac/hoc-qua-may-tinh.png"
                          width={100}
                          height={100}
                        />
                      </Box>
                      <Typography>
                        Học qua VOD, Live và offline event
                      </Typography>
                    </CardContentCenter>
                  </Card>
                </GridPadding>
              </GridStrech>
            </Box>
          </Container>
        </BoxSpacingBig>
      </Box>

      <BoxBackgroundSecondary>
        <BoxSpacingBig>
          <Container>
            <CourseImplementationProcess />
          </Container>
        </BoxSpacingBig>
      </BoxBackgroundSecondary>
    </>
  );
};

export default Page;

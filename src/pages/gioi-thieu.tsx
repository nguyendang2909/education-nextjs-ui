import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { ContainerSpacing } from '../components/Container';
import { GridStrech } from '../components/Grid';
import { AppPage } from '../components/Page/AppPage';
import {
  TypographyCenter,
  TypographyOneLine,
  TypographyShadowWhite,
} from '../components/Text/Typography';
import { Messages, setMessage } from '../lib/messages';
import { NextPageWithLayout } from '../types/components.type';
import {
  BoxBackground,
  BoxBackgroundSecondary,
  BoxPositionAbsolute,
  BoxSpacing,
  BoxSpacingBig,
} from '../components/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpenReader,
  faHandshake,
  faPeopleRobbery,
  faPeopleRoof,
} from '@fortawesome/free-solid-svg-icons';
import teachingImage from '../../public/static/images/about/teaching.png';
import missonImage from '../../public/static/images/about/misson.png';
import visionImage from '../../public/static/images/about/vision.png';
import productPersonalityImage from '../../public/static/images/about/product-personality.png';
import practiceImage from '../../public/static/images/about/practice.png';
import perfectImage from '../../public/static/images/about/perfect.png';
import customerFocus from '../../public/static/images/about/customer-focus.png';

const Page: NextPageWithLayout = () => {
  const theme = useTheme();

  const pageTitle = Messages.common.about;

  return (
    <AppPage title={pageTitle}>
      <BoxBackground
        sx={{
          marginTop: -2,
          backgroundImage: 'url("/static/images/backgrounds/banner-about.png")',

          padding: theme.spacing(4, 0),
        }}
      >
        <Container>
          <Box
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              minHeight: '500px',
            }}
          >
            <Box>
              <TypographyShadowWhite
                variant="h1"
                sx={{
                  fontSize: '50px',
                  padding: theme.spacing(2, 0),
                }}
              >
                {setMessage(Messages.app.siteTitle)}
              </TypographyShadowWhite>

              <TypographyShadowWhite
                variant="h3"
                sx={{
                  lineHeight: '3rem',
                }}
              >
                Nền tảng học tập trực tuyến dành cho tất cả mọi người
              </TypographyShadowWhite>
            </Box>
          </Box>
        </Container>
      </BoxBackground>

      <BoxSpacingBig>
        <Container>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Image src={teachingImage} alt="giang-day" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                height="100%"
                gap="16px"
                padding={{ md: 5 }}
              >
                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <BoxPositionAbsolute
                        sx={{
                          width: '80px',
                          height: '80px',
                        }}
                      >
                        <Image
                          src={missonImage}
                          alt="su-menh"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                        />
                      </BoxPositionAbsolute>
                      <Box sx={{ minWidth: '80px', minHeight: '80px' }}></Box>

                      <Box>
                        <Typography variant="subtitle1">Sứ mệnh</Typography>
                        <Typography>
                          Giúp khách hàng học mọi kỹ năng online
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <BoxPositionAbsolute
                        sx={{
                          width: '80px',
                          height: '80px',
                        }}
                      >
                        <Image
                          src={visionImage}
                          alt="tam-nhin"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                        />
                      </BoxPositionAbsolute>

                      <Box sx={{ minWidth: '80px', minHeight: '80px' }}></Box>

                      <Box>
                        <Typography variant="subtitle1">Tầm nhìn</Typography>
                        <Typography>
                          Nền tảng phát triển kỹ năng làm việc cho khách hàng cá
                          nhân và tổ chức hàng đầu Khu vực Đông Nam Á.
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </BoxSpacingBig>

      <BoxBackgroundSecondary>
        <BoxSpacingBig>
          <Container>
            <BoxSpacing>
              <TypographyCenter variant="h2">Giá trị cốt lõi</TypographyCenter>
            </BoxSpacing>

            <Grid container>
              <Grid xs={12} sm={6} md={3}>
                <Stack>
                  <Box sx={{ margin: '0 auto' }}>
                    <Avatar sx={{ height: '64px', width: '64px' }}>
                      <FontAwesomeIcon
                        icon={faBookOpenReader}
                        color="rgba(33, 55, 78, 1)"
                        fontSize="32px"
                      />
                    </Avatar>
                  </Box>

                  <Box>
                    <TypographyCenter variant="h3" gutterBottom>
                      Trí tuệ
                    </TypographyCenter>
                    <Typography>
                      Thể hiện qua không ngừng học tập, suy nghĩ và hành động
                      dựa trên kiến thức, kinh nghiệm, sự hiểu biết; phán đoán
                      không thiên vị và có lòng trắc ẩn (lòng khoan dung).
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid xs={12} sm={6} md={3}>
                <Stack>
                  <Box sx={{ margin: '0 auto' }}>
                    <Avatar sx={{ height: '64px', width: '64px' }}>
                      <FontAwesomeIcon
                        icon={faPeopleRobbery}
                        color="rgba(33, 55, 78, 1)"
                        fontSize="32px"
                      />
                    </Avatar>
                  </Box>

                  <Box>
                    <TypographyCenter variant="h3" gutterBottom>
                      Tôn trọng
                    </TypographyCenter>
                    <Typography>
                      Thể hiện qua ứng xử, là sự đánh giá đúng mực, coi trọng
                      danh dự, phẩm giá và lợi ích của người khác.
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid xs={12} sm={6} md={3}>
                <Stack>
                  <Box sx={{ margin: '0 auto' }}>
                    <Avatar sx={{ height: '64px', width: '64px' }}>
                      <FontAwesomeIcon
                        icon={faPeopleRoof}
                        color="rgba(33, 55, 78, 1)"
                        fontSize="32px"
                      />
                    </Avatar>
                  </Box>

                  <Box>
                    <TypographyCenter variant="h3" gutterBottom>
                      Thấu hiểu
                    </TypographyCenter>
                    <Typography>
                      Thể hiện qua việc đặt địa vị của mình vào đồng nghiệp, vào
                      khách hàng để mang lại cho họ giá trị trên mong đợi.
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid xs={12} sm={6} md={3}>
                <Stack>
                  <Box sx={{ margin: '0 auto' }}>
                    <Avatar sx={{ height: '64px', width: '64px' }}>
                      <FontAwesomeIcon
                        icon={faHandshake}
                        color="rgba(33, 55, 78, 1)"
                        fontSize="32px"
                      />
                    </Avatar>
                  </Box>

                  <Box>
                    <TypographyCenter variant="h3" gutterBottom>
                      Đáng tin cậy
                    </TypographyCenter>
                    <Typography>
                      Thể hiện qua việc làm cho đồng nghiệp, đối tác và khách
                      hàng cảm thấy thực sự yên tâm, tin tưởng trong mọi công
                      việc.
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </BoxSpacingBig>
      </BoxBackgroundSecondary>

      <BoxSpacingBig>
        <Container>
          <BoxSpacing>
            <TypographyCenter variant="h2">Tính cách sản phẩm</TypographyCenter>
          </BoxSpacing>

          <Grid container>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <BoxPositionAbsolute
                    sx={{
                      width: '80px',
                      height: '80px',
                    }}
                  >
                    <Image
                      src={practiceImage}
                      alt="su-menh"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </BoxPositionAbsolute>
                  <Box sx={{ minWidth: '80px', minHeight: '80px' }}></Box>

                  <Box>
                    <Typography variant="subtitle1">Thực tiễn</Typography>
                    <Typography>
                      Sản phẩm thực tế, có lộ trình, dễ sử dụng. Có tính ứng
                      dụng cao.
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <BoxPositionAbsolute
                    sx={{
                      width: '80px',
                      height: '80px',
                    }}
                  >
                    <Image
                      src={perfectImage}
                      alt="su-menh"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </BoxPositionAbsolute>
                  <Box sx={{ minWidth: '80px', minHeight: '80px' }}></Box>

                  <Box>
                    <Typography variant="subtitle1">
                      Luôn hướng tới sự hoàn hảo
                    </Typography>
                    <Typography>
                      Không ngừng cải tiến và đặt ra những tiêu chuẩn chất lượng
                      cao nhất.
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <BoxPositionAbsolute
                    sx={{
                      width: '80px',
                      height: '80px',
                    }}
                  >
                    <Image
                      src={customerFocus}
                      alt="su-menh"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </BoxPositionAbsolute>
                  <Box sx={{ minWidth: '80px', minHeight: '80px' }}></Box>

                  <Box>
                    <Typography variant="subtitle1">
                      Tập trung vào khách hàng
                    </Typography>
                    <Typography>
                      Tập trung vào dịch vụ khách hàng và trải nghiệm khách
                      hàng, lấy khách hàng làm trọng tâm và cung cấp giá trị
                      vượt mong đợi
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Image src={productPersonalityImage} alt="giang-day" />
            </Grid>
          </Grid>
        </Container>
      </BoxSpacingBig>

      <BoxBackgroundSecondary>
        <BoxSpacingBig>
          <Container>
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Box pb={3}>
                  <Typography
                    variant="h2"
                    sx={{
                      textAlign: 'center',

                      lineHeight: '3rem',
                      padding: theme.spacing(2, 0),
                    }}
                  >
                    Trải nghiệm phương pháp học tập hiện đại
                  </Typography>
                </Box>
                <GridStrech container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Image
                          alt="hoc moi luc moi noi"
                          src="/static/images/cards/hoc-moi-luc-moi-noi.png"
                          width={100}
                          height={100}
                        />
                        <TypographyCenter>
                          Học mọi lúc, mọi nơi
                        </TypographyCenter>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Image
                          alt="chi phi hop ly"
                          src="/static/images/cards/chi-phi-hop-ly.png"
                          width={100}
                          height={100}
                        />
                        <TypographyCenter>Chi phí hợp lý</TypographyCenter>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Image
                          alt="tinh ung dung cao"
                          src="/static/images/cards/tinh-ung-dung-cao.png"
                          width={100}
                          height={100}
                        />
                        <TypographyCenter>Tính ứng dụng cao</TypographyCenter>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Image
                          alt="tuong tac voi giang vien"
                          src="/static/images/cards/tuong-tac-voi-giang-vien.png"
                          width={100}
                          height={100}
                        />
                        <TypographyCenter>
                          Tương tác với giảng viên
                        </TypographyCenter>
                      </CardContent>
                    </Card>
                  </Grid>
                </GridStrech>
              </Box>
            </Box>
          </Container>
        </BoxSpacingBig>
      </BoxBackgroundSecondary>

      <BoxSpacingBig>
        <Container>
          <Box
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              minHeight: '400px',
              paddingBottom: 3,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Box pb={3}>
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    lineHeight: '3rem',
                    padding: theme.spacing(2, 0),
                  }}
                >
                  Lợi thế mô hình đào tạo E-Learning
                </Typography>
              </Box>

              <Stack direction="row" spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <TypographyCenter variant="h3">
                        Cơ hội nghề nghiệp
                      </TypographyCenter>
                      <Box sx={{ padding: theme.spacing(1, 0) }}>
                        <Image
                          alt="co hoi nghe nghiep"
                          src="/static/images/cards/co-hoi-nghe-nghiep.png"
                          width={110}
                          height={110}
                        ></Image>
                      </Box>
                      <TypographyCenter>
                        {setMessage(Messages.app.shortTitle)} luôn chào đón
                        những nhân tố tài năng và tâm huyết với sứ mệnh {'"'}
                        nâng cao giá trị tri thức, phục vụ hàng triệu người Việt
                        Nam{'"'}
                      </TypographyCenter>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <TypographyCenter variant="h3">
                        Tư vấn & Hỗ trợ
                      </TypographyCenter>
                      <Box sx={{ padding: theme.spacing(1, 0) }}>
                        <Image
                          alt="tu van ho tro"
                          src="/static/images/cards/tu-van-ho-tro.png"
                          width={110}
                          height={110}
                        ></Image>
                      </Box>
                      <TypographyCenter>
                        {setMessage(Messages.app.shortTitle)} sẽ giải đáp mọi
                        câu hỏi của bạn qua: Hotline {Messages.app.hotline}{' '}
                        (8h30-22h000 kể cả T7, CN) và email: {Messages.app.mail}
                      </TypographyCenter>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <TypographyCenter variant="h3">
                        Trở thành Affiliate
                      </TypographyCenter>
                      <Box sx={{ padding: theme.spacing(1, 0) }}>
                        <Image
                          alt="tro thanh affiliate"
                          src="/static/images/cards/tro-thanh-affiliate.png"
                          width={110}
                          height={110}
                        ></Image>
                      </Box>
                      <TypographyCenter>
                        Mọi thông tin hợp tác và giảng dạy xin vui lòng liên hệ
                        với Mr Vương Giám đốc Unica qua Email:{' '}
                        {Messages.app.mail}
                      </TypographyCenter>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <TypographyCenter variant="h3">
                        Cơ hội nghề nghiệp
                      </TypographyCenter>
                      <Box sx={{ padding: theme.spacing(1, 0) }}>
                        <Image
                          alt="co hoi nghe nghiep"
                          src="/static/images/cards/co-hoi-nghe-nghiep.png"
                          width={110}
                          height={110}
                        ></Image>
                      </Box>
                      <TypographyCenter>
                        {setMessage(Messages.app.shortTitle)} luôn chào đón
                        những nhân tố tài năng và tâm huyết với sứ mệnh {'"'}
                        nâng cao giá trị tri thức, phục vụ hàng triệu người Việt
                        Nam{'"'}
                      </TypographyCenter>
                    </CardContent>
                  </Card>
                </Grid>
              </Stack>
            </Box>
          </Box>
        </Container>
      </BoxSpacingBig>
    </AppPage>
  );
};

export default Page;

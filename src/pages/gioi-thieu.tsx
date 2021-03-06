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
                N????n ta??ng ho??c t????p tr????c tuy????n da??nh cho t???t c??? m???i ng?????i
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
                        <Typography variant="subtitle1">S??? m???nh</Typography>
                        <Typography>
                          Giu??p kha??ch ha??ng ho??c mo??i ky?? n??ng online
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
                        <Typography variant="subtitle1">T???m nh??n</Typography>
                        <Typography>
                          N???n t???ng ph??t tri???n k??? n??ng l??m vi???c cho kha??ch ha??ng ca??
                          nh??n va?? t???? ch????c h??ng ?????u Khu v???c ????ng Nam ??.
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
              <TypographyCenter variant="h2">Gi?? tr??? c???t l??i</TypographyCenter>
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
                      Tri?? tu????
                    </TypographyCenter>
                    <Typography>
                      Th???? hi????n qua kh??ng ng????ng ho??c t????p, suy ngh?? v?? h??nh ?????ng
                      d????a tr??n ki???n th???c, kinh nghi???m, s??? hi???u bi???t; ph??n ??o??n
                      kh??ng thi??n v??? va?? co?? l??ng tr???c ???n (lo??ng khoan dung).
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
                      T??n tr???ng
                    </TypographyCenter>
                    <Typography>
                      Th???? hi????n qua ????ng x????, l?? s??? ????nh gi?? ????ng m???c, coi tr???ng
                      danh d???, ph???m gi?? v?? l???i ??ch c???a ng?????i kh??c.
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
                      Th???u hi???u
                    </TypographyCenter>
                    <Typography>
                      Th???? hi????n qua vi????c ??????t ??i??a vi?? cu??a mi??nh va??o ??????ng nghi????p, va??o
                      kha??ch ha??ng ?????? mang la??i cho ho?? gia?? tri?? tr??n mong ??????i.
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
                      ??a??ng tin c????y
                    </TypographyCenter>
                    <Typography>
                      Th???? hi????n qua vi????c la??m cho ??????ng nghi????p, ??????i ta??c va?? kha??ch
                      ha??ng ca??m th????y th????c s???? y??n t??m, tin t??????ng trong mo??i c??ng
                      vi????c.
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
            <TypographyCenter variant="h2">T??nh c??ch s???n ph???m</TypographyCenter>
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
                    <Typography variant="subtitle1">Th???c ti???n</Typography>
                    <Typography>
                      S???n ph???m th???c t???, c?? l??? tr??nh, d??? s??? d???ng. C?? t??nh ???ng
                      d???ng cao.
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
                      Lu??n h?????ng t???i s??? ho??n h???o
                    </Typography>
                    <Typography>
                      Kh??ng ng???ng c???i ti???n v?? ?????t ra nh???ng ti??u chu???n ch???t l?????ng
                      cao nh???t.
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
                      T???p trung v??o kh??ch h??ng
                    </Typography>
                    <Typography>
                      T???p trung v??o d???ch v??? kh??ch h??ng v?? tr???i nghi???m kh??ch
                      h??ng, l???y kh??ch h??ng l??m tr???ng t??m v?? cung c???p gi?? tr???
                      v?????t mong ?????i
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
                    Tr???i nghi???m ph????ng ph??p h???c t???p hi???n ?????i
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
                          H???c m???i l??c, m???i n??i
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
                        <TypographyCenter>Chi ph?? h???p l??</TypographyCenter>
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
                        <TypographyCenter>T??nh ???ng d???ng cao</TypographyCenter>
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
                          T????ng t??c v???i gi???ng vi??n
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
                  L???i th??? m?? h??nh ????o t???o E-Learning
                </Typography>
              </Box>

              <Stack direction="row" spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <TypographyCenter variant="h3">
                        C?? h???i ngh??? nghi???p
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
                        {setMessage(Messages.app.shortTitle)} lu??n ch??o ????n
                        nh???ng nh??n t??? t??i n??ng v?? t??m huy???t v???i s??? m???nh {'"'}
                        n??ng cao gi?? tr??? tri th???c, ph???c v??? h??ng tri???u ng?????i Vi???t
                        Nam{'"'}
                      </TypographyCenter>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <TypographyCenter variant="h3">
                        T?? v???n & H??? tr???
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
                        {setMessage(Messages.app.shortTitle)} s??? gi???i ????p m???i
                        c??u h???i c???a b???n qua: Hotline {Messages.app.hotline}{' '}
                        (8h30-22h000 k??? c??? T7, CN) v?? email: {Messages.app.mail}
                      </TypographyCenter>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <TypographyCenter variant="h3">
                        Tr??? th??nh Affiliate
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
                        M???i th??ng tin h???p t??c v?? gi???ng d???y xin vui l??ng li??n h???
                        v???i Mr V????ng Gi??m ?????c Unica qua Email:{' '}
                        {Messages.app.mail}
                      </TypographyCenter>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <TypographyCenter variant="h3">
                        C?? h???i ngh??? nghi???p
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
                        {setMessage(Messages.app.shortTitle)} lu??n ch??o ????n
                        nh???ng nh??n t??? t??i n??ng v?? t??m huy???t v???i s??? m???nh {'"'}
                        n??ng cao gi?? tr??? tri th???c, ph???c v??? h??ng tri???u ng?????i Vi???t
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

import {
  faClock,
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { LogoWithShortTitle } from '../../components/Logo';
import { appShortTitle, Messages, setMessage } from '../../lib/messages';
import { APP_URL } from '../../config';
import { AppLink } from '../../components/Link';
import { styled } from '../../styles/theme';
import { SecondFooter } from '../Common/Footer';

const TextLine = styled(Box)(({ theme }) => ({
  lineHeight: 2,
}));

const FooterLink = styled(AppLink)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const PrivateMainFooter = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(180deg,rgba(47,128,237,.05),hsla(0,0%,100%,0))',
        }}
      >
        <Container sx={{ pt: 3, pb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <LogoWithShortTitle />

              <Typography component="div" sx={{ lineHeight: 2 }}>
                <FontAwesomeIcon icon={faLocationDot} />
                <Box component="span" sx={{ ml: 1 }}>
                  {setMessage(Messages.app.location)}
                </Box>
              </Typography>

              <Typography component="div" sx={{ lineHeight: 2 }}>
                <FontAwesomeIcon icon={faPhone} />
                <Box component="span" sx={{ ml: 1 }}>
                  {Messages.app.phone}
                </Box>
              </Typography>

              <Typography component="div" sx={{ lineHeight: 2 }}>
                <FontAwesomeIcon icon={faEnvelope} />
                <Box component="span" sx={{ ml: 1 }}>
                  {Messages.app.mail}
                </Box>
              </Typography>

              <Typography component="div" sx={{ lineHeight: 2 }}>
                <FontAwesomeIcon icon={faClock} />
                <Box component="span" sx={{ ml: 1 }}>
                  {Messages.app.workTime}
                </Box>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h5" sx={{ lineHeight: 2 }}>{`${setMessage(
                Messages.app.about,
              )} ${appShortTitle}`}</Typography>

              <Box
                sx={{
                  borderBottom: '3px solid',
                  borderColor: 'text.secondary',
                  width: 32,
                }}
              ></Box>

              <TextLine>
                <FooterLink href="/gioi-thieu">
                  Gi???i thi???u v??? {appShortTitle}
                </FooterLink>
              </TextLine>

              {/* <TextLine>
            <FooterLink href={APP_URL.privacyPolicy}>
              Ch??nh s??ch b???o m???t
            </FooterLink>
          </TextLine> */}

              {/* <TextLine>
            <FooterLink href={APP_URL.termsOfService}>
              ??i???u kho???n d???ch v???
            </FooterLink>
          </TextLine> */}

              <TextLine>
                <FooterLink href="/cau-hoi-thuong-gap">
                  C??u h???i th?????ng g???p
                </FooterLink>
              </TextLine>

              <TextLine>
                <FooterLink href="/goc-chia-se">G??c chia s???</FooterLink>
              </TextLine>

              <TextLine>
                <FooterLink href="/huong-dan-thanh-toan">
                  H?????ng d???n thanh to??n
                </FooterLink>
              </TextLine>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h5"
                sx={{
                  lineHeight: 2,
                }}
              >
                H???p t??c v?? li??n k???t
              </Typography>

              <Box
                sx={{
                  borderBottom: '3px solid',
                  borderColor: 'text.secondary',
                  width: 32,
                }}
              ></Box>

              <TextLine>
                <FooterLink href="/dang-ky-giang-vien">
                  D???y h???c tr??n {appShortTitle}
                </FooterLink>
              </TextLine>

              <TextLine>
                <FooterLink href={APP_URL.teacher.management}>
                  D??nh cho gi???ng vi??n
                </FooterLink>
              </TextLine>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h5"
                sx={{
                  lineHeight: 2,
                }}
              >
                Th??ng tin Leslei
              </Typography>

              <Box
                sx={{
                  borderBottom: '3px solid',
                  borderColor: 'text.secondary',
                  width: 32,
                }}
              ></Box>

              {/* <TextLine>
            <FooterLink href="/kich-hoat-khoa-hoc">
              K??ch ho???t kho?? h???c
            </FooterLink>
          </TextLine> */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <SecondFooter />
    </>
  );
};

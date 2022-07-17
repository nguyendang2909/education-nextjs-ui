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
                  Giới thiệu về {appShortTitle}
                </FooterLink>
              </TextLine>

              {/* <TextLine>
            <FooterLink href={APP_URL.privacyPolicy}>
              Chính sách bảo mật
            </FooterLink>
          </TextLine> */}

              {/* <TextLine>
            <FooterLink href={APP_URL.termsOfService}>
              Điều khoản dịch vụ
            </FooterLink>
          </TextLine> */}

              <TextLine>
                <FooterLink href="/cau-hoi-thuong-gap">
                  Câu hỏi thường gặp
                </FooterLink>
              </TextLine>

              <TextLine>
                <FooterLink href="/goc-chia-se">Góc chia sẻ</FooterLink>
              </TextLine>

              <TextLine>
                <FooterLink href="/huong-dan-thanh-toan">
                  Hướng dẫn thanh toán
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
                Hợp tác và liên kết
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
                  Dạy học trên {appShortTitle}
                </FooterLink>
              </TextLine>

              <TextLine>
                <FooterLink href={APP_URL.teacher.management}>
                  Dành cho giảng viên
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
                Thông tin Leslei
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
              Kích hoạt khoá học
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

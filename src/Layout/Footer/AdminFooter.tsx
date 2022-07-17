import {
  faClock,
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LogoWithShortTitle } from '../../components/Logo';
import { Messages, setMessage } from '../../lib/messages';
import NextLink from 'next/link';
import { APP_URL } from '../../config';

const shortTitle = setMessage(Messages.app.shortTitle);

const TextLine = styled(Box)(({ theme }) => ({
  lineHeight: 2,
}));

export const AdminFooter = () => {
  return (
    <Container
      maxWidth={false}
      sx={{ borderTop: '1px solid #dcdae0', mt: 3, padding: 2 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
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

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h5" sx={{ lineHeight: 2 }}>{`${setMessage(
            Messages.app.about,
          )} ${shortTitle}`}</Typography>
          <TextLine>
            <NextLink href="/gioi-thieu" passHref>
              <Link>Giới thiệu về {shortTitle}</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href="/khoa-hoc" passHref>
              <Link>Danh sách khoá học</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href="/cau-hoi-thuong-gap" passHref>
              <Link>Câu hỏi thường gặp</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href={APP_URL.termsOfService} passHref>
              <Link>Điều khoản dịch vụ</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href={APP_URL.privacyPolicy} passHref>
              <Link>Chính sách bảo mật</Link>
            </NextLink>
          </TextLine>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h5" sx={{ lineHeight: 2 }}>
            Thông tin Leslei
          </Typography>
          <TextLine>
            <NextLink href="/dang-ky-giang-vien" passHref>
              <Link>Đăng ký giảng viên</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href="/kich-hoat-khoa-hoc" passHref>
              <Link>Kích hoạt khoá học</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href="/goc-chia-se" passHref>
              <Link>Góc chia sẻ</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href="/huong-dan-thanh-toan" passHref>
              <Link>Hướng dẫn thanh toán</Link>
            </NextLink>
          </TextLine>
        </Grid>
      </Grid>
    </Container>
  );
};

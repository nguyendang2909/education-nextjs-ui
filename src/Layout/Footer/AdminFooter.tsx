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
              <Link>Gi???i thi???u v??? {shortTitle}</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href="/khoa-hoc" passHref>
              <Link>Danh s??ch kho?? h???c</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href="/cau-hoi-thuong-gap" passHref>
              <Link>C??u h???i th?????ng g???p</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href={APP_URL.termsOfService} passHref>
              <Link>??i???u kho???n d???ch v???</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href={APP_URL.privacyPolicy} passHref>
              <Link>Ch??nh s??ch b???o m???t</Link>
            </NextLink>
          </TextLine>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h5" sx={{ lineHeight: 2 }}>
            Th??ng tin Leslei
          </Typography>
          <TextLine>
            <NextLink href="/dang-ky-giang-vien" passHref>
              <Link>????ng k?? gi???ng vi??n</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href="/kich-hoat-khoa-hoc" passHref>
              <Link>K??ch ho???t kho?? h???c</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href="/goc-chia-se" passHref>
              <Link>G??c chia s???</Link>
            </NextLink>
          </TextLine>
          <TextLine>
            <NextLink href="/huong-dan-thanh-toan" passHref>
              <Link>H?????ng d???n thanh to??n</Link>
            </NextLink>
          </TextLine>
        </Grid>
      </Grid>
    </Container>
  );
};

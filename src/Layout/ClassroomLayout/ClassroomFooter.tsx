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
import { TypographyCenter } from '../../components/Text/Typography';
import { SecondFooter } from '../Common/Footer';
import {
  faFacebook,
  faFacebookSquare,
  faTiktok,
  faYoutube,
  faYoutubeSquare,
} from '@fortawesome/free-brands-svg-icons';
import govImage from '../../../public/static/images/footer/logo_gov.png';
import Image from 'next/image';

const TextLine = styled(Box)(({ theme }) => ({
  lineHeight: 2,
}));

const FooterLink = styled(AppLink)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const ClassroomFooter = () => {
  return (
    <>
      <SecondFooter />
    </>
  );
};

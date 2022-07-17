import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Hidden, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { BoxSpacing, BoxSpacingBottom } from '../../components/Box';
import { ButtonLink } from '../../components/Button/ButtonLink';
import { APP_URL } from '../../config';
import { styled } from '../../styles/theme';
import registerTeacherBanner from '../../../public/static/images/backgrounds/register-teacher.png';
import { appShortTitle, Messages, setMessage } from '../../lib/messages';

const CourseStarterBoxBackground = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    backgroundSize: 'auto 480px',
    backgroundPosition: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("/static/images/backgrounds/register-teacher.png")`,
    padding: '100px 0px 200px',
    // height: 500,

    // width: 100,
  },
  padding: '60px 0px 40px',
}));

export const RegisterTeacher: FC = () => {
  return (
    <>
      <CourseStarterBoxBackground sx={{}}>
        <Box>
          <BoxSpacingBottom>
            <Typography variant="h2">Hợp tác cùng Leslei</Typography>
          </BoxSpacingBottom>

          <BoxSpacingBottom>
            <Typography>Đăng ký giảng viên chỉ với 5 phút</Typography>
          </BoxSpacingBottom>

          <BoxSpacing>
            <ButtonLink
              href={APP_URL.registerTeacher}
              variant="contained"
              size="large"
              color="primary"
              startIcon={<FontAwesomeIcon icon={faSearch} />}
            >
              {setMessage(Messages.action.register, Messages.teacher.name)}
            </ButtonLink>
          </BoxSpacing>

          <Typography variant="subtitle1">
            500+ giảng viên đã có khóa học trên {appShortTitle}
          </Typography>

          <Hidden mdUp>
            <BoxSpacing>
              <Image
                alt="leslei_banner"
                src={registerTeacherBanner}
                layout="responsive"
                objectFit="contain"
              />
            </BoxSpacing>
          </Hidden>
        </Box>
      </CourseStarterBoxBackground>
    </>
  );
};

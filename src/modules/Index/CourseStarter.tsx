import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Hidden, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { BoxSpacing, BoxSpacingBottom } from '../../components/Box';
import { ButtonLink } from '../../components/Button/ButtonLink';
import { APP_URL } from '../../config';
import { styled } from '../../styles/theme';
import indexAboutBanner from '../../../public/static/images/backgrounds/index-about.png';

const CourseStarterBoxBackground = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    backgroundSize: 'auto 520px',
    backgroundPosition: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("/static/images/backgrounds/index-about.png")`,
    padding: '100px 0px 200px',
  },
  padding: '60px 0px 40px',
}));

export const CourseStarter: FC = () => {
  return (
    <>
      <CourseStarterBoxBackground sx={{}}>
        <Box>
          <BoxSpacingBottom>
            <Typography variant="h1" color="#334d6e">
              Học trực tuyến,
              <br />
              <span style={{ color: '#2f80ed' }}>giải đáp trực tiếp</span>
            </Typography>
          </BoxSpacingBottom>

          <BoxSpacingBottom>
            <Typography sx={{ fontSize: '1.2rem' }}>
              Bằng những khóa học dành riêng cho người đi làm
            </Typography>
          </BoxSpacingBottom>

          <BoxSpacing>
            <ButtonLink
              href={APP_URL.courses}
              variant="contained"
              size="large"
              color="primary"
              startIcon={<FontAwesomeIcon icon={faSearch} />}
            >
              Chọn ngay khoá học
            </ButtonLink>
          </BoxSpacing>

          <Hidden mdUp>
            <BoxSpacing>
              <Image
                alt="leslei_banner"
                src={indexAboutBanner}
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

// export const CourseStarter: FC = () => {
//   return (
//     <>
//       <Grid container spacing={3}>
//         <Hidden smDown>
//           <Grid item xs={12} md={6}>
//             <BoxBackground
//               sx={{
//                 backgroundImage: 'url("/static/images/banners/student.jpg")',
//                 width: '100%',
//                 height: '100%',
//               }}
//             ></BoxBackground>
//           </Grid>
//         </Hidden>

//         <Grid item xs={12} md={6}>
//           <Box>
//             <Typography variant="h1" gutterBottom>
//               Học online,
//               <br />
//               dành cho mỗi người.
//               <br />
//               Kết quả thực tế.
//             </Typography>
//             <Typography gutterBottom>
//               Sứ mệnh cung cấp nền giáo dục miễn phí, đẳng cấp thế giới cho mọi
//               người, ở bất kỳ đâu.
//             </Typography>
//             <Stack direction="row" spacing={2}>
//               <ButtonLink
//                 href={APP_URL.classrooms}
//                 variant="contained"
//                 size="large"
//                 color="primary"
//                 startIcon={<FontAwesomeIcon icon={faArrowRight} />}
//               >
//                 Học ngay
//               </ButtonLink>
//               <ButtonLink
//                 href={APP_URL.courses}
//                 variant="outlined"
//                 size="large"
//                 color="primary"
//                 startIcon={<FontAwesomeIcon icon={faSearch} />}
//               >
//                 {setMessage(Messages.action.find, Messages.course.name)}
//               </ButtonLink>
//             </Stack>
//           </Box>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

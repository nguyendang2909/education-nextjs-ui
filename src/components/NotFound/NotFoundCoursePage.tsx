import { FC } from 'react';
import { Box, Button, Stack, Container } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Messages, setMessage } from '../../lib/messages';
import NextLink from 'next/link';
import { NotificationBox } from '../Notification/NotificationBox';
import Head from 'next/head';

// const RootStyle = styled('div')(({ theme }) => ({
//   display: 'flex',
//   minHeight: '100%',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// export const NotFoundCourseContenta: FC = () => {
//   const router = useRouter();

//   const goBack = () => {
//     router.back();
//   };

//   return (
//     <RootStyle title="404 Không Tìm Thấy Khoá Học | Education">
//       <MotionContainer open>
//         <Box sx={{ maxWidth: 768, margin: 'auto', textAlign: 'center' }}>
//           <motion.div variants={varBounceIn}>
//             <Typography variant="h3" paragraph>
//               Không tìm thấy khoá học! Vui lòng thử lại.
//             </Typography>
//           </motion.div>

//           <motion.div variants={varBounceIn}>
//             <Box
//               component="img"
//               src="/static/images/status_code/404.svg"
//               sx={{ height: 260, mx: 'auto', padding: { xs: 2, sm: 4 } }}
//             />
//           </motion.div>
//           <Stack direction="row" justifyContent="center" spacing={2}>
//             <Button
//               size="large"
//               variant="outlined"
//               startIcon={<FontAwesomeIcon icon="arrow-left" />}
//               onClick={goBack}
//             >
//               {setMessage(Messages.navigator.goBack)}
//             </Button>

//             <NextLink href="/" passHref>
//               <Button
//                 size="large"
//                 variant="contained"
//                 startIcon={<FontAwesomeIcon icon={faHome} />}
//               >
//                 {setMessage(Messages.navigator.homePage)}
//               </Button>
//             </NextLink>
//           </Stack>
//         </Box>
//       </MotionContainer>
//     </RootStyle>
//   );
// };

export const NotFoundCoursePage: FC = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Không tìm thấy khoá học</title>
      </Head>

      <Container>
        <NotificationBox
          title="  Không tìm thấy khoá học! Vui lòng thử lại."
          image={
            <Box
              component="img"
              src="/static/images/status_code/404.svg"
              sx={{ height: 260 }}
            />
          }
          actions={
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button
                size="large"
                variant="outlined"
                startIcon={<FontAwesomeIcon icon="arrow-left" />}
                onClick={goBack}
              >
                {setMessage(Messages.navigator.goBack)}
              </Button>

              <NextLink href="/" passHref>
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<FontAwesomeIcon icon={faHome} />}
                >
                  {setMessage(Messages.navigator.homePage)}
                </Button>
              </NextLink>
            </Stack>
          }
        />
      </Container>
    </>
  );
};

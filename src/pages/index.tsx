import Head from 'next/head';
import { Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { GetServerSideProps } from 'next';
import { Fragment } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { MainLayout } from '../Layout/MainLayout';
import { courseCategoriesService } from '../lib/course-categories.service';
import { coursesService } from '../lib/courses.service';
import { appShortTitle, Messages, setMessage } from '../lib/messages';
import { teachersService } from '../lib/teachers.service';
import { NextPageWithLayout } from '../types/components.type';
import {
  ContainerSpacing,
  ContainerSpacingBig,
  ContainerSpacingBottom,
} from '../components/Container';
import { BoxSpacing, BoxSpacingBottom } from '../components/Box';
import { TeachersSlider } from '../modules/Teacher/TeachersSlider';
import { CourseStarter } from '../modules/Index/CourseStarter';
import { ReasonToStudyBox } from '../components/Box/ReasonToStudyBox';
import { CourseCategoryGridCards } from '../modules/CourseCategory/CourseCategoryGridCards';
import { CourseCatalog } from '../modules/Course/CourseCatalog';
import { RegisterTeacher } from '../modules/Index/RegisterTeacher';
import { CoursesSlider } from '../modules/Course/CourseSlider';
import { useCourseCategories } from '../hooks/useCourseCategories';

const Page: NextPageWithLayout = props => {
  const theme = useTheme();

  const { data: courseCategories } = useCourseCategories();

  const { data: featureTeachers } = useQuery(
    'getFeatureTeachers',
    () => teachersService.getMany({ feature: true }),
    {
      enabled: true,
      staleTime: Infinity,
    },
  );

  const { data: topSaleCourses } = useQuery('topSaleCourses', () =>
    coursesService.getMany({ sortBy: 'popularity', pageSize: 20 }),
  );

  const { data: freeCourses = [] } = useQuery('freeCourses', () =>
    coursesService.getMany({ free: true, pageSize: 20 }),
  );

  return (
    <>
      <Head>
        <title>{setMessage(Messages.app.title)}</title>
      </Head>

      {/* {!!courseCategories && courseCategories.length > 0 && (
        <ContainerSpacing>
          <CourseCategoriesHorizontalMenu data={courseCategories} />
        </ContainerSpacing>
      )} */}

      {/* <BoxSpacing>
        <Container>
          <AppBannerSlider />
        </Container>
      </BoxSpacing> */}

      <ContainerSpacingBottom>
        <CourseStarter />
      </ContainerSpacingBottom>

      <BoxSpacing
        sx={{
          backgroundImage:
            'linear-gradient(0deg, rgba(47, 128, 237, 0.05), rgba(255, 255, 255, 0)), linear-gradient(0deg, rgb(255, 255, 255), rgb(255, 255, 255))',
        }}
      >
        <ContainerSpacingBig>
          <ReasonToStudyBox />
        </ContainerSpacingBig>
      </BoxSpacing>

      {!!courseCategories && courseCategories?.length > 0 && (
        <ContainerSpacing>
          <Typography variant="h2" gutterBottom>
            Kho?? h???c d??nh cho b???n
          </Typography>
          <CourseCatalog courseCategories={courseCategories} />
        </ContainerSpacing>
      )}

      {!!topSaleCourses && topSaleCourses.length > 0 && (
        <ContainerSpacing>
          <Typography variant="h2">
            {setMessage(Messages.course.topSale)}
          </Typography>
          <Box>
            <CoursesSlider courses={topSaleCourses} />
          </Box>
        </ContainerSpacing>
      )}

      {!!freeCourses && freeCourses.length > 0 && (
        <>
          <ContainerSpacingBig>
            <Typography variant="h2">
              {setMessage(Messages.course.name, Messages.course.free)}
            </Typography>
            <Box>
              <CoursesSlider courses={freeCourses} />
            </Box>
          </ContainerSpacingBig>
        </>
      )}

      <ContainerSpacingBig>
        <BoxSpacingBottom>
          <Typography variant="h2" gutterBottom>
            Ch??? ????? kho?? h???c t???i {appShortTitle}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Nhi???u kho?? h???c b??? ??ch ??ang ch??? b???n kh??m ph??
          </Typography>
        </BoxSpacingBottom>

        {!!courseCategories && courseCategories.length > 0 && (
          <Box sx={{ padding: theme.spacing(1, 0) }}>
            <CourseCategoryGridCards courseCategories={courseCategories} />
          </Box>
        )}
      </ContainerSpacingBig>

      {!!featureTeachers?.length && (
        <ContainerSpacingBig>
          <Box>
            <Typography variant="h2" gutterBottom>
              Gi???ng vi??n ti??u bi???u
            </Typography>
          </Box>

          <Box>
            <TeachersSlider teachers={featureTeachers} />
          </Box>
        </ContainerSpacingBig>
      )}

      <ContainerSpacing>
        <RegisterTeacher />
      </ContainerSpacing>

      {/* <BoxBackground
        sx={{
          backgroundImage:
            'url("/static/images/backgrounds/dang-ky-giang-vien.jpg")',
        }}
      >
        <ContainerSpacingBig>
          <TypographyWhite
            variant="h2"
            sx={{ textAlign: 'center', padding: theme.spacing(2.5, 0) }}
          >
            Tr??? th??nh Gi???ng vi??n {appShortTitle}
          </TypographyWhite>
          <TypographyWhite
            sx={{ textAlign: 'center', padding: theme.spacing(2.5, 0) }}
          >
            H??n 500 gi???ng vi??n ???? c?? kh??a h???c tr??n {appShortTitle}
          </TypographyWhite>
          <Box sx={{ textAlign: 'center', padding: theme.spacing(2.5, 0) }}>
            <NextLink href="/dang-ky-giang-vien" passHref>
              <Button
                size="large"
                variant="outlined"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  textTransform: 'uppercase',
                }}
              >
                {Messages.action.registerNow}
              </Button>
            </NextLink>
          </Box>
        </ContainerSpacingBig>
      </BoxBackground> */}
    </>
  );
};

Page.layout = MainLayout;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery('getCourses', () => coursesService.getMany());

  await queryClient.prefetchQuery('courseCategories', () =>
    courseCategoriesService.getAll({ countCourses: true }),
  );

  await queryClient.prefetchQuery(['coursesCatalog', 0], () =>
    coursesService.getMany({
      sortBy: 'popularity',
      pageSize: 20,
    }),
  );

  await queryClient.prefetchQuery('getFeatureTeachers', () =>
    teachersService.getMany({ feature: true }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;

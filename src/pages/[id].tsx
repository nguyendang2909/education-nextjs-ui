import { Grid, Hidden, Stack, Container } from '@mui/material';
import { Box } from '@mui/system';
import { CourseAbout } from '../modules/Course/CourseAbout';
import { CourseContentCard } from '../modules/Course/CourseContentCard';
import { CourseIntroduction } from '../modules/Course/CourseIntroductionCard';
import { CourseLearnCard } from '../modules/Course/CourseLearnCard';
import { CourseOutput } from '../modules/Course/CourseOutput';
import { coursesService } from '../lib/courses.service';
import { Messages, messagesService } from '../lib/messages';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NotFoundCoursePage } from '../components/NotFound/NotFoundCoursePage';
import { NextPageWithLayout } from '../types/components.type';
import { ContainerSpacing } from '../components/Container';
import { requestService } from '../lib/request';
import { APP_URL } from '../config';
import { courseRatingsService } from '../lib/course-ratings.service';
import { TypographyCapitalize } from '../components/Text/Typography';
import { BoxBackground } from '../components/Box';
import { Fragment } from 'react';
import { CourseRatingsStack } from '../modules/CourseRating/CourseRatingBoxes';
import { CourseRatingAverageGridContainer } from '../modules/CourseRating/CourseRatingAverageOveview';
import { CourseBannerInfoBox } from '../modules/Course/CourseBannerInfoBox';
import { NotFoundPage } from '../components/NotFound/NotFountPage';
import { useAppSelector } from '../store/hooks';
import { cartsService } from '../lib/carts.service';
import { notificationService } from '../lib/notificationService';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchCartCountThunk } from '../store/reducers/cart.reducer';
import { CourseLearnNav } from '../modules/Course/CourseLearnNav';
import { AppPage } from '../components/Page/AppPage';
import { LoadingContainer } from '../components/Container/LoadingContainer';

const Page: NextPageWithLayout = props => {
  const router = useRouter();

  const currentUrl = router.asPath;

  const courseId = coursesService.getIdFromParamId(router.query.id as string);

  const currentUserId = useAppSelector(state => state.user?.info?.id);

  const dispatch = useDispatch();

  const {
    isSuccess,
    data: course,
    isLoading,
    isError,
  } = useQuery(
    ['course', courseId],
    () => coursesService.getOneById(courseId),
    {
      enabled: router.isReady && !!courseId && courseId > 0,
      staleTime: Infinity,
    },
  );

  const { data: courseOrder, refetch: refetchCourseOrder } = useQuery(
    ['courseOrder', courseId],
    () => coursesService.getOrderById(courseId),
    {
      enabled:
        router.isReady &&
        !!courseId &&
        courseId > 0 &&
        !!currentUserId &&
        currentUserId > 0,
    },
  );

  // const { data: courseCart } = useQuery(
  //   ['courseCart', courseId],
  //   () => coursesService.getCartById(courseId),
  //   {
  //     enabled: router.isReady && !!courseId && courseId > 0,
  //   },
  // );

  const { data: courseRatings } = useQuery(
    ['courseRating', courseId],
    () => courseRatingsService.getMany({ courseId: courseId }),
    {
      enabled: router.isReady && !!courseId && courseId > 0,
      staleTime: Infinity,
    },
  );

  const { data: countCourseRatings } = useQuery(
    ['countCourseRatings', courseId],
    () => courseRatingsService.count({ courseId: courseId }),
    {
      enabled: router.isReady,
      staleTime: Infinity,
    },
  );

  const pageTitle = messagesService.setPageTitle(
    course?.name || Messages.course.name,
  );

  const registerToLearn = async () => {
    if (!currentUserId) {
      router.push({
        pathname: APP_URL.login,
        query: {
          redirect: currentUrl,
        },
      });

      return;
    }

    try {
      const registerCart = await cartsService.addToCart({ courseId });

      if (registerCart) {
        if (registerCart.id) {
          router.push({
            pathname: APP_URL.cart,
            query: {
              cartId: registerCart.id,
            },
          });

          return;
        } else {
          refetchCourseOrder();

          toast.success('Đăng ký khoá học thành công');

          return;
        }
      }
    } catch (err) {
      notificationService.handleError(err);
    }
  };

  const addToCart = async () => {
    if (!currentUserId) {
      router.push({
        pathname: APP_URL.login,
        query: {
          redirect: currentUrl,
        },
      });

      return;
    }

    try {
      await cartsService.addToCart({ courseId });

      dispatch(fetchCartCountThunk());

      toast.success('Thêm vào giỏ thành công');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  if (isError) {
    if (courseId) {
      return <NotFoundCoursePage />;
    } else {
      return <NotFoundPage />;
    }
  }

  if (isLoading) {
    return (
      <AppPage title={pageTitle}>
        <LoadingContainer />
      </AppPage>
    );
  }

  if (isSuccess && course) {
    return (
      <AppPage title={pageTitle}>
        <Hidden lgDown>
          <Box
            sx={{
              position: 'absolute',
              top: '220px',

              left: 'calc((100% - 1200px) /2 + 816px)',
            }}
          >
            <CourseLearnCard
              course={course}
              courseOrder={courseOrder}
              onClickAddToCart={addToCart}
              onClickRegisterToLearn={registerToLearn}
            />
          </Box>
        </Hidden>

        <BoxBackground
          sx={{
            marginTop: '-16px',
            backgroundImage: course.bannerURL
              ? `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("${requestService.getURL(
                  course.bannerURL,
                )}")`
              : 'linear-gradient( #0b3955, rgba(0, 0, 0, 0.5) )',
            backgroundBlendMode: 'darken',
            pt: 5,
            pb: 5,
          }}
        >
          <Container>
            <Box
              sx={{
                maxWidth: '768px',
                paddingTop: '24px',
                paddingBottom: '24px',
              }}
            >
              <CourseBannerInfoBox
                course={course}
                courseAverageRatings={countCourseRatings?.average}
              />
            </Box>
          </Container>
        </BoxBackground>

        <ContainerSpacing>
          <Stack spacing={6}>
            {!!course.introductionVideoURL && (
              <Box sx={{ maxWidth: '768px' }}>
                <Grid item xs={12}>
                  <CourseIntroduction
                    courseId={courseId}
                    introductionVideoURL={course.introductionVideoURL}
                    coverImageURL={course.coverImageURL}
                  />
                </Grid>
              </Box>
            )}

            <Hidden lgUp>
              <CourseLearnNav
                courseOrder={courseOrder}
                course={course}
                onClickAddToCart={addToCart}
                onClickRegisterToLearn={registerToLearn}
              />
            </Hidden>

            {!!course.output && (
              <Grid
                item
                id="course-output"
                sx={{
                  scrollMarginTop: '100px',
                }}
              >
                <CourseOutput courseOutput={course.output} />
              </Grid>
            )}

            {!!course.about && (
              <Grid
                item
                id="course-about"
                sx={{
                  scrollMarginTop: '100px',
                }}
              >
                <CourseAbout courseAbout={course.about} />
              </Grid>
            )}

            {!!course.coursePart && (
              <Grid
                item
                id="course-content"
                sx={{
                  scrollMarginTop: '100px',
                }}
              >
                <CourseContentCard courseParts={course.coursePart} />
              </Grid>
            )}

            <Grid
              item
              id="course-review"
              sx={{
                scrollMarginTop: '100px',
              }}
            >
              <TypographyCapitalize variant="h2">
                Đánh giá từ học viên
              </TypographyCapitalize>
              {countCourseRatings?.average ? (
                <>
                  <CourseRatingAverageGridContainer
                    countCourseRatings={countCourseRatings}
                  />

                  {!!courseRatings && (
                    <CourseRatingsStack courseRatings={courseRatings} />
                  )}
                </>
              ) : (
                <>
                  <></>
                </>
              )}
            </Grid>
          </Stack>
        </ContainerSpacing>
      </AppPage>
    );
  }

  return <></>;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient();

  const courseId = coursesService.getIdFromParamId(
    context.params?.id as string,
  );

  if (!courseId) {
    return { notFound: true };
  }

  await queryClient.prefetchQuery(['course', courseId], () =>
    coursesService.getOneById(courseId),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;

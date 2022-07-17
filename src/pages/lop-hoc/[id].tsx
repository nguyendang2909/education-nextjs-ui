import Head from 'next/head';
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  List,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { BoxRightText, BoxSpacing } from '../../components/Box';
import { ClassroomCoursePartListItem } from '../../modules/Classroom/course-parts/classroom-course-part-list-item';
import { VideoPlayer } from '../../components/VideoPlayer';
import { ClassroomLayout } from '../../Layout/ClassroomLayout';
import { coursesService } from '../../lib/courses.service';
import { lessonsService } from '../../lib/lessons.service';
import { Messages, messagesService } from '../../lib/messages';
import { NextPageWithLayout } from '../../types/components.type';
import { CreateCourseRatingDialog } from '../../modules/Classroom/course-ratings/CreateCourseRating';
import { faBook, faUsers } from '@fortawesome/free-solid-svg-icons';
import { TeacherAboutGrid } from '../../components/Teacher/TeacherAboutBox';
import { requestService } from '../../lib/request';
import { APP_API, APP_URL } from '../../config';
import { FontAwesomeIconSpacing } from '../../components/Icon';
import { urlQueryService } from '../../lib/url-query.service';
import { NotFoundCoursePage } from '../../components/NotFound/NotFoundCoursePage';
import { LoadingContainer } from '../../components/Container/LoadingContainer';
import { ContainerSpacing } from '../../components/Container';
import { Breadcrumb, BreadcrumbHome } from '../../components/Breadcrumbs';
import { ClassroomTabs } from '../../modules/Classroom/Panel/ClassroomTabs';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const routerOptions = { router };

  const queryOptions = { query: router.query };

  const courseId = urlQueryService.getOneAsNumber('id', queryOptions) as number;

  const [rating, setRating] = useState<number>(0);

  const {
    data: course,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(
    ['learnCourse', courseId],
    () => coursesService.learnById(courseId),
    {
      enabled: router.isReady && !!courseId && courseId > 0,
      staleTime: Infinity,
    },
  );

  const selectedLessonId =
    +(router.query.lessonId as string) ||
    ((course?.coursePart &&
      course.coursePart.length > 0 &&
      course.coursePart[0].lesson &&
      course.coursePart[0].lesson.length > 0 &&
      course.coursePart[0].lesson[0].id) as number);

  const { data: lesson } = useQuery(
    ['learnLesson', selectedLessonId],
    () => lessonsService.getOneById(selectedLessonId),
    {
      enabled: router.isReady && selectedLessonId > 0,
      staleTime: Infinity,
    },
  );

  const learnLessonById = (id: number) => {
    urlQueryService.setUrlQuery({ lessonId: id }, routerOptions);
  };

  const handleClickRating = (
    event: React.SyntheticEvent,
    value: number | null,
  ) => {
    value && setRating(value);
  };

  const pageTitle = `${Messages.course.classroom} ${course?.name || ''}`;
  return (
    <>
      <Head>
        <title>{messagesService.setPageTitle(pageTitle)}</title>
      </Head>

      {isError && <NotFoundCoursePage />}

      {isLoading && <LoadingContainer />}

      {isSuccess && !!course && (
        <>
          <>
            <ContainerSpacing maxWidth={false}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Stack spacing={2}>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item sx={{ flexGrow: 1 }}>
                          <Breadcrumbs>
                            <BreadcrumbHome />
                            <Breadcrumb
                              title={Messages.course.classroom}
                              icon={faBook}
                              path={APP_URL.classrooms}
                            />
                            <Breadcrumb title={pageTitle}></Breadcrumb>
                          </Breadcrumbs>
                        </Grid>
                        <Grid item>
                          <Rating
                            value={
                              course.rating?.rating
                                ? course.rating.rating
                                : rating
                            }
                            onChange={handleClickRating}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      {lesson?.type === 'video' ? (
                        <VideoPlayer
                          url={requestService.getURL(
                            `${APP_API.lessonsVideo}/${lesson.id}`,
                          )}
                          autoPlay={true}
                        />
                      ) : (
                        <></>
                      )}
                    </Grid>

                    <Grid>
                      <BoxSpacing>
                        <Typography variant="h1">{course.name}</Typography>
                        <BoxRightText>
                          <FontAwesomeIconSpacing icon={faUsers} />
                          {course.countStudents} {Messages.course.student}
                        </BoxRightText>
                        {!!course.user && (
                          <Box>
                            <Grid container sx={{ alignItems: 'center' }}>
                              <TeacherAboutGrid data={course.user} />
                            </Grid>
                          </Box>
                        )}
                      </BoxSpacing>

                      <Divider />

                      <ClassroomTabs course={course} />
                    </Grid>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Stack spacing={2}>
                    <Box>Nội dung học</Box>

                    <Box>
                      {course.coursePart?.map((coursePart, index) => {
                        return (
                          <ClassroomCoursePartListItem
                            coursePart={coursePart}
                            index={index + 1}
                            key={index}
                            onLessonClick={learnLessonById}
                            selectedLessonId={selectedLessonId}
                          ></ClassroomCoursePartListItem>
                        );
                      })}
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </ContainerSpacing>

            {rating > 0 && !course.rating?.rating && (
              <CreateCourseRatingDialog
                courseId={courseId}
                rating={rating}
                onClose={() => {
                  setRating(0);
                }}
              />
            )}
          </>
        </>
      )}
    </>
  );
};

Page.layout = ClassroomLayout;

export default Page;

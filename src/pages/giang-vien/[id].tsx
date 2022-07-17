import {
  Avatar,
  Breadcrumbs,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { Messages, messagesService, setMessage } from '../../lib/messages';
import { requestService } from '../../lib/request';
import { teachersService } from '../../lib/teachers.service';
import { NextPageWithLayout } from '../../types/components.type';
import { ContainerSpacing } from '../../components/Container';
import { styled } from '../../styles/theme';
import { faChalkboardUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIconSpacing } from '../../components/Icon';
import { Breadcrumb, BreadcrumbHome } from '../../components/Breadcrumbs';
import { APP_URL } from '../../config';
import { coursesService } from '../../lib/courses.service';
import { CourseCard } from '../../modules/Course/CourseCard';
import { Fragment } from 'react';
import { NotFoundContent } from '../../components/NotFound';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const teacherId = teachersService.getIdFromParamId(router.query.id as string);

  const { data: teacher } = useQuery(
    ['teacher', teacherId],
    () => teachersService.getFromId(teacherId),
    { enabled: true, staleTime: Infinity },
  );

  const { data: teacherCourses } = useQuery(
    ['teacherCourses', teacherId],
    () => coursesService.getMany({ teacherId }),
    { enabled: true, staleTime: Infinity },
  );

  return (
    <>
      <Head>
        <title>
          {messagesService.setPageTitle(
            `${Messages.teacher.name} ${teacher?.displayName || ''}`,
          )}
        </title>
      </Head>

      {teacher ? (
        <>
          <Container>
            <Breadcrumbs>
              <BreadcrumbHome />
              <Breadcrumb
                title={Messages.course.teacher}
                icon={faChalkboardUser}
                path={APP_URL.teachers}
              />
            </Breadcrumbs>
          </Container>

          <ContainerSpacing>
            <TeacherAvatarGrid container spacing={3}>
              <TeacherAvatarGridItem item>
                <Avatar
                  alt={`${Messages.teacher.name} ${teacher.displayName}`}
                  src={
                    teacher.avatarURL
                      ? `${requestService.getURL(teacher.avatarURL)}`
                      : undefined
                  }
                  sx={{ width: 160, height: 160 }}
                >
                  {!!teacher.displayName && teacher.displayName[0]}
                </Avatar>
              </TeacherAvatarGridItem>

              <TeacherAvatarGridItem item sx={{ flexGrow: 1 }}>
                <Typography variant="h2">
                  {setMessage(teacher.displayName)}
                </Typography>

                {!!teacher.countCourses && (
                  <>
                    <Typography sx={{ fontSize: '1.2rem' }}>
                      {teacher.title}
                    </Typography>
                  </>
                )}

                {!!teacher.countCourses && (
                  <>
                    <Typography sx={{ fontSize: '1.2rem' }}>
                      <FontAwesomeIconSpacing icon={faUsers} />
                      {setMessage(Messages.course.student)}:{' '}
                      {teacher.countCourses}
                    </Typography>
                  </>
                )}
              </TeacherAvatarGridItem>
            </TeacherAvatarGrid>
          </ContainerSpacing>

          <ContainerSpacing>
            <Typography variant="h3" gutterBottom>
              {setMessage(Messages.common.about)}
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-line' }}>
              {teacher.description}
            </Typography>
          </ContainerSpacing>

          <ContainerSpacing>
            <Typography variant="h3" gutterBottom>
              {setMessage(Messages.user.experience)}
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-line' }}>
              {teacher.experience}
            </Typography>
          </ContainerSpacing>

          <ContainerSpacing>
            <Typography variant="h3" gutterBottom>
              {setMessage(
                Messages.course.name,
                'của',
                Messages.teacher.name,
                setMessage(teacher.displayName),
              )}
            </Typography>
            <Grid container spacing={3} sx={{ alignItems: 'stretch' }} pb={2}>
              {teacherCourses?.map((course, index) => {
                return (
                  <Fragment key={index}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                      <CourseCard data={course} sx={{ height: '100%' }} />
                    </Grid>
                  </Fragment>
                );
              })}
            </Grid>
          </ContainerSpacing>
        </>
      ) : (
        <>
          <NotFoundContent />
        </>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient();

  const teacherId = teachersService.getIdFromParamId(
    context.params?.id as string,
  );

  await queryClient.prefetchQuery(['teacher', teacherId], () =>
    teachersService.getFromId(teacherId),
  );

  await queryClient.prefetchQuery(['teacherCourses', teacherId], () =>
    coursesService.getMany({ teacherId }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// };

export default Page;

const TeacherAvatarGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    flexDirection: 'column',
  },
}));

const TeacherAvatarGridItem = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

import {
  faArrowRight,
  faBook,
  faCertificate,
  faComments,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ChangeEvent, Fragment, useEffect } from 'react';
import { useQuery } from 'react-query';
import { ContainerSpacing } from '../../components/Container';
import { LoadingContainer } from '../../components/Container/LoadingContainer';
import { NextLink } from '../../components/Link';
import { NotFoundContainer } from '../../components/NotFound/NotFoundContainer';
import {
  TypographyCapitalize,
  TypographyColorSecond,
} from '../../components/Text/Typography';
import { PrivateMainLayout } from '../../Layout/PrivateMainLayout';
import { coursesService } from '../../lib/courses.service';
import { Messages, setMessage } from '../../lib/messages';
import { requestService } from '../../lib/request';
import { urlQueryService } from '../../lib/url-query.service';
import { ClassroomsEmpty } from '../../modules/Classroom/ClassroomsEmpty';
import { NextPageWithLayout } from '../../types/components.type';
import _ from 'lodash';
import { AppPage } from '../../components/Page/AppPage';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const routerOptions = { router };

  const pageTitle = Messages.course.my;

  const { pageSize, currentPage } = urlQueryService.getPaginated({
    query: router.query,
  });

  const findAllOptions = {
    purchase: true,
    showCountQuestions: true,
  };

  const findManyOptions = {
    ...findAllOptions,
    pageSize,
    currentPage,
  };

  const {
    data: courses,
    isSuccess,
    isLoading,
    isError,
  } = useQuery('paidCourses', () => coursesService.getMany(findManyOptions), {
    enabled: router.isReady,
  });

  const { data: countCourses } = useQuery('countPaidCourses', () =>
    coursesService.count(findAllOptions),
  );

  useEffect(() => {
    if (router.isReady) {
    }
  }, [router.isReady, pageSize, currentPage]);

  const handleChangeCurrentPage = (
    event: ChangeEvent<unknown>,
    page: number,
  ) => {
    urlQueryService.setUrlQuery({ currentPage: page }, routerOptions);
  };

  const coursesLength = courses?.length;

  const pagination =
    _.isNumber(countCourses) && countCourses > pageSize ? (
      <ContainerSpacing>
        <Pagination
          sx={{ display: 'flex', justifyContent: 'right' }}
          count={Math.ceil(countCourses / pageSize)}
          onChange={handleChangeCurrentPage}
        ></Pagination>
      </ContainerSpacing>
    ) : (
      <></>
    );

  return (
    <AppPage
      title={pageTitle}
      header={{ breadcrumbs: [{ title: pageTitle, icon: faBook }] }}
    >
      {isError && <NotFoundContainer />}

      {isLoading && <LoadingContainer />}

      {isSuccess && (
        <>
          {pagination}

          {coursesLength ? (
            <ContainerSpacing>
              <Stack spacing={4}>
                {courses.map((course, index) => {
                  return (
                    <Fragment key={index}>
                      {course.id && (
                        <Grid item>
                          <Card>
                            <NextLink
                              href={coursesService.getLearnLink(course.id)}
                              passHref
                            >
                              <CardActionArea>
                                <Grid container>
                                  <CardMedia
                                    component={Box}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      cursor: 'pointer',
                                      width: '300px',
                                      // width: '100%',
                                      backgroundImage: course.coverImageURL
                                        ? `url("${requestService.getURL(
                                            course.coverImageURL,
                                          )}")`
                                        : undefined,
                                    }}
                                  ></CardMedia>
                                  <Box sx={{ flexGrow: 1 }}>
                                    <CardContent sx={{ padding: '16px 16px' }}>
                                      <TypographyCapitalize variant="h3">
                                        {course.name}
                                      </TypographyCapitalize>

                                      <TypographyColorSecond>
                                        {course.user?.displayName
                                          ? `${course.user?.displayName} `
                                          : ''}
                                        {course.user?.title
                                          ? `- ${course.user?.title}`
                                          : ''}
                                      </TypographyColorSecond>

                                      <Stack
                                        direction="row"
                                        spacing={3}
                                        sx={{ mb: 1.5 }}
                                      >
                                        <Typography>
                                          <FontAwesomeIcon icon={faUsers} />{' '}
                                          {course.countStudents || 0}{' '}
                                        </Typography>
                                        <Typography>
                                          <FontAwesomeIcon icon={faComments} />{' '}
                                          {course.countQuestions}{' '}
                                          {Messages.course.question}
                                        </Typography>
                                        {course.certificate && (
                                          <Typography>
                                            <FontAwesomeIcon
                                              icon={faCertificate}
                                            />{' '}
                                            {setMessage(
                                              Messages.course.certificate,
                                            )}
                                          </Typography>
                                        )}
                                      </Stack>

                                      <Stack
                                        direction="row"
                                        alignItems="center"
                                      >
                                        {course.averageRatings && (
                                          <>
                                            <Rating
                                              defaultValue={
                                                course.averageRatings
                                              }
                                              precision={0.5}
                                              readOnly
                                            ></Rating>
                                            ({course.countRatings})
                                          </>
                                        )}
                                      </Stack>
                                    </CardContent>
                                    <CardActions
                                      sx={{ justifyContent: 'right' }}
                                    >
                                      <Button
                                        endIcon={
                                          <FontAwesomeIcon
                                            icon={faArrowRight}
                                          />
                                        }
                                      >
                                        {Messages.course.gotoLearn}
                                      </Button>
                                    </CardActions>
                                  </Box>
                                </Grid>
                              </CardActionArea>
                            </NextLink>
                          </Card>
                        </Grid>
                      )}
                    </Fragment>
                  );
                })}
              </Stack>
            </ContainerSpacing>
          ) : (
            <ContainerSpacing>
              <ClassroomsEmpty></ClassroomsEmpty>
            </ContainerSpacing>
          )}

          {pagination}
        </>
      )}
    </AppPage>
  );
};

Page.layout = PrivateMainLayout;

export default Page;

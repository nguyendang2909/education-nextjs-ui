import { AdminLayout } from '../../../Layout/AdminLayout';
import { Messages, setMessage } from '../../../lib/messages';
import { NextPageWithLayout } from '../../../types/components.type';
import { AppPage } from '../../../components/Page/AppPage';
import { useRouter } from 'next/router';
import { urlQueryService } from '../../../lib/url-query.service';
import { coursePublishStatus, ECoursePublish } from '../../../types/enums';
import { adminCoursesService } from '../../../lib/admin-courses.service';
import { useQuery } from 'react-query';
import { Fragment, useEffect } from 'react';
import { notificationService } from '../../../lib/notificationService';
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { TablePopoverFilter } from '../../../components/Table/TablePopoverFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  TableCellRecordStatus,
  TableHeaderCellRecordStatus,
} from '../../../modules/Record';
import { NextLink } from '../../../components/Link';
import { EditButton } from '../../../components/Button/ActionButton';
import { APP_URL } from '../../../config';
import { TableCellIndex } from '../../../components/Table/TableCell';
import { ContainerSpacing } from '../../../components/Container';
import { AdminCourseSearchFields } from '../../../modules/Admin/Course/AdminCourseSearchFields';
import { LoadingContainer } from '../../../components/Container/LoadingContainer';
import { AppTablePagination } from '../../../components/Table/AppTablePagination';

const Page: NextPageWithLayout = () => {
  const pageTitle = `${Messages.action.manage} ${Messages.course.name}`;

  const router = useRouter();

  const queryOptions = { query: router.query };

  const { pageSize, currentPage } = urlQueryService.getPaginated(queryOptions);

  const publish = urlQueryService.getOne(
    'publish',
    queryOptions,
  ) as ECoursePublish;

  const isActive = urlQueryService.getOneAsBoolean('isActive', queryOptions);

  const name = urlQueryService.getOne('name', queryOptions);

  const findAllOptions = {
    publish,
    isActive,
    name,
  };

  const findManyOptions = {
    pageSize,
    currentPage,
    ...findAllOptions,
  };

  const {
    data: courses,
    refetch: refetchCourses,
    isFetching,
  } = useQuery('adminCourses', () =>
    adminCoursesService.getMany(findManyOptions),
  );

  const { data: countCourses, refetch: refetchCountCourses } = useQuery(
    'adminCountCourses',
    () => adminCoursesService.count(findAllOptions),
  );

  useEffect(() => {
    if (router.isReady) {
      refetchCourses();
    }
  }, [
    refetchCourses,
    router.isReady,
    pageSize,
    currentPage,
    publish,
    isActive,
    name,
  ]);

  useEffect(() => {
    if (router.isReady) {
      refetchCountCourses();
    }
  }, [router.isReady, refetchCountCourses, publish, isActive, name]);

  const handleAccpetPublish = async (courseId: number) => {
    try {
      await adminCoursesService.update(courseId, {
        publish: ECoursePublish.Published,
      });

      refetchCourses();
    } catch (err) {
      notificationService.handleError(err);
    }
  };

  const pagination = <AppTablePagination count={countCourses} />;

  return (
    <AppPage title={pageTitle} header={{}}>
      <ContainerSpacing>
        <AdminCourseSearchFields />
      </ContainerSpacing>
      <TableContainer>
        {isFetching && <LoadingContainer />}
        <Table>
          <TableHead>
            <TableRow>{pagination}</TableRow>
            <TableRow>
              <TableCellIndex />
              <TableCell>{setMessage(Messages.course.name)}</TableCell>
              <TableCell>{setMessage(Messages.courseCategory.name)}</TableCell>
              <TableCell>{setMessage(Messages.course.price)}</TableCell>
              <TableCell>
                {setMessage(Messages.course.promotionPrice)}
              </TableCell>
              <TableCell>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>{setMessage(Messages.course.publishStatus)}</Box>
                  <TablePopoverFilter
                    options={[
                      {
                        text: coursePublishStatus.published,
                        value: ECoursePublish.Published,
                      },
                      {
                        text: coursePublishStatus.pending,
                        value: ECoursePublish.Pending,
                      },
                      {
                        text: coursePublishStatus.notPublished,
                        value: ECoursePublish.NotPublished,
                      },
                      {
                        text: coursePublishStatus.rejected,
                        value: ECoursePublish.Rejected,
                      },
                    ]}
                    urlQueryName="publish"
                  />
                </Stack>
              </TableCell>
              <TableHeaderCellRecordStatus />
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!!courses && courses.length > 0 && (
              <>
                {courses.map((course, index) => {
                  const {
                    id: courseId,
                    name: courseName,
                    courseSubcategory,
                    price,
                    promotionPrice,
                    publish,
                  } = course;

                  const courseSubcategoryId = courseSubcategory?.id;

                  const courseSubcategoryName = courseSubcategory?.name;

                  const courseCategoryName =
                    courseSubcategory?.courseCategory?.name;

                  const courseCategoryIcon =
                    courseSubcategory?.courseCategory?.icon;

                  const courseCategoryId =
                    courseSubcategory?.courseCategory?.id;

                  const rowId = pageSize * (currentPage - 1) + index + 1;

                  return (
                    <Fragment key={index}>
                      {courseId && (
                        <TableRow>
                          <TableCell>{rowId}</TableCell>
                          <TableCell>{courseName}</TableCell>
                          <TableCell>
                            {!!courseCategoryId && (
                              <>
                                <FontAwesomeIcon
                                  icon={courseCategoryIcon || 'question'}
                                />{' '}
                                {courseCategoryName} \{' '}
                                {courseSubcategoryId && courseSubcategoryName}
                              </>
                            )}
                          </TableCell>
                          <TableCell>{price}</TableCell>
                          <TableCell>{promotionPrice}</TableCell>
                          <TableCell>
                            {publish && (
                              <>
                                {setMessage(coursePublishStatus[publish])}{' '}
                                {publish === ECoursePublish.Pending && (
                                  <Button
                                    onClick={() => {
                                      handleAccpetPublish(courseId);
                                    }}
                                  >
                                    {Messages.action.accept}
                                  </Button>
                                )}
                              </>
                            )}
                          </TableCell>
                          <TableCellRecordStatus
                            id={courseId}
                            isActive={course.isActive}
                            refetch={refetchCourses}
                            onChange={adminCoursesService.update}
                          />
                          <TableCell>
                            <NextLink
                              href={`${APP_URL.admin.courses}/${courseId}`}
                            >
                              <EditButton></EditButton>
                            </NextLink>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })}
              </>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>{pagination}</TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </AppPage>
  );
};

Page.layout = AdminLayout;

export default Page;

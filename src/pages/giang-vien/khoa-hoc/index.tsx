import { faBook, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Table,
  Box,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
} from '@mui/material';
import { AppLink, NextLink } from '../../../components/Link';
import { APP_URL } from '../../../config';
import { TeacherLayout } from '../../../Layout/TeacherLayout';
import { Messages, setMessage, setSuccessMessage } from '../../../lib/messages';
import { NextPageWithLayout } from '../../../types/components.type';
import { StackSpaceBetween } from '../../../components/Stack';
import { coursePublishStatus, ECoursePublish } from '../../../types/enums';
import { Fragment, useEffect, useState } from 'react';
import { DeleteDialog } from '../../../components/Dialog/DeleteDialog';
import { useRouter } from 'next/router';
import { urlQueryService } from '../../../lib/url-query.service';
import { useQuery } from 'react-query';
import { teacherCoursesService } from '../../../lib/teacher-courses.service';
import { CourseData } from '../../../types/fetch-data.type';
import { toast } from 'react-toastify';
import { SortDirection, TableSort } from '../../../components/Table/TableSort';
import {
  TFindAllCoursesDto,
  TFindManyCoursesDto,
} from '../../../types/request.dto';
import { TablePopoverFilter } from '../../../components/Table/TablePopoverFilter';
import { Formatter } from '../../../lib/formatter';
import { LoadingContainer } from '../../../components/Container/LoadingContainer';
import { TableCellIndex } from '../../../components/Table/TableCell';
import { TableHeaderCellCreatedAt } from '../../../modules/Record/TableCellCreatedAt';
import { ContainerSpacing } from '../../../components/Container';
import { TeacherCourseSearchFields } from '../../../modules/Teacher/Course/TeacherCourseSearchFields';
import { AppPage } from '../../../components/Page/AppPage';
import { AppTablePagination } from '../../../components/Table/AppTablePagination';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const queryOptions = { query: router.query };

  const { currentPage, pageSize } = urlQueryService.getPaginated(queryOptions);

  const publish = urlQueryService.getOne(
    'publish',
    queryOptions,
  ) as ECoursePublish;

  const name = urlQueryService.getOne('name', queryOptions);

  const sortName = urlQueryService.getOne(
    'sortName',
    queryOptions,
  ) as SortDirection;

  const sortCreatedAt = urlQueryService.getOne(
    'sortCreatedAt',
    queryOptions,
  ) as SortDirection;

  const findAllOptions: TFindAllCoursesDto = {
    publish,
    name,
  };

  const findManyOptions: TFindManyCoursesDto = {
    ...findAllOptions,
    pageSize,
    currentPage,
    sortName,
    sortCreatedAt,
  };

  const {
    data: courses,
    refetch: refetchCourses,
    isSuccess,
    isFetching,
    isLoading,
  } = useQuery('teacherCourses', () =>
    teacherCoursesService.getMany(findManyOptions),
  );

  const { data: countCourses, refetch: refetchCountCourses } = useQuery(
    'teacherCountCourses',
    () => teacherCoursesService.count(findAllOptions),
  );

  const [deleteCourse, setDeleteCourse] = useState<CourseData>({});

  useEffect(() => {
    if (router.isReady) {
      refetchCourses();
    }
  }, [
    refetchCourses,
    router.isReady,
    pageSize,
    currentPage,
    sortName,
    sortCreatedAt,
    publish,
    name,
  ]);

  useEffect(() => {
    if (router.isReady) {
      refetchCountCourses();
    }
  }, [router.isReady, refetchCountCourses, publish, name]);

  const handleDeleteCourse = async () => {
    try {
      if (!deleteCourse.id) {
        return;
      }

      await teacherCoursesService.delete(deleteCourse.id);

      toast.success(
        setSuccessMessage(Messages.action.delete, Messages.course.name),
      );
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const pagination = <AppTablePagination count={countCourses} />;

  const pageTitle = `${Messages.action.manage} ${Messages.course.name}`;

  return (
    <AppPage
      title={pageTitle}
      header={{
        breadcrumbs: [
          {
            title: Messages.course.name,
            icon: faBook,
          },
        ],
        action: (
          <NextLink href={APP_URL.teacher.createCourse} passHref>
            <Button
              size="large"
              variant="contained"
              startIcon={<FontAwesomeIcon icon={faPlus} />}
            >
              {setMessage(`${Messages.course.name} ${Messages.common.new}`)}
            </Button>
          </NextLink>
        ),
      }}
    >
      <ContainerSpacing>
        <TeacherCourseSearchFields />
      </ContainerSpacing>

      {isLoading && <LoadingContainer />}

      {isSuccess && (
        <ContainerSpacing>
          <TableContainer>
            {isFetching && <LoadingContainer />}

            <Table>
              <TableHead>
                <TableRow>{pagination}</TableRow>
                <TableRow>
                  <TableCellIndex />
                  <TableCell>
                    <StackSpaceBetween>
                      <Box>{setMessage(Messages.course.name)}</Box>
                      <Box>
                        <TableSort urlQueryName="sortName" />
                      </Box>
                    </StackSpaceBetween>
                  </TableCell>
                  <TableCell sx={{ width: 170 }}>
                    <StackSpaceBetween>
                      <Box>{setMessage(Messages.courseCategory.name)}</Box>
                    </StackSpaceBetween>
                  </TableCell>
                  <TableCell sx={{ width: 100 }}>
                    <StackSpaceBetween>
                      <Box>{setMessage(Messages.course.price)}</Box>
                    </StackSpaceBetween>
                  </TableCell>
                  <TableCell sx={{ width: 100 }}>
                    <StackSpaceBetween>
                      <Box>Giá giảm</Box>
                    </StackSpaceBetween>
                  </TableCell>
                  <TableCell sx={{ width: 180 }}>
                    <StackSpaceBetween>
                      <Box>{setMessage(Messages.course.publishStatus)}</Box>
                      <Box>
                        <TablePopoverFilter
                          urlQueryName="publish"
                          options={[
                            {
                              text: Formatter.formatCoursePublish(
                                ECoursePublish.Published,
                              ),
                              value: ECoursePublish.Published,
                            },
                            {
                              text: Formatter.formatCoursePublish(
                                ECoursePublish.Pending,
                              ),
                              value: ECoursePublish.Pending,
                            },
                            {
                              text: Formatter.formatCoursePublish(
                                ECoursePublish.NotPublished,
                              ),
                              value: ECoursePublish.NotPublished,
                            },
                            {
                              text: Formatter.formatCoursePublish(
                                ECoursePublish.Rejected,
                              ),
                              value: ECoursePublish.Rejected,
                            },
                          ]}
                        />
                      </Box>
                    </StackSpaceBetween>
                  </TableCell>
                  <TableHeaderCellCreatedAt />
                </TableRow>
              </TableHead>

              <TableBody>
                {!!courses && courses?.length > 0 && (
                  <>
                    {courses?.map((course, index) => {
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
                            <TableRow
                              hover
                              component={AppLink}
                              href={`${APP_URL.teacher.courses}/${courseId}`}
                            >
                              <TableCell>{rowId}</TableCell>

                              <TableCell sx={{ fontWeight: 700 }}>
                                {courseName}
                              </TableCell>

                              <TableCell>
                                {!!courseCategoryId && (
                                  <>
                                    <FontAwesomeIcon
                                      icon={courseCategoryIcon || 'question'}
                                    />{' '}
                                    {courseCategoryName} \{' '}
                                    {courseSubcategoryId &&
                                      courseSubcategoryName}
                                  </>
                                )}
                              </TableCell>

                              <TableCell>
                                {Formatter.formatMoney(price)}
                              </TableCell>

                              <TableCell>
                                {Formatter.formatMoney(promotionPrice)}
                              </TableCell>
                              <TableCell>
                                {publish && (
                                  <>
                                    {setMessage(coursePublishStatus[publish])}{' '}
                                  </>
                                )}
                              </TableCell>
                              <TableCell>
                                {!!course.createdAt &&
                                  Formatter.formatTime(course.createdAt)}
                              </TableCell>
                              {/* <TableCell>
                                <ButtonLink
                                  href={`${APP_URL.teacher.courses}/${courseId}`}
                                >
                                  {Messages.action.edit}
                                </ButtonLink>
                              </TableCell> */}
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
        </ContainerSpacing>
      )}

      <DeleteDialog
        name={`${Messages.course.name} ${setMessage(deleteCourse.name)}`}
        open={!!deleteCourse.id}
        onClose={() => {
          setDeleteCourse({});
        }}
        onDelete={handleDeleteCourse}
        onFinish={refetchCourses}
      />
    </AppPage>
  );
};

Page.layout = TeacherLayout;

export default Page;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CreateCourseSubcategoryDialog } from '../../../modules/CourseSubcategory/CreateCourseSubcategoryDialog';
import { EditCourseSubcategoryDialog } from '../../../modules/CourseSubcategory/EditCourseSubcategoryDialog';
import { DeleteDialog } from '../../../components/Dialog/DeleteDialog';
import { AdminLayout } from '../../../Layout/AdminLayout';
import { Messages, messagesService, setMessage } from '../../../lib/messages';
import { requestAPI } from '../../../lib/request';
import { NextPageWithLayout } from '../../../types/components.type';
import { CourseSubcategoryData } from '../../../types/fetch-data.type';
import { useQuery } from 'react-query';
import { urlQueryService } from '../../../lib/url-query.service';
import { adminCourseCategoriesService } from '../../../lib/admin-course-categories.service';
import { adminCourseSubcategoriesService } from '../../../lib/admin-course-subcategories.service';
import { ContainerSpacingBottom } from '../../../components/Container';
import {
  TableCellAction,
  TableCellTextCenter,
} from '../../../components/Table/TableCell';
import { StackSpaceBetween } from '../../../components/Stack';
import { SortDirection, TableSort } from '../../../components/Table/TableSort';
import { TableHeaderCellCreatedAt } from '../../../modules/Record/TableCellCreatedAt';
import { Formatter } from '../../../lib/formatter';
import {
  TableCellRecordStatus,
  TableHeaderCellRecordStatus,
} from '../../../modules/Record';
import { EditButton } from '../../../components/Button/ActionButton';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const queryOptions = { query: router.query };

  const courseCategoryId = urlQueryService.getOneAsNumber('id', queryOptions);

  const sortCreatedAt = urlQueryService.getOne(
    'sortCreatedAt',
    queryOptions,
  ) as SortDirection;

  const sortOrderPosition = urlQueryService.getOne(
    'sortOrderPosition',
    queryOptions,
  ) as SortDirection;

  const sortName = urlQueryService.getOne(
    'sortName',
    queryOptions,
  ) as SortDirection;

  // const [courseCategory, setCourseCategory] = useState<CourseCategoryData>({});

  // const [courseSubcategories, setCourseSubcategories] = useState<
  //   CourseSubcategoryData[]
  // >([]);

  // const [tableLoading, setTableLoading] = useState<boolean>(true);

  // const [fetchParams, setFetchParams] = useState<
  //   FetchParams<CourseSubcategoryData>
  // >({});

  const [createCourseSubcategory, setCreateCourseSubcategory] =
    useState<boolean>(false);

  const [editCourseSubcategoryId, setEditCourseSubcategoryId] =
    useState<number>();

  const [deleteCourseSubcategory, setDeleteCourseSubcategory] =
    useState<CourseSubcategoryData>({});

  // const fetchCourseCategory = useCallback(async () => {
  //   try {
  //     const data = await requestAPI.get<CourseCategoryData>(
  //       `/course-categories/${id}`,
  //     );

  //     data && setCourseCategory(data);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       toast.error(err.message);
  //     }
  //   }
  // }, [id]);

  const isActive = urlQueryService.getOneAsBoolean('isActive', queryOptions);

  const findAllOptions = {
    isActive,
    courseCategoryId,
    sortCreatedAt,
    sortOrderPosition,
    sortName,
  };

  const { data: courseCategory } = useQuery(
    ['adminCourseCategory', courseCategoryId],
    () => adminCourseCategoriesService.getOneById(courseCategoryId || 0),
    {
      enabled: router.isReady && !!courseCategoryId && courseCategoryId > 0,
    },
  );

  const { data: courseSubcategories, refetch: refetchCourseSubcategories } =
    useQuery(
      ['adminCourseSubcategoriesByCategory', courseCategoryId],
      () => adminCourseSubcategoriesService.getAll(findAllOptions),
      { enabled: router.isReady && !!courseCategoryId && courseCategoryId > 0 },
    );

  useEffect(() => {
    if (router.isReady) {
      refetchCourseSubcategories();
    }
  }, [
    router.isReady,
    refetchCourseSubcategories,
    isActive,
    courseCategoryId,
    sortCreatedAt,
    sortOrderPosition,
    sortName,
  ]);

  const handleCloseCourseSubcategoryDeleteDialog = () => {
    setDeleteCourseSubcategory({});
  };

  const handleDeleteCourseSubcategory = async () => {
    try {
      await requestAPI.delete(
        `/course-subcategories/${deleteCourseSubcategory.id}`,
      );

      // fetchCourseSubcategories();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const handleCloseCreateCourseSubcategoryDialog = () => {
    setCreateCourseSubcategory(false);
  };

  const handleCloseEditCourseSubcategoryDialog = () => {
    setEditCourseSubcategoryId(undefined);
  };

  return (
    <>
      <Head>
        <title>
          {messagesService.setPageTitle(
            `${Messages.courseCategory.name} ${courseCategory?.name || ''}`,
          )}
        </title>
      </Head>

      <ContainerSpacingBottom sx={{ pb: '16px' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" gutterBottom>
            {setMessage(
              `${Messages.courseCategory.name} ${courseCategory?.name || ''}`,
            )}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setCreateCourseSubcategory(true);
            }}
            startIcon={<FontAwesomeIcon icon="plus" />}
          >
            {setMessage(
              `${Messages.courseSubcategory.name} ${Messages.common.new}`,
            )}
          </Button>
        </Stack>
      </ContainerSpacingBottom>

      <TableContainer>
        <Table>
          <TableHead>
            <TableCell sx={{ width: 100 }}>
              <StackSpaceBetween>
                <Box>{setMessage(Messages.common.orderPosition)}</Box>
                <Box>
                  <TableSort urlQueryName="sortOrderPosition" />
                </Box>
              </StackSpaceBetween>
            </TableCell>
            <TableCell>
              <StackSpaceBetween>
                <Box>{setMessage(Messages.courseSubcategory.name)}</Box>
                <Box>
                  <TableSort urlQueryName="sortName"></TableSort>
                </Box>
              </StackSpaceBetween>
            </TableCell>
            <TableHeaderCellCreatedAt />
            <TableHeaderCellRecordStatus />
            <TableCellAction />
          </TableHead>

          <TableBody>
            {!!courseSubcategories && courseSubcategories.length > 0 && (
              <>
                {courseSubcategories.map((courseSubcategory, index) => {
                  return (
                    <Fragment key={index}>
                      {!!courseSubcategory.id && (
                        <TableRow>
                          <TableCell>
                            {courseSubcategory.orderPosition}
                          </TableCell>
                          <TableCell>{courseSubcategory.name}</TableCell>
                          <TableCell>
                            {!!courseSubcategory.createdAt &&
                              Formatter.formatTime(courseSubcategory.createdAt)}
                          </TableCell>
                          <TableCellRecordStatus
                            isActive={courseSubcategory.isActive}
                            id={courseSubcategory.id}
                            onChange={adminCourseSubcategoriesService.update}
                            refetch={refetchCourseSubcategories}
                          />
                          <TableCellTextCenter>
                            <EditButton
                              onClick={() => {
                                setEditCourseSubcategoryId(
                                  courseSubcategory.id,
                                );
                              }}
                            ></EditButton>
                          </TableCellTextCenter>
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <DataGrid
        loading={tableLoading}
        columns={columns}
        rows={courseSubcategories}
        pageSize={50}
        rowsPerPageOptions={[50]}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        onSortModelChange={(
          model: GridSortModel,
          details: GridCallbackDetails,
        ) => {
          setFetchParams(prevState => {
            const { sortOptions: prevSortOptions, ...extraPrevState } =
              prevState;

            const sortOptions: SortOptions<CourseCategoryData> = {};

            for (const sortOption of model) {
              // @ts-ignore: Unreachable code error
              sortOptions[sortOption.field] = sortOption.sort?.toUpperCase();
            }

            return { sortOptions, ...extraPrevState };
          });
        }}
        onFilterModelChange={(
          model: GridFilterModel,
          details: GridCallbackDetails,
        ) => {
          setFetchParams(prevState => {
            const { currentPage, pageSize, sortOptions } = prevState;

            const where = {};

            for (const filterOption of model.items) {
              // @ts-ignore: Unreachable code error
              where[filterOption.columnField] = `${filterOption.value}`;
            }

            return {
              where,
              currentPage,
              pageSize,
              sortOptions,
            };
          });
        }}
      /> */}

      <DeleteDialog
        name={deleteCourseSubcategory.name}
        open={!!deleteCourseSubcategory.id}
        onClose={handleCloseCourseSubcategoryDeleteDialog}
        onDelete={handleDeleteCourseSubcategory}
      />

      {!!courseCategoryId && (
        <CreateCourseSubcategoryDialog
          courseCategoryId={courseCategoryId}
          open={createCourseSubcategory}
          onClose={handleCloseCreateCourseSubcategoryDialog}
          onReload={refetchCourseSubcategories}
        />
      )}

      {!!editCourseSubcategoryId && (
        <EditCourseSubcategoryDialog
          courseSubcategoryId={editCourseSubcategoryId}
          open={!!editCourseSubcategoryId}
          onClose={handleCloseEditCourseSubcategoryDialog}
          onReload={refetchCourseSubcategories}
        />
      )}
    </>
  );
};

Page.layout = AdminLayout;

export default Page;

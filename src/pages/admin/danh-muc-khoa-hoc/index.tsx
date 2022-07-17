import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../../../types/components.type';
import { AdminLayout } from '../../../Layout/AdminLayout';
import { Messages, setMessage } from '../../../lib/messages';
import { NextLink } from '../../../components/Link';
import { CreateCourseCategoryDialog } from '../../../modules/CourseCategory/CreateCourseCategoryDialog';
import { EditCourseCategoryDialog } from '../../../modules/CourseCategory/EditCourseCategoryDialog';
import { APP_URL } from '../../../config';
import { AppPage } from '../../../components/Page/AppPage';
import { useQuery } from 'react-query';
import { adminCourseCategoriesService } from '../../../lib/admin-course-categories.service';
import { useRouter } from 'next/router';
import { urlQueryService } from '../../../lib/url-query.service';
import {
  TableCellAction,
  TableCellTextCenter,
} from '../../../components/Table/TableCell';
import { StackSpaceBetween } from '../../../components/Stack';
import { SortDirection, TableSort } from '../../../components/Table/TableSort';
import { TableHeaderCellCreatedAt } from '../../../modules/Record/TableCellCreatedAt';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Formatter } from '../../../lib/formatter';
import {
  TableCellRecordStatus,
  TableHeaderCellRecordStatus,
} from '../../../modules/Record';
import { EditButton } from '../../../components/Button/ActionButton';

const Page: NextPageWithLayout = () => {
  const pageTitle = `${Messages.action.manage} ${Messages.courseCategory.name}`;

  const router = useRouter();

  const queryOptions = { query: router.query };

  const [createCourseCategory, setCreateCourseCategory] =
    useState<boolean>(false);

  const [editCourseCategoryId, setEditCourseCategoryId] = useState<number>();

  const isActive = urlQueryService.getOneAsBoolean('isActive', queryOptions);

  const sortName = urlQueryService.getOne(
    'sortName',
    queryOptions,
  ) as SortDirection;

  const sortCreatedAt = urlQueryService.getOne(
    'sortCreatedAt',
    queryOptions,
  ) as SortDirection;

  const findAllOptions = {
    isActive,
    sortName,
    sortCreatedAt,
  };

  const { data: courseCategories, refetch: refetchCourseCategories } = useQuery(
    'adminCourseCategories',
    () => adminCourseCategoriesService.getAll(findAllOptions),
    { enabled: router.isReady },
  );

  useEffect(() => {
    if (router.isReady) {
      refetchCourseCategories();
    }
  }, [
    router.isReady,
    refetchCourseCategories,
    sortName,
    isActive,
    sortCreatedAt,
  ]);

  return (
    <AppPage
      title={pageTitle}
      header={{
        action: (
          <Button
            variant="contained"
            onClick={() => {
              setCreateCourseCategory(true);
            }}
            startIcon={<FontAwesomeIcon icon="plus" />}
          >
            {setMessage(
              `${Messages.courseCategory.name} ${Messages.common.new}`,
            )}
          </Button>
        ),
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
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
                  <Box>{setMessage(Messages.courseCategory.name)}</Box>
                  <Box>
                    <TableSort urlQueryName="sortName"></TableSort>
                  </Box>
                </StackSpaceBetween>
              </TableCell>
              <TableCell>{setMessage(Messages.common.icon)}</TableCell>
              <TableHeaderCellCreatedAt />
              <TableCell sx={{ width: '200px', maxWidth: '200px' }}>
                {setMessage(Messages.courseSubcategory.name)}
              </TableCell>
              <TableHeaderCellRecordStatus></TableHeaderCellRecordStatus>
              <TableCellAction />
            </TableRow>
          </TableHead>

          <TableBody>
            {!!courseCategories && courseCategories.length > 0 && (
              <>
                {courseCategories.map((courseCategory, index) => {
                  return (
                    <Fragment key={index}>
                      {!!courseCategory.id && (
                        <TableRow>
                          <TableCell>{courseCategory.id}</TableCell>
                          <TableCell>{courseCategory.name}</TableCell>
                          <TableCell>
                            <FontAwesomeIcon
                              icon={courseCategory.icon || faQuestion}
                            />
                          </TableCell>
                          <TableCell>
                            {!!courseCategory.createdAt &&
                              Formatter.formatTime(courseCategory.createdAt)}
                          </TableCell>
                          <TableCellTextCenter>
                            <NextLink
                              href={{
                                pathname: `${APP_URL.admin.courseCategories}/${courseCategory.id}`,
                                query: {
                                  isActive: true,
                                },
                              }}
                              passHref
                            >
                              <Button>
                                {setMessage(Messages.action.select)}
                              </Button>
                            </NextLink>
                          </TableCellTextCenter>
                          <TableCellRecordStatus
                            isActive={courseCategory.isActive}
                            id={courseCategory.id}
                            onChange={adminCourseCategoriesService.update}
                            refetch={refetchCourseCategories}
                          />
                          <TableCell>
                            <EditButton
                              onClick={() => {
                                setEditCourseCategoryId(courseCategory.id);
                              }}
                            >
                              {Messages.action.edit}
                            </EditButton>
                          </TableCell>
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

      <CreateCourseCategoryDialog
        open={createCourseCategory}
        onClose={() => setCreateCourseCategory(false)}
        onReload={refetchCourseCategories}
      />

      {!!editCourseCategoryId && (
        <EditCourseCategoryDialog
          courseCategoryId={editCourseCategoryId}
          open={!!editCourseCategoryId}
          onClose={() => setEditCourseCategoryId(undefined)}
          onReload={refetchCourseCategories}
        />
      )}
    </AppPage>
  );
};

Page.layout = AdminLayout;

export default Page;

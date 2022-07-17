import { faAngleLeft, faList, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Breadcrumbs,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  MenuItem,
  List,
  ListItemButton,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Stack,
} from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, Fragment, useEffect } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { Breadcrumb, BreadcrumbHome } from '../../components/Breadcrumbs';
import {
  TypographyBold,
  TypographyColorSecond,
} from '../../components/Text/Typography';
import { MainLayout } from '../../Layout/MainLayout';
import { courseCategoriesService } from '../../lib/course-categories.service';
import { coursesService } from '../../lib/courses.service';
import { Messages, setMessage } from '../../lib/messages';
import { NextPageWithLayout } from '../../types/components.type';
import { pickBy } from 'lodash';
import { FontAwesomeIconSpacing } from '../../components/Icon';
import { CourseCard } from '../../modules/Course/CourseCard';
import { GridPadding } from '../../components/Grid';
import { FilterTitleBox } from '../../components/Box/FilterBox';
import { useState } from 'react';
import { LoadingContainer } from '../../components/Container/LoadingContainer';
import { ContainerSpacing } from '../../components/Container';
import { urlQueryService } from '../../lib/url-query.service';
import { CourseSortBy } from '../../types/request.dto';
import { AppPage } from '../../components/Page/AppPage';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const routerOptions = { router };

  const queryOptions = { query: router.query };

  const { pageSize, currentPage } = urlQueryService.getPaginated(queryOptions);

  const name = urlQueryService.getOne('name', queryOptions);

  const sortBy = (urlQueryService.getOne('sortBy', queryOptions) ||
    'newest') as 'newest' | 'popularity' | 'relevant';

  const duration = urlQueryService.getOne('duration', queryOptions) || 'short';

  const courseCategoryId = urlQueryService.getOneAsNumber(
    'courseCategoryId',
    queryOptions,
  );

  const courseSubcategoryId = urlQueryService.getOneAsNumber(
    'courseSubcategoryId',
    queryOptions,
  );

  const promotion = urlQueryService.getOneAsBoolean('promotion', queryOptions);

  const free = urlQueryService.getOneAsBoolean('free', queryOptions);

  const [searchText, setSearchText] = useState(name);

  const { data: courseCategories = [] } = useQuery(
    'courseCategories',
    () => courseCategoriesService.getAll({ loadMenu: true }),
    {
      enabled: router.isReady,
      staleTime: Infinity,
    },
  );

  const findAllCoursesConditions = {
    sortBy,
    duration,
    courseCategoryId,
    courseSubcategoryId,
    promotion,
    free,
    name,
  };

  const findManyCoursesConditions = {
    ...findAllCoursesConditions,
    pageSize,
    currentPage,
  };

  const {
    data: courses = [],
    refetch: refetchCourses,
    isFetching,
  } = useQuery(
    'findCourses',
    () => coursesService.getMany(findManyCoursesConditions),
    {
      enabled: router.isReady,
      staleTime: Infinity,
    },
  );

  const { data: countCourses, refetch: refetchCountCourses } = useQuery(
    'countFindCourses',
    () => coursesService.count(findAllCoursesConditions),
    {
      enabled: router.isReady,
      staleTime: Infinity,
    },
  );

  const selectedCourseCategory = courseCategories.find(
    (courseCategory, index) => {
      return (
        courseCategory.id === courseCategoryId ||
        (!!courseSubcategoryId &&
          !!courseCategory.courseSubcategory?.find(
            courseSubcategoryItem =>
              courseSubcategoryItem.id === courseSubcategoryId,
          ))
      );
    },
  );

  useEffect(() => {
    refetchCourses();
    refetchCountCourses();
  }, [
    refetchCourses,
    refetchCountCourses,
    pageSize,
    currentPage,
    sortBy,
    duration,
    courseCategoryId,
    courseSubcategoryId,
    promotion,
    free,
    name,
  ]);

  const handleChangeSort = (e: ChangeEvent<HTMLInputElement>) => {
    urlQueryService.setUrlQuery({ sortBy: e.target.value }, routerOptions);
  };

  // const handleChangeDuration = (e: ChangeEvent<HTMLInputElement>) => {
  //   setRouterQuery('duration', e.target.value);
  // };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    urlQueryService.setUrlQuery({ name: searchText }, routerOptions);
  };

  const handleChangeCourseCategory = (id?: number) => {
    const { courseSubcategoryId: zbc, ...routerQuery } = router.query;

    router.push(
      {
        query: {
          ...pickBy({
            ...routerQuery,
            courseCategoryId: id,
          }),
        },
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  const handleChangeCourseSubcategory = (id?: number) => {
    urlQueryService.setUrlQuery({ courseSubcategoryId: id }, routerOptions);
  };

  const handleChangeCheckboxPromotion = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    urlQueryService.setUrlQuery(
      { promotion: event.target.checked },
      routerOptions,
    );
  };

  const handleChangeCheckboxFree = (event: ChangeEvent<HTMLInputElement>) => {
    urlQueryService.setUrlQuery({ free: event.target.checked }, routerOptions);
  };

  const pageTitle = 'Danh sách khoá học';

  return (
    <AppPage
      title={pageTitle}
      header={{ breadcrumbs: [{ title: pageTitle, icon: faList }] }}
    >
      <ContainerSpacing>
        <Stack direction="row" sx={{ alignItems: 'center' }} spacing={2}>
          <Grid item sx={{ minWidth: '150px' }}>
            <form noValidate onSubmit={handleSubmit}>
              <Stack direction="row" spacing={2}>
                <Box>
                  <TextField
                    fullWidth
                    label="Khoá học"
                    size="small"
                    value={searchText}
                    onChange={evt => setSearchText(evt.target.value)}
                  />
                </Box>
                <Box>
                  <Button variant="contained">{Messages.action.search}</Button>
                </Box>
              </Stack>
            </form>
          </Grid>
          {/* <Grid item xs={3} sx={{ minWidth: '150px' }}>
            <TextField
              fullWidth
              select
              label="Theo thời lượng"
              size="small"
              value={duration}
              onChange={handleChangeDuration}
            >
              <MenuItem value="short">Dưới 3 tiếng</MenuItem>
              <MenuItem value="middle">3 - 24 tiếng</MenuItem>
              <MenuItem value="long">1 - 3 ngày</MenuItem>
            </TextField>
          </Grid> */}
          <Grid item sx={{ flexGrow: 1 }}></Grid>
          <Grid item>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              {/* Sort */}
              <Grid item>
                {countCourses !== undefined && (
                  <>
                    Tìm thấy{' '}
                    <Typography component="span" sx={{ fontWeight: 700 }}>
                      {countCourses}
                    </Typography>{' '}
                    {Messages.course.name}
                  </>
                )}
              </Grid>
              <Grid item>
                <Stack direction="row">
                  <TypographyColorSecond>
                    <FontAwesomeIconSpacing icon={faSort} />
                  </TypographyColorSecond>
                  <TypographyBold>
                    {setMessage(Messages.action.sort)}:
                  </TypographyBold>
                </Stack>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  select
                  size="small"
                  sx={{ minWidth: '150px' }}
                  onChange={handleChangeSort}
                  value={sortBy}
                >
                  <MenuItem value="newest">
                    {setMessage(Messages.common.newest)}
                  </MenuItem>
                  <MenuItem value="popularity">
                    {setMessage(Messages.common.popularity)}
                  </MenuItem>
                </TextField>
              </Grid>
            </Stack>
          </Grid>
        </Stack>
      </ContainerSpacing>

      <ContainerSpacing>
        <Stack direction="row" spacing={3}>
          <Grid item xs={12} sm={12} md={3}>
            <Box>
              <Box>
                <FilterTitleBox title="Danh mục khoá học" />

                {(!!courseCategoryId || !!courseSubcategoryId) &&
                selectedCourseCategory ? (
                  <List
                    subheader={
                      <ListSubheader>
                        <FontAwesomeIconSpacing
                          icon={selectedCourseCategory.icon || 'question'}
                        />{' '}
                        {setMessage(selectedCourseCategory.name)}
                      </ListSubheader>
                    }
                  >
                    {selectedCourseCategory.courseSubcategory?.map(
                      (courseSubcategoryItem, index) => {
                        return (
                          <Fragment key={index}>
                            {courseSubcategoryItem.id && (
                              <ListItemButton
                                selected={
                                  courseSubcategoryId ===
                                  courseSubcategoryItem.id
                                }
                                divider
                                onClick={() => {
                                  handleChangeCourseSubcategory(
                                    courseSubcategoryItem.id,
                                  );
                                }}
                              >
                                <ListItemText>
                                  {setMessage(courseSubcategoryItem.name)}
                                </ListItemText>
                              </ListItemButton>
                            )}
                          </Fragment>
                        );
                      },
                    )}
                    <ListItemButton
                      onClick={() => {
                        handleChangeCourseCategory();
                      }}
                    >
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faAngleLeft} />
                      </ListItemIcon>
                      <ListItemText>Xem các danh mục khác</ListItemText>
                    </ListItemButton>
                  </List>
                ) : (
                  <List>
                    {courseCategories.map((courseCategoryItem, index) => {
                      return (
                        <Fragment key={index}>
                          {courseCategoryItem.id && (
                            <ListItemButton
                              divider
                              onClick={() => {
                                handleChangeCourseCategory(
                                  courseCategoryItem.id,
                                );
                              }}
                            >
                              <ListItemIcon>
                                <FontAwesomeIcon
                                  icon={courseCategoryItem.icon || 'question'}
                                />
                              </ListItemIcon>
                              <ListItemText>
                                {setMessage(courseCategoryItem.name)}
                              </ListItemText>
                            </ListItemButton>
                          )}
                        </Fragment>
                      );
                    })}
                  </List>
                )}
              </Box>
              <Box>
                <FilterTitleBox title="Giá" />
                <Box sx={{ pl: 2 }}>
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleChangeCheckboxPromotion}
                          checked={promotion}
                        />
                      }
                      label={setMessage(Messages.course.promotion)}
                    />
                    <FormControlLabel
                      value="free"
                      control={
                        <Checkbox
                          checked={free}
                          onChange={handleChangeCheckboxFree}
                        />
                      }
                      label={setMessage(Messages.course.free)}
                    />
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box></Box>
          </Grid>

          <Grid item xs={12} sm={12} md={9}>
            <LoadingContainer loading={isFetching}>
              <Grid container>
                {courses.map((course, index) => {
                  return (
                    <Fragment key={index}>
                      <GridPadding item xs={12} sm={6} lg={4}>
                        <CourseCard data={course} />
                      </GridPadding>
                    </Fragment>
                  );
                })}
              </Grid>
            </LoadingContainer>
          </Grid>
        </Stack>
      </ContainerSpacing>
    </AppPage>
  );
};

Page.layout = MainLayout;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryOptions = { query: context.query };

  const { pageSize, currentPage } = urlQueryService.getPaginated(queryOptions);

  const name = urlQueryService.getOne('name', queryOptions);

  const sortBy = (urlQueryService.getOne('sortBy', queryOptions) ||
    'newest') as CourseSortBy;

  const duration = urlQueryService.getOne('duration', queryOptions) || 'short';

  const courseCategoryId = urlQueryService.getOneAsNumber(
    'courseCategoryId',
    queryOptions,
  );

  const courseSubcategoryId = urlQueryService.getOneAsNumber(
    'courseSubcategoryId',
    queryOptions,
  );

  const promotion = urlQueryService.getOneAsBoolean('promotion', queryOptions);

  const free = urlQueryService.getOneAsBoolean('free', queryOptions);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('findCourses', () =>
    coursesService.getMany({
      sortBy,
      duration,
      courseCategoryId,
      courseSubcategoryId,
      pageSize,
      currentPage,
      promotion,
      free,
      name,
    }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;

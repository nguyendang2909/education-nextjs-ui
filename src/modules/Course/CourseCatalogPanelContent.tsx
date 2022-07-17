import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { UseQueryResult } from 'react-query';
import { LoadingContainer } from '../../components/Container/LoadingContainer';
import { CourseData } from '../../types/fetch-data.type';
import { CoursesSlider } from './CourseSlider';

type CourseCatalogPanelContentProps = {
  coursesQueryResult: UseQueryResult<CourseData[]>;
};

export const CourseCatalogPanelContent: FC<CourseCatalogPanelContentProps> = ({
  coursesQueryResult,
}) => {
  const {
    data: courses,
    isSuccess,
    isLoading,
    isFetching,
  } = coursesQueryResult;

  if (isSuccess) {
    return (
      <>
        {isFetching && <LoadingContainer />}

        {courses && courses.length > 0 ? (
          <>
            <Box>
              <CoursesSlider courses={courses} />
            </Box>
          </>
        ) : (
          <>
            <Typography>
              Danh mục không có khoá học, hãy chuyển danh mục khác bạn nhé
            </Typography>
          </>
        )}
      </>
    );
  }

  if (isLoading) {
    return <LoadingContainer />;
  }

  return <></>;
};

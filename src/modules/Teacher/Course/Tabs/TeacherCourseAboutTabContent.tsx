import { Grid, Stack } from '@mui/material';
import { FC } from 'react';
import { CourseData } from '../../../../types/fetch-data.type';
import { CourseAboutEditCard } from '../../../Course/Edit/EditCourseAbout';
import { CourseOutputEditCard } from '../../../Course/Edit/EditCourseOutput';

type TeacherCourseAboutTabContentProps = {
  course: CourseData;
  refetch: () => void;
};

export const TeacherCourseAboutTabContent: FC<
  TeacherCourseAboutTabContentProps
> = ({ course, refetch }) => {
  return (
    <>
      {!!course.id && (
        <Stack spacing={3}>
          <Grid item>
            <CourseAboutEditCard
              id={course.id}
              about={course.about}
              onFinish={refetch}
            />
          </Grid>
          <Grid item>
            <CourseOutputEditCard
              id={course.id}
              output={course.output}
              onFinish={refetch}
            />
          </Grid>
        </Stack>
      )}
    </>
  );
};

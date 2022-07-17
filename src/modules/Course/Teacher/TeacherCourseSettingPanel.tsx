import { Box } from '@mui/material';
import { FC } from 'react';
import { CourseData } from '../../../types/fetch-data.type';
import { TeacherCourseDeleteCard } from './TeacherCourseDeleteCard';

type TeacherCourseSettingTabProps = {
  course: CourseData;
};

export const TeacherCourseSettingTab: FC<TeacherCourseSettingTabProps> = ({
  course,
}) => {
  return (
    <>
      <Box>
        <TeacherCourseDeleteCard course={course} />
      </Box>
    </>
  );
};

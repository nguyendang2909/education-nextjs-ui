import { Grid, useTheme } from '@mui/material';
import React, { Fragment } from 'react';
import { CourseData } from '../../types/fetch-data.type';
import { GridPadding } from '../../components/Grid';
import { CourseCard } from './CourseCard';

type FCProps = {
  courses: CourseData[];
};

export const CoursesContainer: React.FC<FCProps> = ({ courses }) => {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        [theme.breakpoints.down('sm')]: {
          justifyContent: 'center',
        },
      }}
    >
      {courses.map((course, index) => {
        return (
          <Fragment key={index}>
            <GridPadding item xs={12} sm={6} md={4} lg={3}>
              <CourseCard data={course} />
            </GridPadding>
          </Fragment>
        );
      })}
    </Grid>
  );
};

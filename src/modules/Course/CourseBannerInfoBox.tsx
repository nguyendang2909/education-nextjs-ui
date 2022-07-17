import { faCertificate, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Box, Grid, Rating, Typography } from '@mui/material';
import { FC } from 'react';
import { BoxSpacingBottom } from '../../components/Box';
import { CourseBreadcrumbs } from '../../components/Breadcrumbs/CourseBreadcrumbs';
import { GridPaddingHorizontal } from '../../components/Grid';
import { FontAwesomeIconSpacing } from '../../components/Icon';
import { TeacherAboutGrid } from '../../components/Teacher/TeacherAboutBox';
import {
  TypographyShadowWhite,
  TypographyWhite,
} from '../../components/Text/Typography';
import { Messages, setMessage } from '../../lib/messages';
import { CourseData } from '../../types/fetch-data.type';

type CourseBannerInfoBoxProps = {
  course: CourseData;
  courseAverageRatings?: number;
};

export const CourseBannerInfoBox: FC<CourseBannerInfoBoxProps> = ({
  course,
  courseAverageRatings,
}) => {
  return (
    <>
      <CourseBreadcrumbs
        sx={{ color: '#fff' }}
        data={course.courseSubcategory}
      />

      <TypographyShadowWhite variant="h1">
        {setMessage(course.name)}
      </TypographyShadowWhite>

      {!!courseAverageRatings && (
        <Box pt={1} pb={1.5}>
          <Grid item sx={{ color: 'primary.contrast' }}>
            <Grid
              container
              sx={{
                alignItems: 'center',
              }}
            >
              {!!courseAverageRatings && (
                <>
                  <Rating
                    defaultValue={courseAverageRatings}
                    readOnly
                    precision={0.5}
                  />

                  <Typography>
                    <Typography component="span" sx={{ fontWeight: 700 }}>
                      {courseAverageRatings}
                    </Typography>{' '}
                    <Typography component="span" variant="body2">
                      ({course.countRatings} {Messages.action.rate})
                    </Typography>
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      )}

      <BoxSpacingBottom>
        {!!course.user && (
          <TeacherAboutGrid
            data={course.user}
            typographyProps={{ color: '#fff' }}
          />
        )}
      </BoxSpacingBottom>

      {!!course.subTitle && (
        <BoxSpacingBottom>
          <TypographyWhite>{course.subTitle}</TypographyWhite>
        </BoxSpacingBottom>
      )}

      <BoxSpacingBottom>
        <Grid
          container
          sx={{ color: '#fff', fontWeight: 600, alignItems: 'center' }}
        >
          {!!course.countStudents && (
            <GridPaddingHorizontal item>
              <Grid
                container
                sx={{
                  alignItems: 'center',
                }}
              >
                <FontAwesomeIconSpacing icon={faUsers} />
                <Box>{`${course.countStudents} ${Messages.course.student}`}</Box>
              </Grid>
            </GridPaddingHorizontal>
          )}

          {course.certificate && (
            <GridPaddingHorizontal item>
              <Grid
                container
                sx={{
                  alignItems: 'center',
                }}
              >
                <FontAwesomeIconSpacing icon={faCertificate} />
                <Box>Cấp chứng nhận hoàn thành</Box>
              </Grid>
            </GridPaddingHorizontal>
          )}
        </Grid>
      </BoxSpacingBottom>
    </>
  );
};

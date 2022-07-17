import { Box, Grid, LinearProgress, Rating } from '@mui/material';
import { FC, Fragment } from 'react';
import { BoxSpacingHorizontal } from '../../components/Box';
import { GridPadding } from '../../components/Grid';
import { TypographyCenter } from '../../components/Text/Typography';
import { CountCourseRatingsData } from '../../types/fetch-data.type';

type CourseRatingAverageGridContainerProps = {
  countCourseRatings: CountCourseRatingsData;
};

export const CourseRatingAverageGridContainer: FC<
  CourseRatingAverageGridContainerProps
> = ({ countCourseRatings }) => {
  const { count: countCourseRating, average: countCourseRatingAverage } =
    countCourseRatings;

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={3}>
          <GridPadding
            container
            sx={{
              borderRight: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ margin: 'auto' }}>
              <TypographyCenter sx={{ fontSize: '64px', fontWeight: 700 }}>
                {countCourseRatingAverage}
              </TypographyCenter>

              <Box>
                {countCourseRatingAverage && (
                  <Rating
                    defaultValue={countCourseRatings.average}
                    precision={0.5}
                    readOnly
                  ></Rating>
                )}
              </Box>
            </Box>
          </GridPadding>
        </Grid>

        <Grid item xs={12} sm={9}>
          {[1, 2, 3, 4, 5].map((item, index) => {
            const countRatingPoint =
              countCourseRatings[item as 1 | 2 | 3 | 4 | 5];

            const ratingPointPercent =
              countCourseRating && countRatingPoint
                ? (countRatingPoint * 100) / countCourseRating
                : 0;

            return (
              <Fragment key={index}>
                <Grid
                  container
                  sx={{
                    alignItems: 'center',
                    padding: '8px 16px',
                  }}
                >
                  <LinearProgress
                    sx={{ width: '50%', flexGrow: 1 }}
                    value={ratingPointPercent}
                    variant="determinate"
                  ></LinearProgress>
                  <BoxSpacingHorizontal>{`${Math.round(
                    ratingPointPercent,
                  )}%`}</BoxSpacingHorizontal>
                  <Rating defaultValue={item} readOnly></Rating>
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

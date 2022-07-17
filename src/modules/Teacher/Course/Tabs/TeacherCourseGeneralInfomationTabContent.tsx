import { Grid, Stack } from '@mui/material';
import { FC } from 'react';
import { CourseData } from '../../../../types/fetch-data.type';
import { CourseBannerEditCard } from '../../../Course/Edit/EditCourseBanner';
import { CourseCoverImageEditCard } from '../../../Course/Edit/EditCourseCoverImage';
import { CourseIntroductionEditCard } from '../../../Course/Edit/EditCourseIntroduction';
import { CoursePriceEditCard } from '../../../Course/Edit/EditCoursePrice';
import { CourseTitleEditCard } from '../../../Course/Edit/EditCourseTitle';

type TeacherCourseGeneralInfomationTabContentProps = {
  course: CourseData;
  refetch: () => void;
};

export const TeacherCourseGeneralInfomationTabContent: FC<
  TeacherCourseGeneralInfomationTabContentProps
> = ({ refetch, course }) => {
  return (
    <>
      {!!course.id && (
        <Stack direction="column" spacing={3}>
          <Grid item>
            <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
              <Grid item>
                <CourseCoverImageEditCard
                  onFinish={refetch}
                  courseId={course.id}
                  coverImageURL={course.coverImageURL}
                  sx={{ height: '100%' }}
                />
              </Grid>

              <Grid item flex="1 0">
                <CourseTitleEditCard
                  id={course.id}
                  certificate={course.certificate}
                  name={course.name}
                  subTitle={course.subTitle}
                  duration={course.duration}
                  onFinish={refetch}
                  sx={{ height: '100%' }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <CourseIntroductionEditCard
                  id={course.id}
                  introductionVideoURL={course.introductionVideoURL}
                  introductionVideoProcessingStatus={
                    course.introductionVideoProcessingStatus
                  }
                  onFinish={refetch}
                  sx={{ height: '100%' }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <CoursePriceEditCard
                  price={course.price}
                  promotionPrice={course.promotionPrice}
                  publish={course.publish}
                  id={course.id}
                  onFinish={refetch}
                  sx={{ height: '100%' }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <CourseBannerEditCard
              courseId={course.id}
              bannerURL={course.bannerURL}
              onFinish={refetch}
            />
          </Grid>
        </Stack>
      )}
    </>
  );
};

import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { teacherCoursePartsService } from '../../../lib/teacher-courseparts.service';

import { EditCourseParts } from '../../CoursePart/Edit/EditCourseParts';
import { EditLessonContent } from '../../Lesson/Edit/EditLessonContent';
import { NotFoundContent } from '../../../components/NotFound';
import { urlQueryService } from '../../../lib/url-query.service';

type FCProps = {
  courseId: number;
};

export const CourseContentEditCard: FC<FCProps> = props => {
  const router = useRouter();

  const queryOptions = { query: router.query };

  const { courseId } = props;

  const lessonId = urlQueryService.getOneAsNumber('lesson', queryOptions);

  const {
    data: courseParts = [],
    refetch: refetchCourseParts,
    status,
  } = useQuery(
    ['teacherCourseParts', courseId],
    () => teacherCoursePartsService.getMany({ courseId: courseId }),
    { enabled: !!courseId && courseId > 0 },
  );

  if (status === 'error') {
    return <NotFoundContent />;
  }

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={12} md={8} sx={{ pr: 5 }}>
          {!!lessonId && (
            <EditLessonContent
              lessonId={lessonId}
              refetchCourseParts={refetchCourseParts}
            />
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            borderLeft: '1px solid',
            borderColor: 'divider',
            pl: 1,
            minHeight: '300px',
          }}
        >
          <EditCourseParts
            courseId={courseId}
            selectedLessonId={lessonId}
            refetch={refetchCourseParts}
            courseParts={courseParts}
          />
        </Grid>
      </Grid>
    </>
  );
};

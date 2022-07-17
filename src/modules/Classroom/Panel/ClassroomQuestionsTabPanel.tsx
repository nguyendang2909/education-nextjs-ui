import { Box, CircularProgress, Pagination } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import {
  BoxCenter,
  BoxRightText,
  BoxSpacing,
  BoxSpacingBottom,
} from '../../../components/Box';
import { LoadingContainer } from '../../../components/Container/LoadingContainer';
import { courseQuestionsService } from '../../../lib/course-questions.service';
import { Messages } from '../../../lib/messages';
import { urlQueryService } from '../../../lib/url-query.service';
import { CourseQuestions } from '../questions/CourseQuestions';
import { CreateQuestion } from '../questions/CreateQuestion';
import { EClassroomTab } from './ClassroomTabs';

export const ClassroomQuestionsTabPanel: FC = () => {
  const router = useRouter();

  const routerOptions = { router };

  const queryOptions = { query: router.query };

  const courseId = urlQueryService.getOneAsNumber('id', queryOptions);

  const currentPage =
    urlQueryService.getOneAsNumber('questionsCurrentPage', queryOptions) || 1;

  const pageSize =
    urlQueryService.getOneAsNumber('questionsPageSize', queryOptions) || 50;

  const tab =
    (urlQueryService.getOne('tab', queryOptions) as EClassroomTab) ||
    EClassroomTab.about;

  const {
    data: courseQuestions = [],
    refetch: refetchCourseQuestions,
    isLoading,
    isFetching,
    isSuccess,
  } = useQuery(
    ['courseQuestions', courseId],
    () =>
      courseQuestionsService.getMany({
        courseId: courseId || 0,
        currentPage,
        pageSize,
      }),
    {
      enabled:
        router.isReady &&
        tab === EClassroomTab.questions &&
        !!courseId &&
        courseId > 0,
    },
  );

  const { data: countCourseQuestions, refetch: refetchCountCourseQuestions } =
    useQuery(
      ['countCourseQuestions', courseId],
      () => courseQuestionsService.count({ courseId: courseId || 0 }),
      {
        enabled:
          router.isReady &&
          tab === EClassroomTab.questions &&
          !!courseId &&
          courseId > 0,
      },
    );

  useEffect(() => {
    if (router.isReady) {
      refetchCourseQuestions();
    }
  }, [refetchCourseQuestions, router.isReady, currentPage, pageSize]);

  const handleChangeCourseQuestionsCurrentPage = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    urlQueryService.replaceUrlQuery(
      {
        questionsCurrentPage: page,
      },
      routerOptions,
    );
  };

  const handleRequestCourseQuestions = () => {
    refetchCourseQuestions();

    refetchCountCourseQuestions();
  };

  const questionsPagination = _.isNumber(countCourseQuestions) ? (
    <Pagination
      sx={{
        justifyContent: 'flex-end',
        display: 'fex',
      }}
      count={Math.ceil(countCourseQuestions / pageSize)}
      page={currentPage}
      onChange={handleChangeCourseQuestionsCurrentPage}
    />
  ) : (
    <></>
  );

  if (!courseId) {
    return <></>;
  }

  return (
    <>
      <BoxSpacingBottom>
        <CreateQuestion
          courseId={courseId}
          refetch={handleRequestCourseQuestions}
        />
      </BoxSpacingBottom>

      {isLoading && <LoadingContainer />}

      {isSuccess && (
        <>
          {isFetching && <LoadingContainer />}

          {_.isNumber(countCourseQuestions) && (
            <>
              <BoxRightText>
                {countCourseQuestions} {Messages.course.question}
              </BoxRightText>
              <BoxSpacing>{questionsPagination}</BoxSpacing>
            </>
          )}

          {!!courseQuestions && courseQuestions.length > 0 ? (
            <>
              <Box>
                <CourseQuestions
                  data={courseQuestions}
                  refetch={handleRequestCourseQuestions}
                />
              </Box>
            </>
          ) : (
            <>
              <Box>Chưa có câu hỏi nào</Box>
            </>
          )}

          {_.isNumber(countCourseQuestions) && (
            <>
              <BoxSpacing>{questionsPagination}</BoxSpacing>
            </>
          )}
        </>
      )}
    </>
  );
};

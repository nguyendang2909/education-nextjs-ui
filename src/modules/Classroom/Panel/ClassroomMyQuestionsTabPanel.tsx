import { Box, CircularProgress, Pagination } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
import { useAppSelector } from '../../../store/hooks';
import { CourseQuestions } from '../questions/CourseQuestions';
import { CreateQuestion } from '../questions/CreateQuestion';
import { EClassroomTab } from './ClassroomTabs';

export const ClassroomMyQuestionsTabPanel = () => {
  const router = useRouter();

  const routerOptions = { router };

  const queryOptions = { query: router.query };

  const currentUserId = useAppSelector(state => state.user?.info?.id);

  const courseId = urlQueryService.getOneAsNumber('id', queryOptions);

  const currentPage =
    urlQueryService.getOneAsNumber('myQuestionsCurrentPage', queryOptions) || 1;

  const pageSize =
    urlQueryService.getOneAsNumber('myQuestionsPageSize', queryOptions) || 50;

  const tab =
    (urlQueryService.getOne('tab', queryOptions) as EClassroomTab) ||
    EClassroomTab.about;

  const {
    data: myCourseQuestions = [],
    refetch: refetchMyCourseQuestions,
    isLoading,
    isFetching,
    isSuccess,
  } = useQuery(
    ['myCourseQuestions', courseId],
    () =>
      courseQuestionsService.getMany({
        courseId: courseId || 0,
        userId: currentUserId,
        currentPage,
        pageSize,
      }),
    {
      enabled:
        router.isReady &&
        tab === EClassroomTab.myQuestions &&
        !!courseId &&
        courseId > 0,
    },
  );

  const {
    data: countMyCourseQuestions,
    refetch: refetchCountMyCourseQuestions,
  } = useQuery(
    ['countMyCourseQuestions', courseId],
    () =>
      courseQuestionsService.count({
        courseId: courseId || 0,
        userId: currentUserId,
      }),
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
      refetchMyCourseQuestions();
    }
  }, [router.isReady, refetchMyCourseQuestions, currentPage, pageSize]);

  const handleChangeMyQuestionsCurrentPage = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    urlQueryService.replaceUrlQuery(
      {
        myQuestionsCurrentPage: page,
      },
      routerOptions,
    );
  };

  const handleRequestMyCourseQuestions = () => {
    refetchMyCourseQuestions();

    refetchCountMyCourseQuestions();
  };

  const myQuestionsPagination = _.isNumber(countMyCourseQuestions) ? (
    <Pagination
      sx={{
        justifyContent: 'flex-end',
        display: 'fex',
      }}
      count={Math.ceil(countMyCourseQuestions / pageSize)}
      page={currentPage}
      onChange={handleChangeMyQuestionsCurrentPage}
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
          refetch={handleRequestMyCourseQuestions}
        />
      </BoxSpacingBottom>

      {isLoading && <LoadingContainer />}

      {isSuccess && (
        <>
          {isFetching && <LoadingContainer />}

          {_.isNumber(countMyCourseQuestions) && (
            <>
              <BoxRightText>
                {countMyCourseQuestions} {Messages.course.question}
              </BoxRightText>
              <BoxSpacing>{myQuestionsPagination}</BoxSpacing>
            </>
          )}

          {!!myCourseQuestions && myCourseQuestions.length > 0 ? (
            <>
              <Box>
                <CourseQuestions
                  data={myCourseQuestions}
                  refetch={handleRequestMyCourseQuestions}
                />
              </Box>
            </>
          ) : (
            <>
              <Box>
                Bạn chưa có câu hỏi nào, hãy tích cực hỏi giảng viên nhé.
              </Box>
            </>
          )}

          {!!countMyCourseQuestions && (
            <>
              <BoxSpacing>{myQuestionsPagination}</BoxSpacing>
            </>
          )}
        </>
      )}
    </>
  );
};

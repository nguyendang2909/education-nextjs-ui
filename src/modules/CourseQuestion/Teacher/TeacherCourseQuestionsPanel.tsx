import { Pagination, Typography } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { BoxSpacing } from '../../../components/Box';
import { ContainerSpacingBottom } from '../../../components/Container';
import { LoadingContainer } from '../../../components/Container/LoadingContainer';
import { NotFoundContainer } from '../../../components/NotFound/NotFoundContainer';
import { TypographyColorSecond } from '../../../components/Text/Typography';
import { teacherCourseQuestionsService } from '../../../lib/teacher-course-questions.service';
import { urlQueryService } from '../../../lib/url-query.service';
import { CourseQuestions } from '../../Classroom/questions/CourseQuestions';

export const TeacherCourseQuestionsTabContent: FC = () => {
  const router = useRouter();

  const queryOptions = { query: router.query };

  const routerOptions = { router };

  const id = urlQueryService.getOneAsNumber('id', queryOptions);

  const currentPage =
    urlQueryService.getOneAsNumber('questionsCurrentPage', queryOptions) || 1;

  const pageSize =
    urlQueryService.getOneAsNumber('questionsPageSize', queryOptions) || 50;

  const {
    data: courseQuestions,
    refetch: refetchCourseQuestions,
    isFetching,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(
    'teacherCourseQuestions',
    () =>
      teacherCourseQuestionsService.getMany({
        pageSize,
        currentPage,
        courseId: id,
      }),
    { enabled: router.isReady },
  );

  const { data: countCourseQuestions, refetch: refetchCountQuestions } =
    useQuery('teacherCountCourseQuestions', () =>
      teacherCourseQuestionsService.count({ courseId: id }),
    );

  useEffect(() => {
    if (router.isReady) {
      refetchCourseQuestions();
    }
  }, [router.isReady, currentPage, pageSize, refetchCourseQuestions]);

  const handleChangeCurrentPage = (
    event: ChangeEvent<unknown>,
    page: number,
  ) => {
    urlQueryService.setUrlQuery({ questionsCurrentPage: page }, routerOptions);
  };

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (isError) {
    return <NotFoundContainer />;
  }

  if (isSuccess && !!courseQuestions) {
    const pagination =
      _.isNumber(countCourseQuestions) && countCourseQuestions > pageSize ? (
        <Pagination
          sx={{ display: 'flex', justifyContent: 'right' }}
          count={Math.ceil(countCourseQuestions / pageSize)}
          onChange={handleChangeCurrentPage}
        ></Pagination>
      ) : (
        <></>
      );

    return (
      <>
        <ContainerSpacingBottom>
          <TypographyColorSecond>
            Bạn có tất cả {countCourseQuestions} câu hỏi
          </TypographyColorSecond>

          {pagination}
        </ContainerSpacingBottom>

        <ContainerSpacingBottom>
          {isFetching && <LoadingContainer />}

          <>
            {courseQuestions.length > 0 ? (
              <>
                <CourseQuestions
                  data={courseQuestions}
                  refetch={refetchCourseQuestions}
                />
              </>
            ) : (
              <>
                <Typography>
                  Bạn chưa có câu hỏi nào, hãy khuyến khích học viên đặt câu hỏi
                  nhé.
                </Typography>
              </>
            )}
          </>

          <BoxSpacing>{pagination}</BoxSpacing>
        </ContainerSpacingBottom>
      </>
    );
  }

  return <></>;
};

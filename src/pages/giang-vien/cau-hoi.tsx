import _ from 'lodash';
import Head from 'next/head';
import { Breadcrumbs, Pagination, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect } from 'react';
import { useQuery } from 'react-query';
import {
  ContainerSpacing,
  ContainerSpacingBottom,
} from '../../components/Container';
import { TeacherLayout } from '../../Layout/TeacherLayout';
import { Messages, messagesService, setMessage } from '../../lib/messages';
import { teacherCourseQuestionsService } from '../../lib/teacher-course-questions.service';
import { CourseQuestions } from '../../modules/Classroom/questions/CourseQuestions';
import { NextPageWithLayout } from '../../types/components.type';
import { TypographyColorSecond } from '../../components/Text/Typography';
import { BoxSpacing } from '../../components/Box';
import { urlQueryService } from '../../lib/url-query.service';
import { Breadcrumb, BreadcrumbTeacher } from '../../components/Breadcrumbs';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const queryOptions = { query: router.query };

  const routerOptions = { router };

  const pageTitle = `${Messages.action.manage} ${Messages.course.question}`;

  const { currentPage, pageSize } = urlQueryService.getPaginated(queryOptions);

  const { data: courseQuestions, refetch: refetchCourseQuestions } = useQuery(
    'teacherCourseQuestions',
    () => teacherCourseQuestionsService.getMany({ pageSize, currentPage }),
    { enabled: router.isReady },
  );

  const { data: countCourseQuestions } = useQuery(
    'teacherCountCourseQuestions',
    () => teacherCourseQuestionsService.count(),
  );

  useEffect(() => {
    if (router.isReady) {
      refetchCourseQuestions();
    }
  }, [router.isReady, pageSize, currentPage, refetchCourseQuestions]);

  const handleChangeCurrentPage = (
    event: ChangeEvent<unknown>,
    page: number,
  ) => {
    urlQueryService.setUrlQuery({ currentPage: page }, routerOptions);
  };

  return (
    <>
      <Head>
        <title>{messagesService.setPageTitle(pageTitle)}</title>
      </Head>

      <ContainerSpacingBottom>
        <Breadcrumbs>
          <BreadcrumbTeacher />
          <Breadcrumb title={Messages.course.question} icon={faQuestion} />
        </Breadcrumbs>
        <Typography variant="h1">{setMessage(pageTitle)}</Typography>
      </ContainerSpacingBottom>

      <ContainerSpacing>
        <TypographyColorSecond>
          B???n c?? t???t c??? {countCourseQuestions} c??u h???i
        </TypographyColorSecond>

        <BoxSpacing>
          {_.isNumber(countCourseQuestions) ? (
            <Pagination
              sx={{ display: 'flex', justifyContent: 'right' }}
              count={Math.ceil(countCourseQuestions / pageSize)}
              onChange={handleChangeCurrentPage}
            ></Pagination>
          ) : (
            <></>
          )}
        </BoxSpacing>
      </ContainerSpacing>

      <ContainerSpacing>
        {courseQuestions ? (
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
                  B???n ch??a c?? c??u h???i n??o, h??y t??ch c???c ????ng kho?? h???c l??n nh??!
                </Typography>
              </>
            )}
          </>
        ) : (
          <></>
        )}

        <BoxSpacing>
          {_.isNumber(countCourseQuestions) ? (
            <Pagination
              sx={{ display: 'flex', justifyContent: 'right' }}
              count={Math.ceil(countCourseQuestions / pageSize)}
              onChange={handleChangeCurrentPage}
            ></Pagination>
          ) : (
            <></>
          )}
        </BoxSpacing>
      </ContainerSpacing>
    </>
  );
};

Page.layout = TeacherLayout;

export default Page;

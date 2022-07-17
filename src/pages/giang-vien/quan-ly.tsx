import { faBook, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Stack,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { BoxSpacing, BoxSpacingBottom } from '../../components/Box';
import { ContainerSpacing } from '../../components/Container';
import { IconWrapper } from '../../components/Icon';
import { NextLink } from '../../components/Link';
import { TeacherPage } from '../../components/Page/TeacherPage';
import {
  TypographyBold,
  TypographyCenter,
  TypographyColorSecond,
} from '../../components/Text/Typography';
import { APP_URL } from '../../config';
import { TeacherLayout } from '../../Layout/TeacherLayout';
import { Formatter } from '../../lib/formatter';
import { Messages } from '../../lib/messages';
import { specialCharacters } from '../../lib/special-characters';
import { teacherCourseQuestionsService } from '../../lib/teacher-course-questions.service';
import { teacherCoursesService } from '../../lib/teacher-courses.service';
import { teacherOrderItemsService } from '../../lib/teacher-order-items.servie';
import { NextPageWithLayout } from '../../types/components.type';
import { ECoursePublish } from '../../types/enums';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const { data: countCourseQuestions } = useQuery(
    'teacherCountCourseQuestions',
    () => teacherCourseQuestionsService.count(),
  );

  const { data: countCourses } = useQuery('countAllTeacherCourses', () =>
    teacherCoursesService.count(),
  );

  const { data: countPublishCourses } = useQuery('countAllPublishCourses', () =>
    teacherCoursesService.count({ publish: ECoursePublish.Published }),
  );

  const { data: revenue } = useQuery(
    'teacherRevenueMonth',
    () => teacherOrderItemsService.getRevenue(),
    {
      enabled: router.isReady,
    },
  );

  return (
    <TeacherPage title="Quản lý giảng dạy">
      <ContainerSpacing>
        <BoxSpacingBottom>Bạn có:</BoxSpacingBottom>
        <BoxSpacing>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4} md={3}>
                <Card>
                  <NextLink href={APP_URL.teacher.courses}>
                    <CardActionArea>
                      <CardContent>
                        <IconWrapper>
                          <FontAwesomeIcon icon={faBook} />
                        </IconWrapper>

                        <TypographyCenter
                          variant="h3"
                          noWrap
                          sx={{
                            fontWeight: 'bold',
                          }}
                        >
                          {countPublishCourses} / {countCourses}{' '}
                          {Messages.course.name}
                        </TypographyCenter>
                        <TypographyCenter>
                          {'đã được đăng tải'}
                        </TypographyCenter>
                      </CardContent>
                    </CardActionArea>
                  </NextLink>
                </Card>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Card>
                  <NextLink href={APP_URL.teacher.courseQuestions}>
                    <CardActionArea>
                      <CardContent>
                        <IconWrapper>
                          <FontAwesomeIcon icon={faQuestion} />
                        </IconWrapper>

                        <TypographyCenter
                          variant="h3"
                          noWrap
                          sx={{
                            fontWeight: 'bold',
                          }}
                        >
                          {countCourseQuestions} {Messages.course.question}
                        </TypographyCenter>
                        <TypographyCenter>
                          {specialCharacters.space}
                        </TypographyCenter>
                      </CardContent>
                    </CardActionArea>
                  </NextLink>
                </Card>
              </Grid>
            </Grid>

            <Box>
              {!!revenue && (
                <Card>
                  <CardHeader title="Chi tiết doanh thu"></CardHeader>
                  <CardContent>
                    <BoxSpacingBottom>
                      <TypographyColorSecond variant="body2">
                        Khoảng thời gian
                      </TypographyColorSecond>
                      <TypographyBold>
                        {revenue.startDate || ''} - {revenue.endDate || ''}
                      </TypographyBold>
                    </BoxSpacingBottom>

                    <BoxSpacingBottom>
                      <TypographyColorSecond variant="body2">
                        Khoá học đã bán
                      </TypographyColorSecond>
                      <TypographyBold>{revenue.countCourses}</TypographyBold>
                    </BoxSpacingBottom>

                    <BoxSpacingBottom>
                      <TypographyColorSecond variant="body2">
                        Doanh thu
                      </TypographyColorSecond>
                      <TypographyBold color="blue" fontSize="1.3rem">
                        {Formatter.formatMoney(revenue.revenue)}
                      </TypographyBold>
                    </BoxSpacingBottom>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Stack>
        </BoxSpacing>
      </ContainerSpacing>
    </TeacherPage>
  );
};

Page.layout = TeacherLayout;

export default Page;

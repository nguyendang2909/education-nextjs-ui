import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Tab } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import {
  ContainerSpacing,
  ContainerSpacingBottom,
} from '../../../components/Container';
import { CourseContentEditCard } from '../../../modules/Course/Edit/CourseContent';
import { TeacherLayout } from '../../../Layout/TeacherLayout';
import { Messages, setMessage } from '../../../lib/messages';
import { teacherCoursesService } from '../../../lib/teacher-courses.service';
import { NextPageWithLayout } from '../../../types/components.type';
import { urlQueryService } from '../../../lib/url-query.service';
import { NotFoundContainer } from '../../../components/NotFound/NotFoundContainer';
import { LoadingContainer } from '../../../components/Container/LoadingContainer';
import { TeacherCourseQuestionsTabContent } from '../../../modules/CourseQuestion/Teacher/TeacherCourseQuestionsPanel';
import { APP_URL } from '../../../config';
import {
  faAddressBook,
  faBook,
  faCog,
  faInfoCircle,
  faList,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { TeacherPage } from '../../../components/Page/TeacherPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TeacherCourseGeneralInfomationTabContent } from '../../../modules/Teacher/Course/Tabs/TeacherCourseGeneralInfomationTabContent';
import { TeacherCourseAboutTabContent } from '../../../modules/Teacher/Course/Tabs/TeacherCourseAboutTabContent';
import { TeacherCourseSettingTab } from '../../../modules/Course/Teacher/TeacherCourseSettingPanel';
import { TeacherCourseRequestPublish } from '../../../modules/Teacher/Course/Actions/TeacherCourseRequestPublish';

enum ETab {
  generelInformation = 'generel_information',
  content = 'content',
  about = 'about',
  questions = 'questions',
  setting = 'setting',
}

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const routerOptions = { router };

  const queryOptions = { query: router.query };

  const id = urlQueryService.getOneAsNumber('id', queryOptions) as number;

  const tab = (urlQueryService.getOne('tab', queryOptions) ||
    ETab.generelInformation) as ETab;

  const setTab = (value: ETab) => {
    urlQueryService.setUrlQuery({ tab: value }, routerOptions);
  };

  const {
    data: course,
    refetch,
    isError,
    isSuccess,
    isLoading,
    isFetching,
  } = useQuery(
    ['teacherCourse', id],
    () => teacherCoursesService.getOneById(id),
    {
      enabled: router.isReady,
      staleTime: Infinity,
    },
  );

  const pageTitle = `${Messages.course.name} "${
    course?.name ? setMessage(course.name) : ''
  }"`;

  const handleChangeTab = (event: React.SyntheticEvent, newValue: ETab) => {
    setTab(newValue);
  };

  return (
    <>
      <TeacherPage
        title={pageTitle}
        header={{
          breadcrumbs: [
            {
              title: Messages.course.name,
              icon: faBook,
              path: APP_URL.teacher.courses,
            },
            {
              title: pageTitle,
            },
          ],
        }}
      >
        {isError && <NotFoundContainer />}

        {isLoading && <LoadingContainer />}

        {isSuccess && !!course && !!course.id && (
          <>
            <Container>
              <TeacherCourseRequestPublish course={course} refetch={refetch} />
            </Container>

            <TabContext value={tab}>
              <ContainerSpacingBottom>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChangeTab} variant="scrollable">
                    <Tab
                      icon={<FontAwesomeIcon icon={faInfoCircle} />}
                      label={Messages.common.generalInformation}
                      value={ETab.generelInformation}
                    />

                    <Tab
                      icon={<FontAwesomeIcon icon={faAddressBook} />}
                      label={Messages.common.about}
                      value={ETab.about}
                    />

                    <Tab
                      icon={<FontAwesomeIcon icon={faList} />}
                      label={Messages.course.content}
                      value={ETab.content}
                    />

                    <Tab
                      icon={<FontAwesomeIcon icon={faQuestion} />}
                      label={Messages.course.question}
                      value={ETab.questions}
                    />

                    <Tab
                      icon={<FontAwesomeIcon icon={faCog} />}
                      label={Messages.common.setting}
                      value={ETab.setting}
                    />
                  </TabList>
                </Box>
              </ContainerSpacingBottom>

              <ContainerSpacing>
                <TabPanel value={ETab.generelInformation}>
                  <TeacherCourseGeneralInfomationTabContent
                    course={course}
                    refetch={refetch}
                  />
                </TabPanel>

                <TabPanel value={ETab.about}>
                  <TeacherCourseAboutTabContent
                    course={course}
                    refetch={refetch}
                  />
                </TabPanel>

                <TabPanel value={ETab.content} sx={{ pr: 0, pl: 0 }}>
                  <CourseContentEditCard courseId={course.id} />
                </TabPanel>

                <TabPanel value={ETab.questions}>
                  <TeacherCourseQuestionsTabContent />
                </TabPanel>

                <TabPanel value={ETab.setting}>
                  <ContainerSpacing>
                    <TeacherCourseSettingTab course={course} />
                  </ContainerSpacing>
                </TabPanel>
              </ContainerSpacing>
            </TabContext>
          </>
        )}
      </TeacherPage>
    </>
  );
};

Page.layout = TeacherLayout;

export default Page;

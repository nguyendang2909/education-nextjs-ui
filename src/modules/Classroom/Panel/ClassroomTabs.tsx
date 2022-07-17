import { FC, useEffect } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useRouter } from 'next/router';
import { urlQueryService } from '../../../lib/url-query.service';
import { Box, CircularProgress, Pagination, Tab } from '@mui/material';
import { Messages } from '../../../lib/messages';
import { TextEditorReadOnly } from '../../../components/Editor/TextEditorReadOnly';
import { CourseData } from '../../../types/fetch-data.type';
import {
  BoxCenter,
  BoxMinHeightBig,
  BoxRightText,
  BoxSpacing,
  BoxSpacingBottom,
} from '../../../components/Box';
import { CreateQuestion } from '../questions/CreateQuestion';
import { useQuery } from 'react-query';
import { courseQuestionsService } from '../../../lib/course-questions.service';
import { CourseQuestions } from '../questions/CourseQuestions';
import { useAppSelector } from '../../../store/hooks';
import _ from 'lodash';
import { ClassroomQuestionsTabPanel } from './ClassroomQuestionsTabPanel';
import { ClassroomMyQuestionsTabPanel } from './ClassroomMyQuestionsTabPanel';

export enum EClassroomTab {
  about = 'about',
  document = 'document',
  myQuestions = 'myQuestions',
  questions = 'questions',
}

type ClassroomTabsProps = {
  course: CourseData;
};

export const ClassroomTabs: FC<ClassroomTabsProps> = ({ course }) => {
  const router = useRouter();

  const currentUserId = useAppSelector(state => state.user?.info?.id);

  const routerOptions = { router };

  const queryOptions = { query: router.query };

  const tab =
    (urlQueryService.getOne('tab', queryOptions) as EClassroomTab) ||
    EClassroomTab.about;

  const handleChangeTab = (
    event: React.SyntheticEvent,
    newValue: EClassroomTab,
  ) => {
    urlQueryService.replaceUrlQuery({ tab: newValue }, routerOptions);
  };

  return (
    <>
      {!!course.id && (
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab}>
              <Tab label={Messages.common.about} value={EClassroomTab.about} />
              <Tab
                label={Messages.course.question}
                value={EClassroomTab.questions}
              />
              <Tab
                label={Messages.course.myQuestion}
                value={EClassroomTab.myQuestions}
              />
            </TabList>
          </Box>

          <BoxMinHeightBig>
            <TabPanel value={EClassroomTab.about}>
              <TextEditorReadOnly data={course.about} />
            </TabPanel>

            <TabPanel value={EClassroomTab.questions}>
              <ClassroomQuestionsTabPanel />
            </TabPanel>

            <TabPanel value={EClassroomTab.myQuestions}>
              <ClassroomMyQuestionsTabPanel />
            </TabPanel>
          </BoxMinHeightBig>
        </TabContext>
      )}
    </>
  );
};

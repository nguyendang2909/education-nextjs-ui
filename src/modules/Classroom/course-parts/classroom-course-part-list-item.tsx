import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AccordionDetails,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Fragment, SyntheticEvent, useState } from 'react';
import {
  AppAccordion,
  AppAccordionSummary,
} from '../../../components/Accordin';
import { TypographyBold } from '../../../components/Text/Typography';
import { Messages, setMessage } from '../../../lib/messages';
import { CoursePartData } from '../../../types/fetch-data.type';
import { ClassroomLessonItem } from '../lesson/classroom-lesson-item';

type ClassroomCoursePartListItemProps = {
  selectedLessonId?: number;
  coursePart: CoursePartData;
  index: number;
  onLessonClick: (id: number) => void;
};

export const ClassroomCoursePartListItem: React.FC<
  ClassroomCoursePartListItemProps
> = props => {
  const { coursePart, index, onLessonClick, selectedLessonId } = props;

  const [isExpand, setExpand] = useState<boolean>(
    selectedLessonId
      ? !!coursePart.lesson?.find(lesson => lesson?.id === selectedLessonId)
      : index === 1,
  );

  const handleChangeAccordion =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpand(newExpanded);
    };

  return (
    <>
      <AppAccordion
        expanded={isExpand}
        onChange={handleChangeAccordion('panel')}
      >
        <AppAccordionSummary id={index.toString()}>
          <TypographyBold>{`${setMessage(Messages.course.part)} ${
            coursePart.order
          }: ${setMessage(coursePart.name)}`}</TypographyBold>
        </AppAccordionSummary>

        <AccordionDetails>
          {!!coursePart.lesson && coursePart.lesson.length > 0 && (
            <List component="div" disablePadding>
              {coursePart.lesson.map((lesson, index) => {
                const lessonId = lesson.id;

                return (
                  <Fragment key={index}>
                    {!!lessonId && (
                      <>
                        <ClassroomLessonItem
                          selected={selectedLessonId === lessonId}
                          lesson={lesson}
                          onClick={() => {
                            onLessonClick(lessonId);
                          }}
                        />
                      </>
                    )}
                  </Fragment>
                );
              })}
            </List>
          )}
        </AccordionDetails>
      </AppAccordion>
    </>
  );
};

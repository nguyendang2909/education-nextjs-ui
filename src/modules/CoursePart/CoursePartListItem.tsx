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
import { SyntheticEvent, useState } from 'react';
import { AppAccordion, AppAccordionSummary } from '../../components/Accordin';
import { TypographyBold } from '../../components/Text/Typography';
import { Messages, setMessage } from '../../lib/messages';
import { CoursePartData } from '../../types/fetch-data.type';
import { LessonListItem } from '../Lesson/LessonListItem';

type CoursePartListItemProps = {
  data: CoursePartData;
  number: number;
  onClickTrial: (id: number) => void;
};

export const CoursePartListItem: React.FC<CoursePartListItemProps> = ({
  onClickTrial,
  data,
  number,
}) => {
  const [isExpand, setExpand] = useState<boolean>(false);

  const { name, lesson: lessons } = data;

  const lessonsLength = lessons?.length;

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
        <AppAccordionSummary id={number.toString()}>
          <TypographyBold>
            {`${setMessage(Messages.course.part)} ${number}: ${setMessage(
              name,
            )}`}
          </TypographyBold>
        </AppAccordionSummary>

        <AccordionDetails>
          {!!lessons && !!lessonsLength && (
            <List component="div" disablePadding>
              {lessons.map((lesson, index) => {
                return (
                  <LessonListItem
                    divider={lessonsLength !== index + 1}
                    key={index}
                    lesson={lesson}
                    onClickTrial={onClickTrial}
                  />
                );
              })}
            </List>
          )}
        </AccordionDetails>
      </AppAccordion>
    </>
  );
};

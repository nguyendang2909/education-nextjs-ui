import {
  faFile,
  faAngleDown,
  faAngleUp,
  faCirclePlus,
  faBook,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { Messages, setMessage } from '../../../lib/messages';
import { CoursePartData } from '../../../types/fetch-data.type';
import { EditLessons } from '../../Lesson/Edit/EditLessons';
import { MoreMenu } from '../../../components/Menu/MoreMenu';
import { StackSpaceBetween } from '../../../components/Stack';
import { IconButtonMedium } from '../../../components/Button/IconButton';

type EditCoursePartProps = {
  coursePart: CoursePartData;
  onEdit: (id: number) => void;
  onDelete: (coursePart: CoursePartData) => void;
  onCreate: (coursePart: CoursePartData) => void;
  onFinish: () => void;
  selectedLessonId?: number;
};

export const EditCoursePart: React.FC<EditCoursePartProps> = ({
  coursePart,
  onEdit,
  onDelete,
  onCreate,
  onFinish,
  selectedLessonId,
}) => {
  const {
    id: coursePartId,
    orderPosition: coursePartOrderPosition,
    name: coursePartName,
    lesson: lessons,
  } = coursePart;

  const [open, setOpen] = useState<boolean>(
    !!selectedLessonId &&
      !!lessons?.find(lesson => lesson.id === selectedLessonId),
  );

  const handleSetOpen = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <ListItem sx={{ paddingLeft: 0 }}>
        <ListItemIcon onClick={handleSetOpen} sx={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
        </ListItemIcon>

        <ListItemText onClick={handleSetOpen} sx={{ cursor: 'pointer' }}>
          <Typography>
            <FontAwesomeIcon icon={faBook} /> {coursePartOrderPosition}.
            {` ${setMessage(coursePartName)}`}
          </Typography>
        </ListItemText>

        <ListItemIcon>
          <MoreMenu
            color="primary"
            items={[
              {
                name: `${Messages.course.lesson} ${Messages.common.new}`,
                icon: faCirclePlus,
                onClick: () => {
                  onCreate(coursePart);
                },
              },
              {
                name: Messages.action.edit,
                icon: faEdit,
                onClick: () => {
                  coursePartId && onEdit(coursePartId);
                },
              },
              {
                name: Messages.action.delete,
                icon: faTrash,
                onClick: () => {
                  onDelete(coursePart);
                },
              },
            ]}
          />
        </ListItemIcon>
      </ListItem>

      <Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box pl={5} pr={2} pb={1}>
            <EditLessons lessons={lessons} onFinish={onFinish} />
          </Box>
        </Collapse>
      </Box>

      <Divider />
    </Fragment>
  );
};

import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Messages, setMessage } from '../../../lib/messages';
import { LessonData } from '../../../types/fetch-data.type';

type LessonListItemProps = {
  selected?: boolean;
  onClick: () => void;
  lesson: LessonData;
};

export const ClassroomLessonItem: React.FC<LessonListItemProps> = ({
  selected = false,
  lesson,
  onClick,
}) => {
  return (
    <>
      <ListItemButton selected={selected} onClick={onClick}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faFileLines} />
        </ListItemIcon>

        <ListItemText
          primary={`${setMessage(Messages.course.lesson)} ${
            lesson.order || ''
          }: ${setMessage(lesson.name)}`}
        />
      </ListItemButton>
    </>
  );
};

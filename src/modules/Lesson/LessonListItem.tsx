import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Messages, setMessage } from '../../lib/messages';
import { LessonData } from '../../types/fetch-data.type';

type LessonListItemProps = {
  lesson: LessonData;
  divider?: boolean;
  onClickTrial: (lessonId: number) => void;
};

export const LessonListItem: React.FC<LessonListItemProps> = ({
  lesson,
  divider,
  onClickTrial,
}) => {
  const { name, number } = lesson;

  const handleClickTrial = () => {
    !!lesson.id && onClickTrial(lesson.id);
  };

  return (
    <ListItem divider={!!divider}>
      <ListItemIcon>
        <FontAwesomeIcon icon={faFileLines} />
      </ListItemIcon>

      <ListItemText
        primary={`${setMessage(Messages.course.lesson)} ${
          number || ''
        }: ${setMessage(name)}`}
      />
      {lesson.type === 'video' && (
        <>
          {!!lesson.trial && (
            <Button onClick={handleClickTrial}>
              {setMessage(Messages.lesson.trial)}
            </Button>
          )}
          {lesson.duration}
        </>
      )}
    </ListItem>
  );
};

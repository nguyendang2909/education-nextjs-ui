import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import { Messages } from '../../../lib/messages';
import { LessonData } from '../../../types/fetch-data.type';
import { MoreMenu } from '../../../components/Menu/MoreMenu';
import { StackSpaceBetween } from '../../../components/Stack';
import { pickBy } from 'lodash';

type EditLessonProps = {
  lesson: LessonData;
};

export const EditLesson: React.FC<EditLessonProps> = props => {
  const router = useRouter();

  const { lesson } = props;

  const {
    id: lessonId,
    name: lessonName,
    trial,
    videoURL,
    orderPosition: lessonOrderPosition,
  } = lesson;

  const selectedLessonIdAsString = Array.isArray(router.query.lesson)
    ? router.query.lesson[0]
    : router.query.lesson;

  const selectedLessonId = selectedLessonIdAsString
    ? +selectedLessonIdAsString
    : undefined;

  const handleClickLesson = () => {
    router.replace(
      {
        query: pickBy({ ...router.query, lesson: lessonId }),
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  return (
    <>
      {!!lessonId && (
        <>
          <StackSpaceBetween>
            <ListItemButton
              onClick={handleClickLesson}
              selected={!!selectedLessonId && selectedLessonId === lessonId}
            >
              <ListItemIcon>
                <FontAwesomeIcon icon={faFileLines} />
              </ListItemIcon>
              <ListItemText>
                {lessonOrderPosition}. {lessonName}
              </ListItemText>
            </ListItemButton>
          </StackSpaceBetween>
        </>
      )}
    </>
  );
};

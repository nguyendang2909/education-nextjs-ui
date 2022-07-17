import {
  faSquare,
  faSquareCheck,
  faSquareXmark,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useQuery } from 'react-query';
import { APP_API } from '../../../config';
import { Messages, setMessage, setSuccessMessage } from '../../../lib/messages';
import { requestAPI, requestService } from '../../../lib/request';
import { teacherLessonsService } from '../../../lib/teacher-lessons.service';
import { ELessonType, EVideoProcessingStatus } from '../../../types/enums';
import { BoxCenter } from '../../../components/Box';
import { EditButton } from '../../../components/Button/ActionButton';
import { EditLessonDialog } from '../../Course/Edit/course-content/EditLessonDialog';
import { StackSpaceBetween } from '../../../components/Stack';
import { TypographyCenter } from '../../../components/Text/Typography';
import { VideoPlayer } from '../../../components/VideoPlayer';
import { UploadLessonVideo } from './UploadLessonVideo';
import { MoreMenu } from '../../../components/Menu/MoreMenu';
import { DeleteDialog } from '../../../components/Dialog/DeleteDialog';
import { notificationService } from '../../../lib/notificationService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { NotFoundContainer } from '../../../components/NotFound/NotFoundContainer';
import { LoadingContainer } from '../../../components/Container/LoadingContainer';

type EditLessonContentProps = {
  lessonId: number;
  refetchCourseParts: () => void;
};

export const EditLessonContent: FC<EditLessonContentProps> = ({
  lessonId,
  refetchCourseParts,
}) => {
  const router = useRouter();

  const {
    data: lesson,
    refetch: refetchLesson,
    isSuccess,
    isLoading,
    isError,
    isFetching,
  } = useQuery(
    ['teacherLesson', lessonId],
    () => teacherLessonsService.getOneById(lessonId),
    { enabled: true, staleTime: Infinity },
  );

  const [deleteLesson, setDeleteLesson] = useState<boolean>(false);

  const [isUploadVideo, setUploadVideo] = useState<boolean>(false);

  const [editLessonId, setEditLessonId] = useState<number>();

  useEffect(() => {
    refetchLesson();
  }, [lessonId, refetchLesson]);

  const handleCloseEditLesson = () => {
    setEditLessonId(undefined);
  };

  const handleClickEditLesson = () => {
    lesson?.id && setEditLessonId(lesson.id);
  };

  const handleClickSetUploadVideo = () => {
    setUploadVideo(true);
  };

  const handleCancelSetUploadVideo = () => {
    setUploadVideo(false);
  };

  const handleDeleteLesson = async () => {
    try {
      if (lesson?.id) {
        await teacherLessonsService.delete(lesson.id);

        toast.success(
          setSuccessMessage(Messages.action.delete, Messages.lesson.name),
        );
      }
    } catch (err) {
      notificationService.handleError(err);
    }
  };

  const handleRefetch = () => {
    refetchCourseParts();

    const { lesson, ...extraQuery } = router.query;

    router.push({ query: { ...extraQuery } });
  };

  const handleRefetchEditLesson = () => {
    refetchCourseParts();

    refetchLesson();
  };

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (isError) {
    return <NotFoundContainer />;
  }

  if (lesson) {
    const { id: lessonId } = lesson;

    return (
      <>
        {lessonId && (
          <>
            <StackSpaceBetween>
              <Typography variant="h3" gutterBottom>
                {setMessage(lesson?.name)}
              </Typography>

              <Stack direction="row" spacing={2}>
                <EditButton onClick={handleClickEditLesson} />

                <MoreMenu
                  items={[
                    {
                      name: Messages.action.delete,
                      icon: 'trash',
                      onClick: () => setDeleteLesson(true),
                    },
                  ]}
                />
              </Stack>
            </StackSpaceBetween>

            {/* <Typography variant="h5">{Messages.common.information} </Typography> */}

            <Box pb={4}>
              <Typography gutterBottom>
                Học thử:{' '}
                <FontAwesomeIcon
                  icon={lesson.trial ? faSquareCheck : faSquareXmark}
                />
              </Typography>
            </Box>

            {lesson.type === ELessonType.Video && (
              <>
                {!!lesson.processingStatus &&
                  lesson.processingStatus ===
                    EVideoProcessingStatus.Processing && (
                    <Box pb={4}>
                      <TypographyCenter>
                        Video mới đang được chuyển đổi sang định dạng mp4. Việc
                        này có thể mất vài phút hoặc lâu hơn...
                      </TypographyCenter>
                    </Box>
                  )}

                {lesson.videoURL && !isUploadVideo ? (
                  <>
                    <Box pb={4}>
                      <VideoPlayer
                        autoPlay
                        url={requestService.getURL(
                          `${APP_API.teachers.lessonVideo}/${lessonId}`,
                        )}
                      ></VideoPlayer>
                    </Box>

                    <BoxCenter>
                      <Button onClick={handleClickSetUploadVideo}>
                        Upload video mới
                      </Button>
                    </BoxCenter>
                  </>
                ) : (
                  <Box
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      padding: 4,
                    }}
                  >
                    <Box>
                      <UploadLessonVideo
                        refetch={refetchLesson}
                        lessonId={lessonId}
                        onCancel={handleCancelSetUploadVideo}
                      ></UploadLessonVideo>
                    </Box>
                  </Box>
                )}
              </>
            )}

            {editLessonId && (
              <EditLessonDialog
                lessonId={editLessonId}
                onClose={handleCloseEditLesson}
                onFinish={handleRefetchEditLesson}
              />
            )}

            <DeleteDialog
              open={deleteLesson}
              name={Messages.lesson.name}
              onClose={() => setDeleteLesson(false)}
              onDelete={handleDeleteLesson}
              onFinish={handleRefetch}
            />
          </>
        )}
      </>
    );
  }

  return <></>;
};

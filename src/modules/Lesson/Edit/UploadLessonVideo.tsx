import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  CardActions,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { ChangeEvent, FC, useState } from 'react';
import { toast } from 'react-toastify';
import { APP_API } from '../../../config';
import { requestAPI } from '../../../lib/request';
import { UpdateLessonParams } from '../../../types/form-params.type';
import { BoxCenter } from '../../../components/Box';
import {
  CancelButton,
  UpdateButton,
  UploadButton,
} from '../../../components/Button/ActionButton';
import { TypographyCenter } from '../../../components/Text/Typography';

type UploadLessonVideoProps = {
  lessonId: number;
  refetch: () => void;
  onCancel: () => void;
};

export const UploadLessonVideo: FC<UploadLessonVideoProps> = ({
  lessonId,
  refetch,
  onCancel,
}) => {
  const [videoUploadPercentCompleted, setVideoUploadPercentCompleted] =
    useState<number | undefined>();

  const {
    handleSubmit,
    isSubmitting,
    getFieldProps,
    touched,
    errors,
    setFieldValue,
    values,
  } = useFormik<UpdateLessonParams>({
    enableReinitialize: true,
    initialValues: {
      file: undefined,
    },
    onSubmit: async values => {
      try {
        const file = values.file;

        if (!file) {
          toast.error('Cần nhập video');

          return;
        }

        const formData = new FormData();

        formData.append('file', file);

        formData.append('documentType', 'videoIntroduction');

        await requestAPI.patch(
          `${APP_API.teachers.lessonVideo}/${lessonId}`,
          formData,
          {
            timeout: 500000,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: progressEvent => {
              let percentCompleted = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100,
              );

              setVideoUploadPercentCompleted(percentCompleted);
            },
          },
        );

        refetch();

        onCancel();
      } catch (err) {
        setVideoUploadPercentCompleted(undefined);

        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    },
  });

  const handleChangeUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.currentTarget?.files
      ? event?.currentTarget?.files[0]
      : undefined;

    if (file) {
      setFieldValue('file', file);
    }
  };

  return (
    <>
      <Box pb={4}>
        <Typography variant="subtitle1">Tải video</Typography>
      </Box>

      <form noValidate onSubmit={handleSubmit}>
        <Box pb={4}>
          Video: {/* <IconButton component="label"> */}
          <input
            type="file"
            accept="video/*"
            name="file"
            id="file"
            // hidden
            onChange={handleChangeUploadFile}
          />
          {videoUploadPercentCompleted !== undefined && isSubmitting && (
            <Box mt={3}>
              <LinearProgress
                variant="determinate"
                value={videoUploadPercentCompleted}
              />
            </Box>
          )}
          {videoUploadPercentCompleted === 100 && isSubmitting && (
            <Box mt={3}>
              <TypographyCenter>
                Định dạng lại video, bạn vui lòng đợi trong giây lát...
              </TypographyCenter>
            </Box>
          )}
        </Box>

        <Stack direction="row" spacing={2}>
          <CancelButton onClick={onCancel} />
          <UploadButton loading={isSubmitting} sx={{ width: '200px' }} />
        </Stack>
      </form>
    </>
  );
};

import {
  faPhotoFilm,
  faUpload,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  IconButton,
  LinearProgress,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { ChangeEvent, FC, useState } from 'react';
import { toast } from 'react-toastify';
import { APP_API } from '../../../config';
import { Messages, setMessage } from '../../../lib/messages';
import { requestAPI } from '../../../lib/request';
import { EVideoProcessingStatus } from '../../../types/enums';
import { UpdateCourseParams } from '../../../types/form-params.type';
import {
  CancelButton,
  EditButton,
  UpdateButton,
  UploadButton,
} from '../../../components/Button/ActionButton';
import { TypographyCenter } from '../../../components/Text/Typography';
import { CourseIntroduction } from '../CourseIntroductionCard';
import { CourseIntroductionInEditMode } from './CourseIntroductionInEditMode';

type CourseIntroductionEditCardProps = {
  id: number;
  introductionVideoURL?: string;
  introductionVideoProcessingStatus?: EVideoProcessingStatus;
  onFinish?: () => void;
  sx?: SxProps<Theme>;
};

export const CourseIntroductionEditCard: FC<
  CourseIntroductionEditCardProps
> = props => {
  const {
    id,
    introductionVideoURL,
    introductionVideoProcessingStatus,
    onFinish,
    sx = {},
  } = props;

  const [videoUploadPercentCompleted, setVideoUploadPercentCompleted] =
    useState<number | undefined>();

  const [isEdit, setEdit] = useState<boolean>(false);

  const {
    handleSubmit,
    isSubmitting,
    getFieldProps,
    touched,
    errors,
    setFieldValue,
    values,
  } = useFormik<UpdateCourseParams>({
    enableReinitialize: true,
    initialValues: {
      // introductionVideoURL: introductionVideoURL,
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
          `${APP_API.teachers.coursesVideo}/${id}`,
          formData,
          {
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

        handleCancelEdit();

        onFinish && onFinish();
      } catch (err) {
        setVideoUploadPercentCompleted(undefined);

        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    },
  });

  const handleSetEdit = () => {
    setEdit(!isEdit);
  };

  const handleCancelEdit = () => {
    setEdit(false);
  };

  const handleChangeUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.currentTarget?.files
      ? event?.currentTarget?.files[0]
      : undefined;

    if (file) {
      setFieldValue('file', file);
    }
  };

  return (
    <Card sx={{ ...sx }}>
      <CardHeader
        title={setMessage(Messages.course.videoIntroduction)}
        action={<EditButton onClick={handleSetEdit} />}
      />
      <CardContent>
        {!isEdit ? (
          <Box>
            {!!introductionVideoProcessingStatus &&
              introductionVideoProcessingStatus ===
                EVideoProcessingStatus.Processing && (
                <Box pb={4}>
                  <TypographyCenter>
                    Video mới đang được chuyển đổi sang định dạng mp4. Việc này
                    có thể mất vài phút hoặc lâu hơn...
                    <br /> Bạn vui lòng đợi chút nhé.
                  </TypographyCenter>
                </Box>
              )}
            <CourseIntroductionInEditMode
              introductionVideoURL={introductionVideoURL}
              courseId={id}
              autoPlay={false}
            />
          </Box>
        ) : (
          <form noValidate onSubmit={handleSubmit}>
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
                <TypographyCenter>Vui lòng đợi trong giây lát</TypographyCenter>
              </Box>
            )}
            <CardActions sx={{ justifyContent: 'center' }}>
              <CancelButton onClick={handleCancelEdit} />
              <UploadButton loading={isSubmitting} />
            </CardActions>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

// type CourseIntroductionCardProps = {
//   introductionVideoURL?: string;
//   coverImageURL?: string;
// };

// export const CourseIntroductionCard: React.FC<
//   CourseIntroductionCardProps
// > = props => {
//   const { coverImageURL, introductionVideoURL } = props;

//   if (!coverImageURL && introductionVideoURL) {
//     return <></>;
//   }

//   return (
//     <Card>
//       <CardContent>
//         {/* <CourseIntroduction
//           coverImageURL={coverImageURL}
//           introductionVideoURL={introductionVideoURL}
//         /> */}
//       </CardContent>
//     </Card>
//   );
// };

// type CourseIntroductionProps = {
//   introductionVideoURL?: string;
//   coverImageURL?: string;
// };

// export const CourseIntroduction: React.FC<CourseIntroductionProps> = props => {
//   const { introductionVideoURL, coverImageURL } = props;

//   if (introductionVideoURL) {
//     return (
//       <div
//         style={{
//           position: 'relative',
//           paddingTop: '56.25%' /* 720 / 1280 = 0.5625 */,
//         }}
//       >
//         <ReactPlayer
//           style={{ position: 'absolute', top: 0, left: 0 }}
//           width="100%"
//           height="100%"
//           playing
//           url={introductionVideoURL}
//           controls
//         />
//       </div>
//     );
//   }

//   if (coverImageURL) {
//     // eslint-disable-next-line jsx-a11y/alt-text
//     return <img src={coverImageURL} />;
//   }

//   return <></>;
// };

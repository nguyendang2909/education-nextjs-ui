import React, { ChangeEvent, MouseEventHandler } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  SxProps,
  Theme,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { Messages, setMessage } from '../../../lib/messages';
import { requestAPI, requestService } from '../../../lib/request';
import { UpdateCourseParams } from '../../../types/form-params.type';
import { teacherCoursesService } from '../../../lib/teacher-courses.service';
import { ECourseImageType } from '../../../types/enums';

type FCProps = {
  courseId: number;
  coverImageURL?: string;
  // course: CourseData;
  onFinish?: () => void;
  sx?: SxProps<Theme>;
};

export const CourseCoverImageEditCard: React.FC<FCProps> = props => {
  const {
    courseId,
    coverImageURL: currentCoverImageURL,
    onFinish,
    sx = {},
  } = props;

  const formik = useFormik<UpdateCourseParams>({
    enableReinitialize: true,
    initialValues: {
      file: undefined,
    },
    onSubmit: async values => {
      try {
        const { file } = values;

        if (file) {
          await teacherCoursesService.updateImage(
            courseId,
            { documentType: ECourseImageType.CoverImage },
            file,
          );

          toast.success(
            setMessage(
              `${Messages.action.upload} ${Messages.course.coverImage} ${Messages.common.successfully}`,
            ),
          );

          onFinish && onFinish();

          formik.resetForm();
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    },
  });

  const { values, isSubmitting, handleSubmit, resetForm, setFieldValue } =
    formik;

  const uploadCoverImage = values.file;

  const handleChangeUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.currentTarget?.files
      ? event?.currentTarget?.files[0]
      : undefined;

    setFieldValue('file', file);
  };

  const handleCancelUploadFile: MouseEventHandler<HTMLButtonElement> = evt => {
    evt.preventDefault();

    resetForm();
  };

  return (
    <Card sx={{ ...sx }}>
      <form noValidate onSubmit={handleSubmit}>
        <CardHeader
          sx={{ mb: 2 }}
          title={setMessage(Messages.course.coverImage)}
          action={
            <Button
              component="label"
              startIcon={<FontAwesomeIcon icon="upload" />}
            >
              <input
                type="file"
                accept="image/*"
                name="file"
                id="file"
                hidden
                onChange={handleChangeUploadFile}
              />
              {setMessage(
                `${Messages.action.upload} ${Messages.course.coverImage}`,
              )}
            </Button>
          }
        />
        <label>
          <CardMedia
            component={Box}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              height: '150px',
              width: '300px',
              backgroundImage: uploadCoverImage
                ? `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("${URL.createObjectURL(
                    uploadCoverImage,
                  )}")`
                : currentCoverImageURL
                ? `url("${requestService.getURL(currentCoverImageURL)}")`
                : undefined,
              backgroundBlendMode: 'darken',
            }}
          >
            {uploadCoverImage && (
              <CardContent>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCancelUploadFile}
                  >
                    {setMessage(Messages.action.cancel)}
                  </Button>
                  <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    {setMessage(Messages.action.accept)}
                  </LoadingButton>
                </Stack>
              </CardContent>
            )}
          </CardMedia>
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file"
            hidden
            onChange={handleChangeUploadFile}
          />
        </label>
      </form>
    </Card>
  );
};

import { useFormik } from 'formik';
import React, { ChangeEvent } from 'react';
import * as Yup from 'yup';
import {
  Alert,
  Button,
  Collapse,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePen,
  faFont,
  faUpload,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import {
  Messages,
  setMessage,
  setRequiredMessage,
} from '../../../lib/messages';
import { CreateLessonParams } from '../../../types/form-params.type';
import { CreateDialog } from '../../../components/Dialog/CreateDialog';
import { toast } from 'react-toastify';
import { ELessonType } from '../../../types/enums';
import { teacherLessonsService } from '../../../lib/teacher-lessons.service';
import { FontAwesomeIconSpacing } from '../../../components/Icon';

type FCProps = {
  coursePartId: number;
  open: boolean;
  onClose: () => void;
  onFinish?: () => void;
};

export const CreateLessonDialog: React.FC<FCProps> = ({
  open,
  onClose,
  coursePartId,
  onFinish,
}) => {
  const {
    handleSubmit,
    isSubmitting,
    getFieldProps,
    touched,
    errors,
    resetForm,
    setFieldValue,
    values,
  } = useFormik<CreateLessonParams>({
    enableReinitialize: true,
    initialValues: {
      name: '',
      trial: false,
      coursePartId: coursePartId,
      orderPosition: 999,
      // file: undefined,
      type: ELessonType.Video,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(setRequiredMessage(Messages.lesson.name)),
      trial: Yup.boolean().required(setRequiredMessage(Messages.lesson.trial)),
      coursePartId: Yup.number().required(Messages.coursePart.name),
    }),
    onSubmit: async values => {
      try {
        const { file, coursePartId, type, ...createDto } = values;

        await teacherLessonsService.create({
          ...createDto,
          uploadFilename: file?.name,
          uploadFileType: file?.type,
          coursePartId,
          type,
        });

        // await fetch(data.uploadURL, {
        //   body: file,
        //   method: 'PUT',
        // });

        // data.videoURL &&
        //   (await teacherLessonsService.create({
        //     ...createDto,
        //     coursePartId,
        //     type,
        //     videoURL: data.videoURL,
        //   }));

        resetForm();

        onFinish && onFinish();

        onClose();
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    },
  });

  // const handleChangeUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event?.currentTarget?.files
  //     ? event?.currentTarget?.files[0]
  //     : undefined;

  //   file && setFieldValue('file', file);
  // };

  return (
    <CreateDialog
      name={`${Messages.lesson.name}`}
      open={open}
      onClose={onClose}
      onReset={resetForm}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    >
      <Stack spacing={3}>
        <TextField
          required
          fullWidth
          label={setMessage(Messages.lesson.name)}
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />
        <FormControlLabel
          control={<Switch {...getFieldProps('trial')} />}
          label={setMessage(Messages.lesson.trial)}
        />
        <TextField
          type="number"
          fullWidth
          label={setMessage(Messages.common.orderPosition)}
          {...getFieldProps('orderPosition')}
          error={Boolean(touched.orderPosition && errors.orderPosition)}
          helperText={touched.orderPosition && errors.orderPosition}
        />
        <TextField
          required
          fullWidth
          select
          label={setMessage(Messages.lesson.type)}
          {...getFieldProps('type')}
          error={Boolean(touched.type && errors.type)}
          helperText={touched.type && errors.type}
        >
          <MenuItem value={ELessonType.Video}>
            <FontAwesomeIconSpacing icon={faVideo} />{' '}
            {setMessage(Messages.lesson.video)}
          </MenuItem>
          <MenuItem value={ELessonType.Text}>
            <FontAwesomeIconSpacing icon={faFont} />{' '}
            {setMessage(Messages.lesson.text)}
          </MenuItem>
          <MenuItem value={ELessonType.Test}>
            <FontAwesomeIconSpacing icon={faFilePen} />{' '}
            {setMessage(Messages.lesson.test)}
          </MenuItem>
        </TextField>
        {/* <Box>
          <Collapse in={!!values.file}>
            <Alert>{values.file?.name}</Alert>
          </Collapse>
          <Button
            size="large"
            component="label"
            startIcon={<FontAwesomeIcon icon={faUpload} />}
          >
            <input
              type="file"
              accept="video/*"
              name="file"
              id="file"
              hidden
              onChange={handleChangeUploadFile}
            />
            {setMessage(`${Messages.action.upload} ${Messages.course.video}`)}
          </Button>
        </Box> */}
      </Stack>
    </CreateDialog>
  );
};

import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Box,
  Button,
  Collapse,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { ChangeEvent } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
import {
  Messages,
  setMessage,
  setRequiredMessage,
} from '../../../../lib/messages';
import { teacherLessonsService } from '../../../../lib/teacher-lessons.service';
import { UpdateLessonParams } from '../../../../types/form-params.type';
import { EditDialog } from '../../../../components/Dialog/EditDialog';

type FCProps = {
  lessonId: number;
  onClose: () => void;
  onFinish?: () => void;
};

export const EditLessonDialog: React.FC<FCProps> = props => {
  const { onClose, onFinish, lessonId } = props;

  const { data: lesson } = useQuery(
    ['teacherLesson', lessonId],
    () => teacherLessonsService.getOneById(lessonId),
    {
      enabled: lessonId > 0,
    },
  );

  const {
    handleSubmit,
    isSubmitting,
    getFieldProps,
    touched,
    errors,
    resetForm,
    values,
    setFieldValue,
  } = useFormik<UpdateLessonParams>({
    enableReinitialize: true,
    initialValues: {
      name: lesson?.name,
      trial: lesson?.trial,
      orderPosition: lesson?.orderPosition,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(setRequiredMessage(Messages.lesson.name)),
      trial: Yup.boolean().required(setRequiredMessage(Messages.lesson.trial)),
    }),
    onSubmit: async values => {
      try {
        lesson?.id && (await teacherLessonsService.update(lesson.id, values));

        resetForm();

        onClose();

        onFinish && onFinish();
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    },
  });

  return (
    <EditDialog
      name={Messages.lesson.name}
      open={!!lessonId}
      onClose={onClose}
      onSubmit={handleSubmit}
      onReset={resetForm}
      isSubmitting={isSubmitting}
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
          control={
            <Switch checked={values.trial} {...getFieldProps('trial')} />
          }
          label={setMessage(Messages.lesson.trial)}
        />
        <TextField
          type="number"
          required
          fullWidth
          label={setMessage(Messages.common.orderPosition)}
          {...getFieldProps('orderPosition')}
          error={Boolean(touched.orderPosition && errors.orderPosition)}
          helperText={touched.orderPosition && errors.orderPosition}
        />
      </Stack>
    </EditDialog>
  );
};

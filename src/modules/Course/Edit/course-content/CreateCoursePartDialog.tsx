import { Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { FC } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import {
  Messages,
  setMessage,
  setRequiredMessage,
  setSuccessMessage,
} from '../../../../lib/messages';
import { teacherCoursePartsService } from '../../../../lib/teacher-courseparts.service';
import { CreateCoursePartParams } from '../../../../types/form-params.type';
import { CreateDialog } from '../../../../components/Dialog/CreateDialog';

type FCProps = {
  courseId: number;
  open: boolean;
  onClose: () => void;
  onFinish?: () => void;
};

export const CreateCoursePartDialog: FC<FCProps> = props => {
  const { open, onClose, courseId, onFinish } = props;

  const {
    handleSubmit,
    isSubmitting,
    getFieldProps,
    touched,
    errors,
    resetForm,
  } = useFormik<CreateCoursePartParams>({
    enableReinitialize: true,
    initialValues: {
      name: '',
      courseId: courseId,
      orderPosition: 999,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(setRequiredMessage(Messages.coursePart.name)),
    }),
    onSubmit: async values => {
      try {
        await teacherCoursePartsService.create(values);

        toast.success(
          setSuccessMessage(Messages.action.add, Messages.course.part),
        );

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

  const handleReset = () => {
    resetForm();
  };

  return (
    <CreateDialog
      name={Messages.course.part}
      open={open}
      onClose={onClose}
      onReset={handleReset}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    >
      <Stack spacing={3}>
        <TextField
          required
          fullWidth
          label={setMessage(Messages.coursePart.name)}
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />
        <TextField
          required
          fullWidth
          type="number"
          label={setMessage(Messages.common.orderPosition)}
          {...getFieldProps('orderPosition')}
          error={Boolean(touched.orderPosition && errors.orderPosition)}
          helperText={touched.orderPosition && errors.orderPosition}
        />
      </Stack>
    </CreateDialog>
  );
};

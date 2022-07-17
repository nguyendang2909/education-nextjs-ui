import { Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import {
  Messages,
  setMessage,
  setRequiredMessage,
  setSuccessMessage,
} from '../../../../lib/messages';
import { teacherCoursePartsService } from '../../../../lib/teacher-courseparts.service';
import { CoursePartData } from '../../../../types/fetch-data.type';
import { UpdateCoursePartParams } from '../../../../types/form-params.type';
import { EditDialog } from '../../../../components/Dialog/EditDialog';

type FCProps = {
  id: number;
  open: boolean;
  onClose: () => void;
  onFinish?: () => void;
};

export const EditCoursePartDialog: React.FC<FCProps> = props => {
  const { open, onClose, id, onFinish } = props;

  const [coursePart, setCoursePart] = React.useState<CoursePartData>({});

  const fetchCoursePart = useCallback(async () => {
    try {
      const data = await teacherCoursePartsService.getOneById(id);

      data && setCoursePart(data);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }, [id]);

  React.useEffect(() => {
    id && fetchCoursePart();
  }, [fetchCoursePart, id]);

  const {
    handleSubmit,
    isSubmitting,
    getFieldProps,
    touched,
    errors,
    resetForm,
  } = useFormik<UpdateCoursePartParams>({
    enableReinitialize: true,
    initialValues: {
      name: coursePart.name || '',
      orderPosition: coursePart.orderPosition || 999,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(setRequiredMessage(Messages.coursePart.name)),
    }),
    onSubmit: async values => {
      try {
        await teacherCoursePartsService.update(id, values);

        toast.success(
          setSuccessMessage(Messages.action.update, Messages.course.part),
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
    <EditDialog
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

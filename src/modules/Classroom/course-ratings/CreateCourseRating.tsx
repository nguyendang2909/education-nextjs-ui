import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { CreateDialog } from '../../../components/Dialog/CreateDialog';
import * as Yup from 'yup';
import { CreateCourseRatingParams } from '../../../types/form-params.type';
import {
  Messages,
  setMessage,
  setRequiredMaxValueMessage,
  setRequiredMessage,
  setRequiredMinLengthMessage,
  setRequiredMinValueMessage,
  setSuccessMessage,
} from '../../../lib/messages';
import { courseRatingsService } from '../../../lib/course-ratings.service';
import { notificationService } from '../../../lib/notificationService';
import { Stack, TextField } from '@mui/material';
import { toast } from 'react-toastify';

type CreateCourseRatingDialogProps = {
  courseId: number;
  rating: number;
  onClose: () => void;
};

export const CreateCourseRatingDialog: FC<CreateCourseRatingDialogProps> = ({
  courseId,
  rating,
  onClose,
}) => {
  const {
    handleSubmit,
    isSubmitting,
    resetForm,
    getFieldProps,
    touched,
    errors,
  } = useFormik<CreateCourseRatingParams>({
    enableReinitialize: true,
    initialValues: {
      rating: rating,
      comment: '',
    },
    validationSchema: Yup.object().shape({
      rating: Yup.number()
        .required(setRequiredMessage(Messages.rating.name))
        .moreThan(0, setRequiredMinValueMessage(1, Messages.rating.name))
        .lessThan(6, setRequiredMaxValueMessage(5, Messages.rating.name)),
      comment: Yup.string().notRequired(),
    }),
    onSubmit: async values => {
      try {
        await courseRatingsService.create({ ...values, courseId: courseId });

        toast.success(
          setSuccessMessage(Messages.action.rate, Messages.course.name),
        );

        onClose();
      } catch (err) {
        notificationService.handleError(err);
      }
    },
  });
  return (
    <>
      <CreateDialog
        name={Messages.rating.name}
        open={rating > 0}
        onClose={onClose}
        onReset={resetForm}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        fullscreen={false}
        submitButtonTitle={Messages.action.rate}
      >
        <Stack spacing={3}>
          <TextField
            type="number"
            required
            fullWidth
            label={setMessage(Messages.rating.name)}
            {...getFieldProps('rating')}
            error={Boolean(touched.rating && errors.rating)}
            helperText={touched.rating && errors.rating}
          />
          <TextField
            multiline
            minRows={3}
            maxRows={5}
            fullWidth
            label={setMessage(Messages.rating.comment)}
            {...getFieldProps('comment')}
            error={Boolean(touched.comment && errors.comment)}
            helperText={touched.comment && errors.comment}
          />
        </Stack>
      </CreateDialog>
    </>
  );
};

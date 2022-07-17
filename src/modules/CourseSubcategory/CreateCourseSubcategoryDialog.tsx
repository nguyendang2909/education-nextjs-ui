import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {
  Messages,
  setMessage,
  setRequiredMaxLengthMessage,
} from '../../lib/messages';
import { notificationService } from '../../lib/notificationService';
import { CreateCourseSubcategoryParams } from '../../types/form-params.type';
import { CreateDialog } from '../../components/Dialog/CreateDialog';
import { adminCourseSubcategoriesService } from '../../lib/admin-course-subcategories.service';

type FCProps = {
  courseCategoryId: number;
  open: boolean;
  onClose: () => void;
  onReload?: () => Promise<any>;
};

export const CreateCourseSubcategoryDialog: React.FC<FCProps> = props => {
  const { open, onClose, onReload, courseCategoryId } = props;

  const formik = useFormik<CreateCourseSubcategoryParams>({
    enableReinitialize: true,
    initialValues: {
      courseCategoryId: courseCategoryId,
      name: '',
      orderPosition: 999,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required()
        .max(
          1000,
          setRequiredMaxLengthMessage(1000, Messages.courseSubcategory.name),
        ),
      orderPosition: Yup.number().notRequired().nullable(),
    }),
    initialTouched: {},
    onSubmit: async (values: CreateCourseSubcategoryParams) => {
      try {
        await adminCourseSubcategoriesService.create(values);

        if (onReload) {
          onReload();
        }

        formik.resetForm();

        onClose();
      } catch (err) {
        notificationService.handleError(err);
      }
    },
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    resetForm,
  } = formik;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <CreateDialog
        isSubmitting={isSubmitting}
        name={Messages.courseSubcategory.name}
        open={open}
        onClose={onClose}
        onSubmit={handleSubmit}
        onReset={resetForm}
      >
        <TextField
          variant="outlined"
          size="small"
          margin="normal"
          required
          fullWidth
          id="name"
          label={setMessage(Messages.courseSubcategory.name)}
          autoFocus
          {...getFieldProps('name')}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />

        <TextField
          type="number"
          variant="outlined"
          size="small"
          margin="normal"
          fullWidth
          id="orderPosition"
          label={setMessage(Messages.common.orderPosition)}
          autoFocus
          {...getFieldProps('orderPosition')}
          error={touched.orderPosition && Boolean(errors.orderPosition)}
          helperText={touched.orderPosition && errors.orderPosition}
        />
      </CreateDialog>
    </form>
  );
};

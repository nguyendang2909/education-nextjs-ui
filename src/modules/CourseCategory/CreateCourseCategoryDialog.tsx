import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {
  Messages,
  setMessage,
  setRequiredMaxLengthMessage,
  setRequiredMessage,
} from '../../lib/messages';
import { notificationService } from '../../lib/notificationService';
import { CreateDialog } from '../../components/Dialog/CreateDialog';
import { IconField } from '../../components/Form/IconField';
import { ACreateCourseCategoryParams } from '../../types/form-params.type';
import { adminCourseCategoriesService } from '../../lib/admin-course-categories.service';

type FCProps = {
  open: boolean;
  onClose: () => void;
  onReload?: () => Promise<any>;
};
export const CreateCourseCategoryDialog: React.FC<FCProps> = props => {
  const { open, onClose, onReload } = props;

  const formik = useFormik<ACreateCourseCategoryParams>({
    // enableReinitialize: true,
    initialValues: {
      name: '',
      icon: 'question',
      orderPosition: 999,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required(setRequiredMessage(Messages.courseCategory.name))
        .max(
          1000,
          setRequiredMaxLengthMessage(1000, Messages.courseCategory.name),
        ),
      icon: Yup.string()
        .notRequired()
        .nullable()
        .max(100, setRequiredMaxLengthMessage(100, Messages.common.icon)),
      order: Yup.number().notRequired().nullable(),
    }),
    initialTouched: {},
    onSubmit: async (values: ACreateCourseCategoryParams) => {
      try {
        await adminCourseCategoriesService.create(values);

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
    <CreateDialog
      isSubmitting={isSubmitting}
      name={Messages.courseCategory.name}
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
        label={setMessage(Messages.courseCategory.name)}
        autoFocus
        {...getFieldProps('name')}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
      />
      <IconField
        required={true}
        {...getFieldProps('icon')}
        error={touched.icon && Boolean(errors.icon)}
        helperText={touched.icon && errors.icon}
      />
      <TextField
        type="number"
        variant="outlined"
        size="small"
        margin="normal"
        fullWidth
        id="orderPosition"
        label={setMessage(Messages.courseCategory.orderPosition)}
        autoFocus
        {...getFieldProps('orderPosition')}
        error={touched.orderPosition && Boolean(errors.orderPosition)}
        helperText={touched.orderPosition && errors.orderPosition}
      />
    </CreateDialog>
  );
};

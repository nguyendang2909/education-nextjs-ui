import { TextField } from '@mui/material';
import { useFormik } from 'formik';

import React, { useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import {
  Messages,
  setMessage,
  setRequiredMaxLengthMessage,
} from '../../lib/messages';
import { notificationService } from '../../lib/notificationService';
import { requestAPI } from '../../lib/request';
import { AUpdateCourseSubcategoryParams } from '../../types/form-params.type';
import { EditDialog } from '../../components/Dialog/EditDialog';
import { useQuery } from 'react-query';
import { adminCourseSubcategoriesService } from '../../lib/admin-course-subcategories.service';

type FCProps = {
  courseSubcategoryId: number;
  open: boolean;
  onClose: () => void;
  onReload?: () => Promise<any>;
};
export const EditCourseSubcategoryDialog: React.FC<FCProps> = props => {
  const { open, onClose, courseSubcategoryId, onReload } = props;

  const { data: courseSubcategory } = useQuery(
    ['adminCourseSubcategory', courseSubcategoryId],
    () => adminCourseSubcategoriesService.getOneById(courseSubcategoryId),
    {
      enabled: courseSubcategoryId > 0,
    },
  );

  const formik = useFormik<AUpdateCourseSubcategoryParams>({
    enableReinitialize: true,
    initialValues: {
      name: courseSubcategory?.name || '',
      orderPosition: courseSubcategory?.orderPosition || 999,
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
    onSubmit: async values => {
      try {
        await adminCourseSubcategoriesService.update(
          courseSubcategoryId,
          values,
        );

        onReload && onReload();

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
    <EditDialog
      isSubmitting={isSubmitting}
      name={`${Messages.courseSubcategory.name} ${setMessage(
        courseSubcategory?.name,
      )}`}
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
    </EditDialog>
  );
};

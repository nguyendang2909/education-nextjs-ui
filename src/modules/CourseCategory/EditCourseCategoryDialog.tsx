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
import { AUpdateCourseCategoryParams } from '../../types/form-params.type';
import { EditDialog } from '../../components/Dialog/EditDialog';
import { IconField } from '../../components/Form/IconField';
import { useQuery } from 'react-query';
import { adminCourseCategoriesService } from '../../lib/admin-course-categories.service';

type FCProps = {
  courseCategoryId: number;
  open: boolean;
  onClose: () => void;
  onReload?: () => Promise<any>;
};

export const EditCourseCategoryDialog: React.FC<FCProps> = ({
  courseCategoryId,
  open,
  onClose,
  onReload,
}) => {
  const { data: courseCategory } = useQuery(
    ['adminCourseCategory', courseCategoryId],
    () => adminCourseCategoriesService.getOneById(courseCategoryId),
    {
      enabled: courseCategoryId > 0,
    },
  );

  const formik = useFormik<AUpdateCourseCategoryParams>({
    enableReinitialize: true,
    initialValues: {
      name: courseCategory?.name || '',
      icon: courseCategory?.icon || 'home',
      orderPosition: courseCategory?.orderPosition || 999,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required()
        .max(
          1000,
          setRequiredMaxLengthMessage(1000, Messages.courseCategory.name),
        ),
      icon: Yup.string()
        .required()
        .max(100, setRequiredMaxLengthMessage(100, Messages.common.icon)),
      order: Yup.number().notRequired().nullable(),
    }),
    initialTouched: {},
    onSubmit: async (values: AUpdateCourseCategoryParams) => {
      try {
        await adminCourseCategoriesService.update(courseCategoryId, values);

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
    <>
      {!!courseCategory?.id && (
        <EditDialog
          isSubmitting={isSubmitting}
          name={`${Messages.courseCategory.name} ${setMessage(
            courseCategory?.name,
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
        </EditDialog>
      )}
    </>
  );
};

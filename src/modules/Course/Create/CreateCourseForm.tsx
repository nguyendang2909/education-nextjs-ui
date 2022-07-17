import { Form, FormikProvider, useFormik } from 'formik';
import React, { useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import { MenuItem, Stack, TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CourseCategoryData,
  CourseData,
  CourseSubcategoryData,
} from '../../../types/fetch-data.type';
import { requestAPI } from '../../../lib/request';
import { notificationService } from '../../../lib/notificationService';
import { CreateCourseParams } from '../../../types/form-params.type';
import {
  Messages,
  setMessage,
  setRequiredMaxLengthMessage,
  setRequiredMessage,
} from '../../../lib/messages';
import { useRouter } from 'next/router';
import { APP_API, APP_URL } from '../../../config';
import { teacherCoursesService } from '../../../lib/teacher-courses.service';

type FCProps = {};

export const CreateCourseForm: React.FC<FCProps> = props => {
  const router = useRouter();

  const [courseCategories, setCourseCategories] = React.useState<
    CourseCategoryData[]
  >([]);

  const [courseSubcategories, setCourseSubcategories] = React.useState<
    CourseSubcategoryData[]
  >([]);

  const fetchCourseCategories = async () => {
    try {
      const data = await requestAPI.get<CourseCategoryData[]>(
        APP_API.courseCategories,
      );

      data && setCourseCategories(data);
    } catch (err) {
      notificationService.handleError(err);
    }
  };

  const formik = useFormik<CreateCourseParams>({
    enableReinitialize: true,
    initialValues: {
      name: '',
      // subTitle: '',
      courseCategoryId: '',
      courseSubcategoryId: '',
      // courseSubcategoryId: [],
      // introductionVideoURL: '',
      // about: '',
      // courseParts?: CoursePart[];
      // price?: number;
      // promotionPrice?: number;
      // promotionStartTime?: Date;
      // promotionEndTime?: Date;
      // sell?: boolean;
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required(setRequiredMessage(Messages.course.name))
        .max(100, setRequiredMaxLengthMessage(100, Messages.course.name)),
      // subTitle: Yup.string().notRequired(),
      courseCategoryId: Yup.number().required(),
      // courseSubcategoryId: Yup.array().required(
      courseSubcategoryId: Yup.number().required(
        setRequiredMessage(Messages.courseSubcategory.name),
      ),
    }),
    initialTouched: {},
    onSubmit: async values => {
      try {
        const { courseCategoryId, courseSubcategoryId, ...params } = values;

        if (courseCategoryId && courseSubcategoryId) {
          const data = await teacherCoursesService.create({
            ...params,
            courseCategoryId,
            courseSubcategoryId,
          });

          data &&
            data.id &&
            router.push(`${APP_URL.teacher.courses}/${data.id}`);
        }
      } catch (err) {
        notificationService.handleError(err);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const fetchCourseSubcategories = useCallback(async () => {
    try {
      const data = await requestAPI.get<CourseSubcategoryData[]>(
        APP_API.courseSubcategories,
        {
          params: {
            courseCategoryId: values.courseCategoryId,
          },
        },
      );

      data && setCourseSubcategories(data);
    } catch (err) {
      notificationService.handleError(err);
    }
  }, [values.courseCategoryId]);

  useEffect(() => {
    fetchCourseCategories();
  }, []);

  React.useEffect(() => {
    if (values.courseCategoryId) {
      fetchCourseSubcategories();
    }
  }, [fetchCourseSubcategories, values.courseCategoryId]);

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            required
            fullWidth
            label={setMessage(Messages.course.name)}
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            select
            required
            fullWidth
            label={setMessage(Messages.courseCategory.name)}
            {...getFieldProps('courseCategoryId')}
            error={Boolean(touched.courseCategoryId && errors.courseCategoryId)}
            helperText={touched.courseCategoryId && errors.courseCategoryId}
          >
            {courseCategories.map(courseCategory => {
              const { id, name, icon } = courseCategory;

              return (
                <MenuItem key={id} value={id}>
                  <Stack direction="row" spacing={2}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                      }}
                    >
                      {icon && <FontAwesomeIcon icon={icon} size="lg" />}
                    </Box>
                    <Box>{name}</Box>
                  </Stack>
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            select
            required
            fullWidth
            label={setMessage(Messages.courseSubcategory.name)}
            {...getFieldProps('courseSubcategoryId')}
            error={Boolean(
              touched.courseSubcategoryId && errors.courseSubcategoryId,
            )}
            helperText={
              touched.courseSubcategoryId && errors.courseSubcategoryId
            }
          >
            {courseSubcategories.map(courseCategory => {
              const { id, name, icon } = courseCategory;

              return (
                <MenuItem key={id} value={id}>
                  <Stack direction="row" spacing={2}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                      }}
                    >
                      {icon && <FontAwesomeIcon icon={icon} size="lg" />}
                    </Box>
                    <Box>{name}</Box>
                  </Stack>
                </MenuItem>
              );
            })}
          </TextField>
          {/* <Autocomplete
            multiple
            fullWidth
            id="courseSubcategories"
            options={courseSubcategories}
            getOptionLabel={option => option.name || ''}
            onChange={(e, values: CourseSubcategoryData[]) => {
              setFieldValue(
                'courseSubcategoryId',
                values.map(courseSubcategory => courseSubcategory.id),
              );
            }}
            renderInput={params => (
              <TextField
                required
                {...params}
                label={setMessage(Messages.courseSubcategory.name)}
              />
            )}
          ></Autocomplete> */}
          {/* <TextField
            fullWidth
            multiline
            rows={4}
            inputProps={{ maxLength: 500 }}
            label={setMessage(Messages.status.subTitle)}
            {...getFieldProps('subTitle')}
            error={Boolean(touched.subTitle && errors.subTitle)}
            helperText={`${
              touched.subTitle && errors.subTitle ? errors.subTitle : ''
            } ${values.subTitle?.length || 0}/500`}
          /> */}
          <LoadingButton
            // fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            startIcon={<FontAwesomeIcon icon="plus" />}
          >
            {setMessage(Messages.action.create)}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

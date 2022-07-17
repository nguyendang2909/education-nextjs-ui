import {
  CardContent,
  CardHeader,
  Grid,
  Typography,
  TextField,
  CardActions,
  Stack,
  Card,
  SxProps,
  Theme,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { FormikContextType, useFormik } from 'formik';
import * as Yup from 'yup';
import { UpdateCourseParams } from '../../../types/form-params.type';
import { coursesService } from '../../../lib/courses.service';
import {
  Messages,
  setMessage,
  setRequiredMessage,
} from '../../../lib/messages';
import {
  CancelButton,
  EditButton,
  UpdateButton,
} from '../../../components/Button/ActionButton';
import { toast } from 'react-toastify';
import { teacherCoursesService } from '../../../lib/teacher-courses.service';

const GridCourseInfoKey = styled(props => <Grid item {...props} />)(
  ({ theme }) => ({
    width: theme.spacing(12),
  }),
);

type FCProps = {
  id: number;
  onFinish: () => void;
  certificate?: boolean;
  duration?: number;
  name?: string;
  subTitle?: string;
  sx?: SxProps<Theme>;
};

export const CourseTitleEditCard: React.FC<FCProps> = props => {
  const {
    id,
    certificate: courseCertificate,
    duration: courseDuration,
    name: courseName,
    subTitle: courseSubtitle,

    onFinish,
    sx = {},
  } = props;

  const [isEdit, setEdit] = React.useState<boolean>();

  const formik: FormikContextType<UpdateCourseParams> =
    useFormik<UpdateCourseParams>({
      enableReinitialize: true,
      initialValues: {
        name: courseName,
        subTitle: courseSubtitle,
        duration: courseDuration,
        certificate: courseCertificate,
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().required(setRequiredMessage(Messages.course.name)),
        subTitle: Yup.string().notRequired(),
        duration: Yup.number().notRequired(),
        certificate: Yup.boolean().notRequired(),
      }),
      onSubmit: async values => {
        try {
          await teacherCoursesService.update(id, values);

          setEdit(false);

          onFinish && onFinish();
        } catch (err) {
          if (err instanceof Error) {
            toast.error(err.message);
          }
        }
      },
    });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    resetForm,
    setFieldValue,
  } = formik;

  const handleCancelEdit = () => {
    resetForm();

    setEdit(false);
  };

  const handleClickEditButton = () => {
    setEdit(!isEdit);
  };

  return (
    <Card sx={{ ...sx }}>
      <form noValidate onSubmit={handleSubmit}>
        <CardHeader
          title={setMessage(
            `${Messages.common.information} ${Messages.course.name}`,
          )}
          action={<EditButton onClick={handleClickEditButton} />}
        ></CardHeader>
        <CardContent>
          {isEdit ? (
            <>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  required
                  label={setMessage(Messages.course.name)}
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  inputProps={{ maxLength: 500 }}
                  label={setMessage(Messages.common.subTitle)}
                  {...getFieldProps('subTitle')}
                  error={Boolean(touched.subTitle && errors.subTitle)}
                  helperText={`${
                    touched.subTitle && errors.subTitle ? errors.subTitle : ''
                  } ${values.subTitle?.length || 0}/500`}
                />
                <TextField
                  type="number"
                  fullWidth
                  inputProps={{ maxLength: 500 }}
                  label={setMessage(Messages.course.durationInMinute)}
                  {...getFieldProps('duration')}
                  error={Boolean(touched.duration && errors.duration)}
                  helperText={touched.duration && errors.duration}
                />
                <FormControlLabel
                  label={setMessage(Messages.course.certificate)}
                  control={
                    <Checkbox
                      value={values.certificate}
                      id="certificate"
                      defaultChecked={courseCertificate}
                      name="certificate"
                      onChange={e => {
                        setFieldValue('certificate', e.target.checked);
                      }}
                    />
                  }
                />
              </Stack>
            </>
          ) : (
            <>
              <Grid container spacing={2}>
                <GridCourseInfoKey>
                  <Typography noWrap>
                    {setMessage(Messages.course.name)}
                  </Typography>
                </GridCourseInfoKey>
                <Grid container item flex="1 0" direction="row">
                  <Typography>{setMessage(courseName)}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <GridCourseInfoKey>
                  <Typography>
                    {setMessage(Messages.common.subTitle)}
                  </Typography>
                </GridCourseInfoKey>
                <Grid container item flex="1 0" direction="row">
                  <Typography>{setMessage(courseSubtitle)}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <GridCourseInfoKey>
                  <Typography>
                    {setMessage(Messages.course.durationInMinute)}
                  </Typography>
                </GridCourseInfoKey>
                <Grid container item flex="1 0" direction="row">
                  <Typography>{courseDuration || 0}</Typography>
                </Grid>
              </Grid>
            </>
          )}
        </CardContent>
        {isEdit && (
          <CardActions sx={{ justifyContent: 'center' }}>
            <CancelButton onClick={handleCancelEdit}>
              {Messages.action.cancel}
            </CancelButton>
            <UpdateButton loading={isSubmitting}>
              {Messages.action.update}
            </UpdateButton>
          </CardActions>
        )}
      </form>
    </Card>
  );
};

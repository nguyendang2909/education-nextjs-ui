import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UpdateCourseParams } from '../../../types/form-params.type';
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
import { CourseOutputGrid } from '../CourseOutput';
import { toast } from 'react-toastify';
import { teacherCoursesService } from '../../../lib/teacher-courses.service';

type CourseOutputEditCardProps = {
  id: number;
  output?: string;
  onFinish: () => void;
};

export const CourseOutputEditCard: React.FC<
  CourseOutputEditCardProps
> = props => {
  const [isEdit, setEdit] = React.useState<boolean>(false);

  const { id, output, onFinish } = props;

  const { isSubmitting, handleSubmit, getFieldProps, touched, errors } =
    useFormik<UpdateCourseParams>({
      enableReinitialize: true,
      validationSchema: Yup.object().shape({
        output: Yup.string().required(
          setRequiredMessage(Messages.course.output),
        ),
      }),
      initialValues: {
        output: output || '',
      },
      onSubmit: async values => {
        try {
          await teacherCoursesService.update(id, values);

          onFinish && onFinish();

          setEdit(false);
        } catch (err) {
          if (err instanceof Error) {
            toast.error(err.message);
          }
        }
      },
    });

  const handleSetEdit = () => {
    setEdit(!isEdit);
  };

  return (
    <Card>
      <CardHeader
        title={setMessage(Messages.course.output)}
        action={<EditButton onClick={handleSetEdit} />}
      ></CardHeader>
      <CardContent>
        {isEdit ? (
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              multiline
              minRows={8}
              label={setMessage(Messages.course.output)}
              {...getFieldProps('output')}
              error={Boolean(touched.output && errors.output)}
              helperText={touched.output && errors.output}
            />
            <CardActions sx={{ justifyContent: 'center' }}>
              <CancelButton onClick={handleSetEdit} />
              <UpdateButton loading={isSubmitting} />
            </CardActions>
          </form>
        ) : (
          <CourseOutputGrid courseOutput={output || ''} />
        )}
      </CardContent>
    </Card>
  );
};

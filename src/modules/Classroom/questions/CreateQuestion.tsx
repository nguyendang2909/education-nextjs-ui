import { Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { FC } from 'react';
import {
  Messages,
  setMessage,
  setRequiredMaxLengthMessage,
  setRequiredMessage,
} from '../../../lib/messages';
import * as Yup from 'yup';
import { CreateCourseQuestionParams } from '../../../types/form-params.type';
import { courseQuestionsService } from '../../../lib/course-questions.service';
import { SendButton } from '../../../components/Button/ActionButton';

type CreateQuestionProps = {
  courseId: number;
  refetch: () => void;
};

export const CreateQuestion: FC<CreateQuestionProps> = ({
  courseId,
  refetch,
}) => {
  const {
    getFieldProps,
    handleSubmit,
    touched,
    errors,
    resetForm,
    isSubmitting,
  } = useFormik<CreateCourseQuestionParams>({
    initialValues: {
      content: '',
    },
    validationSchema: Yup.object().shape({
      content: Yup.string()
        .required(setRequiredMessage(Messages.course.question))
        .max(1000, setRequiredMaxLengthMessage(1000, Messages.course.question)),
    }),
    onSubmit: async values => {
      await courseQuestionsService.create({ ...values, courseId });

      refetch();

      resetForm();
    },
  });
  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            multiline
            minRows={2}
            required
            fullWidth
            label={setMessage(Messages.course.question)}
            placeholder="Nhập thắc mắc của bạn"
            {...getFieldProps('content')}
            error={Boolean(touched.content && errors.content)}
            helperText={touched.content && errors.content}
          />
          <Box sx={{ textAlign: 'right' }}>
            <SendButton size="medium" loading={isSubmitting} />
          </Box>
        </Stack>
      </form>
    </>
  );
};

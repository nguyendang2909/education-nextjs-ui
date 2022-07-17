import { Box, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { FC } from 'react';
import { CreateCourseAnswerParams } from '../../../types/form-params.type';
import * as Yup from 'yup';
import {
  Messages,
  setMessage,
  setRequiredMaxLengthMessage,
  setRequiredMessage,
} from '../../../lib/messages';
import { courseAnswersService } from '../../../lib/course-answers.service';
import { SendButton } from '../../../components/Button/ActionButton';

type AnswerBoxProps = {
  courseQuestionId: number;
  refetch: () => void;
};

export const AnswerBox: FC<AnswerBoxProps> = ({
  courseQuestionId,
  refetch,
}) => {
  const {
    touched,
    getFieldProps,
    errors,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik<CreateCourseAnswerParams>({
    initialValues: {
      content: '',
    },
    validationSchema: Yup.object().shape({
      content: Yup.string()
        .required(setRequiredMessage(Messages.common.content))
        .max(1000, setRequiredMaxLengthMessage(1000, Messages.course.content)),
    }),
    onSubmit: async values => {
      await courseAnswersService.create({ ...values, courseQuestionId });

      refetch();

      resetForm();
    },
  });
  return (
    <Box sx={{ paddingLeft: '56px' }}>
      <form noValidate onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            multiline
            minRows={2}
            required
            fullWidth
            label={setMessage(Messages.course.answer)}
            placeholder="Nhập thắc mắc của bạn"
            {...getFieldProps('content')}
            error={Boolean(touched.content && errors.content)}
            helperText={touched.content && errors.content}
            autoFocus
          />
          <Box sx={{ textAlign: 'right' }}>
            <SendButton size="medium" loading={isSubmitting} />
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

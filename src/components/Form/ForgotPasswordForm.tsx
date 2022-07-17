import React, { FC } from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, TextField, Collapse, Alert, AlertColor } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  Messages,
  setMessage,
  setRequiredMessage,
  setRequiredValidMessage,
} from '../../lib/messages';
import { ForgotPasswordParams } from '../../types/form-params.type';
import { authService } from '../../lib/auth.service';

type LoginFormProps = {
  redirect?: string;
};

export const ForgotPasswordForm: FC<LoginFormProps> = ({ redirect }) => {
  const [formMessage, setFormMessage] = useState<{
    type?: AlertColor;
    content?: string;
  }>({});

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required(setRequiredMessage(Messages.user.username))
      .email(setRequiredValidMessage(Messages.user.email)),
  });

  const formik = useFormik<ForgotPasswordParams>({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async values => {
      try {
        const data = await authService.forgotPassword(values);

        setFormMessage({
          type: 'success',
          content: `Chúng tôi sẽ gửi thông tin lấy lại mật khẩu mới vào email: ${data?.email} trong 1-2 phút tới. Bạn vui lòng mở email (hộp thư đến, thư rác, thư spam) và làm theo hướng dẫn!'`,
        });

        formik.resetForm();

        // const data = await requestAPI.get<UserData>('/users/current');

        // if (data) {
        //   dispatch(setCurrentUser(data));

        //   router.replace(redirect || '/');
        // }
      } catch (err) {
        if (err instanceof Error) {
          setFormMessage({ type: 'error', content: err.message });
        }
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          autoComplete="username"
          label={setMessage(Messages.user.email)}
          placeholder="mail@example.com"
          type="username"
          {...getFieldProps('email')}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />

        <Stack spacing={3}>
          <Collapse in={!!formMessage.type}>
            <Alert
              severity={formMessage.type}
              sx={{ justifyContent: 'center' }}
            >
              {setMessage(formMessage.content)}
            </Alert>
          </Collapse>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Gửi mật khẩu cho tôi
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

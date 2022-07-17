import React, { FC } from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  Messages,
  setRequiredMaxLengthMessage,
  setRequiredMessage,
  setRequiredMinLengthMessage,
  setMessage,
  setRequiredValidMessage,
} from '../../lib/messages';
import { useDispatch } from 'react-redux';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { requestAPI } from '../../lib/request';
import { setCurrentUser } from '../../store/reducers/user.reducer';
import { UserData } from '../../types/fetch-data.type';
import { RegisterParams } from '../../types/form-params.type';
import { useRouter } from 'next/router';
import { CollapseErrorAlert } from '../Alert/ErrorAlert';

type RegisterFormProps = {
  redirect?: string;
};

export const RegisterForm: FC<RegisterFormProps> = ({ redirect }) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState<any>('');

  const RegisterSchema = Yup.object().shape({
    fullname: Yup.string()
      .required(setRequiredMessage(Messages.user.fullname))
      .min(2, setRequiredMinLengthMessage(2, Messages.user.fullname))
      .max(200, setRequiredMaxLengthMessage(200, Messages.user.fullname)),
    phoneNumber: Yup.string()
      .min(9, setRequiredValidMessage(Messages.user.phoneNumber))
      .max(13, setRequiredValidMessage(Messages.user.phoneNumber))
      .notRequired(),
    email: Yup.string()
      .email(setRequiredValidMessage(Messages.user.email))
      .nullable()
      .notRequired(),
    password: Yup.string()
      .min(8, setRequiredMinLengthMessage(8, Messages.user.password))
      .max(100, setRequiredMaxLengthMessage(100, Messages.user.password))
      .required(setRequiredMessage(Messages.user.password)),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], setMessage('Mật khẩu không khớp'))
      .required(setRequiredMessage(Messages.user.password)),
  });

  const formik = useFormik<RegisterParams>({
    initialValues: {
      fullname: '',
      email: '',
      phoneNumber: '',
      password: '',
      rePassword: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values: RegisterParams) => {
      try {
        const { email, phoneNumber, password, fullname } = values;

        const params: Partial<RegisterParams> & { password: string } = {
          password,
        };

        if (email) {
          params.email = email;
        }

        if (phoneNumber) {
          params.phoneNumber = phoneNumber;
        }

        if (fullname) {
          params.fullname = fullname;
        }

        const data = await requestAPI.post<UserData>('/auth/register', params);

        if (data) {
          dispatch(setCurrentUser(data));

          router.replace(redirect || '/');
        }
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            required
            fullWidth
            label={setMessage(Messages.user.fullname)}
            {...getFieldProps('fullname')}
            error={Boolean(touched.fullname && errors.fullname)}
            helperText={touched.fullname && errors.fullname}
          />

          <TextField
            // required
            // autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            // required
            // autoComplete="phoneNumber"
            label="Số điện thoại"
            {...getFieldProps('phoneNumber')}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
          />

          <TextField
            required
            fullWidth
            // autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            required
            fullWidth
            // autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Nhập lại mật khẩu"
            {...getFieldProps('rePassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.rePassword && errors.rePassword)}
            helperText={touched.rePassword && errors.rePassword}
          />
        </Stack>
        <Stack spacing={3}>
          <CollapseErrorAlert message={errorMessage} />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {setMessage(Messages.action.register)}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

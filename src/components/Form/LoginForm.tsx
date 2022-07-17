import React, { FC } from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {
  Messages,
  setMessage,
  setRequiredMaxLengthMessage,
  setRequiredMessage,
  setRequiredMinLengthMessage,
  setRequiredValidMessage,
} from '../../lib/messages';
import { LoginParams } from '../../types/form-params.type';
import { useDispatch } from 'react-redux';
import { requestAPI } from '../../lib/request';
import { UserData } from '../../types/fetch-data.type';
import { setCurrentUser } from '../../store/reducers/user.reducer';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { CollapseErrorAlert } from '../Alert/ErrorAlert';

type LoginFormProps = {
  redirect?: string;
};

export const LoginForm: FC<LoginFormProps> = ({ redirect }) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required(setRequiredMessage(Messages.user.username))
      .email(setRequiredValidMessage(Messages.user.email)),
    password: Yup.string()
      .min(8, setRequiredMinLengthMessage(8, Messages.user.password))
      .max(100, setRequiredMaxLengthMessage(100, Messages.user.password))
      .required(setRequiredMessage(Messages.user.password)),
  });

  const formik = useFormik<LoginParams>({
    initialValues: {
      username: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values: LoginParams) => {
      try {
        await requestAPI.post('/auth/login', values);

        const data = await requestAPI.get<UserData>('/users/current');

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

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword(show => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            required
            fullWidth
            autoComplete="username"
            type="username"
            label={setMessage(Messages.user.email)}
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            required
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label={setMessage(Messages.user.password)}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps('remember')}
                checked={values.remember}
              />
            }
            label={setMessage(Messages.action.remember)}
          />

          <NextLink href="/forgot-password" passHref>
            <Link variant="subtitle2">
              {setMessage(
                `${Messages.action.forgot} ${Messages.user.password}`,
              )}
            </Link>
          </NextLink>
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
            {setMessage(Messages.action.login)}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

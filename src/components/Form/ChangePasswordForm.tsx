import React, { FC, useEffect } from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Collapse,
  Alert,
  AlertColor,
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
} from '../../lib/messages';
import { ChangeLostPasswordParams } from '../../types/form-params.type';
import { useDispatch } from 'react-redux';
import { fetchCurrentUserThunk } from '../../store/reducers/user.reducer';
import { useRouter } from 'next/router';
import { authService } from '../../lib/auth.service';
import { urlQueryService } from '../../lib/url-query.service';
import { APP_URL } from '../../config';

export const ChangePasswordForm: FC = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const queryOptions = { query: router.query };

  const authJwt = urlQueryService.getOne('auth', queryOptions);

  const redirect = urlQueryService.getOne('redirect', queryOptions);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formMessage, setFormMessage] = useState<{
    type?: AlertColor;
    content?: string;
  }>({});

  useEffect(() => {
    if (router.isReady) {
      if (!authJwt) {
        router.replace(APP_URL.login);
      }
    }
  }, [router.isReady, authJwt, router]);

  const formik = useFormik<ChangeLostPasswordParams>({
    initialValues: {
      password: '',
      retypePassword: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(8, setRequiredMinLengthMessage(8, Messages.user.password))
        .max(100, setRequiredMaxLengthMessage(100, Messages.user.password))
        .required(setRequiredMessage(Messages.user.password)),
      retypePassword: Yup.string()
        .oneOf(
          [Yup.ref('password'), null],
          setMessage(Messages.user.retypePasswordRequireMatch),
        )
        .required(setRequiredMessage(Messages.user.password)),
    }),
    onSubmit: async values => {
      try {
        // await requestAPI.post('/auth/login', values);

        if (authJwt) {
          await authService.changeForgotPassword({
            password: values.password,
            authJwt,
          });

          dispatch(fetchCurrentUserThunk());

          router.replace(redirect || '/');
        }
      } catch (err) {
        if (err instanceof Error) {
          setFormMessage({ type: 'error', content: err.message });
        }
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword(show => !show);
  };

  if (!authJwt) {
    return <></>;
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
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

          <TextField
            required
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label={setMessage(Messages.user.retypePassword)}
            {...getFieldProps('retypePassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.retypePassword && errors.retypePassword)}
            helperText={touched.retypePassword && errors.retypePassword}
          />
        </Stack>

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
            {setMessage(Messages.action.change, Messages.user.password)}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

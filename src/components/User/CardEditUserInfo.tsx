import { useFormik } from 'formik';
import { ChangeEvent, FC, useEffect } from 'react';
import { UpdateUserParams } from '../../types/form-params.type';
import * as Yup from 'yup';
import {
  Messages,
  setMessage,
  setRequiredMaxLengthMessage,
  setRequiredMessage,
  setRequiredMinLengthMessage,
} from '../../lib/messages';
import { useAppSelector } from '../../store/hooks';
import { EGender } from '../../types/enums';
import { format, parse } from 'date-fns';
import { usersService } from '../../lib/users.service';
import { UpdateUserDto } from '../../types/request.dto';
import { fetchCurrentUserThunk } from '../../store/reducers/user.reducer';
import { useDispatch } from 'react-redux';
import { notificationService } from '../../lib/notificationService';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  MenuItem,
  Stack,
  styled,
  TextField,
} from '@mui/material';
import { CancelButton, UpdateButton } from '../Button/ActionButton';
import { Formatter } from '../../lib/formatter';
import { requestService } from '../../lib/request';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import _ from 'lodash';

const UpdateAvatar = styled(Avatar)(({ theme }) => ({
  height: '168px',
  width: '168px',
  margin: '0 auto',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

type CardEditUserInfoProps = {
  address?: boolean;
  avatar?: boolean;
  birthday?: boolean;
  description?: boolean;
  experience?: boolean;
  fullname?: boolean;
  gender?: boolean;
  onFinish?: () => void;
  onCancel?: () => void;
  password?: boolean;
  title?: boolean;
};

export const CardEditUserInfo: FC<CardEditUserInfoProps> = ({
  onFinish,
  onCancel,
  fullname,
  gender,
  birthday,
  address,
  title,
  experience,
  description,
  password,
  avatar,
}) => {
  const dispatch = useDispatch();

  const user = useAppSelector(state => state.user?.info);

  const initialValues: UpdateUserParams = {};

  const objectSchema: Record<string, any> = {};

  if (fullname) {
    initialValues.fullname = user?.fullname || '';

    objectSchema.fullname = Yup.string()
      .required(setRequiredMessage(Messages.user.fullname))
      .min(2, setRequiredMinLengthMessage(2, Messages.user.fullname))
      .max(100, setRequiredMaxLengthMessage(100, Messages.user.fullname));
  }

  if (gender) {
    initialValues.gender = user?.gender || EGender.unknown;

    objectSchema.gender = Yup.string().required(
      setRequiredMessage(Messages.user.gender),
    );
  }

  if (address) {
    initialValues.address = user?.address || '';

    objectSchema.address = Yup.string()
      .required(setRequiredMessage(Messages.user.address))
      .max(100, setRequiredMaxLengthMessage(500, Messages.user.address));
  }

  if (birthday) {
    initialValues.birthday = user?.birthday
      ? parse(user?.birthday, 'yyyy-MM-dd', new Date())
      : undefined;

    objectSchema.birthday = Yup.date().required(
      setRequiredMessage(Messages.user.birthday),
    );
  }

  if (title) {
    initialValues.title = user?.title || '';

    objectSchema.title = Yup.string()
      .required(setRequiredMessage(Messages.user.title))
      .max(100, setRequiredMaxLengthMessage(100, Messages.user.title));
  }

  if (experience) {
    initialValues.experience = user?.experience || '';

    objectSchema.experience = Yup.string()
      .required(setRequiredMessage(Messages.user.experience))
      .max(100, setRequiredMaxLengthMessage(100, Messages.user.experience));
  }

  if (description) {
    initialValues.description = user?.description || '';

    objectSchema.description = Yup.string()
      .required(setRequiredMessage(Messages.user.description))
      .max(500, setRequiredMaxLengthMessage(1000, Messages.user.description));
  }

  if (password) {
    initialValues.password = '';

    initialValues.retypePassword = '';

    initialValues.oldPassword = '';

    objectSchema.oldPassword = Yup.string()
      .min(8, setRequiredMinLengthMessage(8, Messages.user.password))
      .max(100, setRequiredMaxLengthMessage(100, Messages.user.password))
      .required(setRequiredMessage(Messages.user.password));

    objectSchema.password = Yup.string()
      .min(8, setRequiredMinLengthMessage(8, Messages.user.password))
      .max(100, setRequiredMaxLengthMessage(100, Messages.user.password))
      .required(setRequiredMessage(Messages.user.password));

    objectSchema.retypePassword = Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        setMessage(Messages.user.retypePasswordRequireMatch),
      )
      .required(setRequiredMessage(Messages.user.password));
  }

  const updateUserSchema = Yup.object().shape(objectSchema);

  const {
    getFieldProps,
    isSubmitting,
    handleSubmit,
    touched,
    errors,
    values,
    setFieldValue,
  } = useFormik<UpdateUserParams>({
    initialValues,
    validationSchema: updateUserSchema,
    onSubmit: async (values: UpdateUserParams) => {
      try {
        const { birthday, avatar, retypePassword, ...updateParams } = values;

        if (avatar) {
          await usersService.updateAvatar(avatar);
        }

        const updateOptions: UpdateUserDto = { ...updateParams };

        if (birthday) {
          updateOptions.birthday = format(birthday, 'yyyy-MM-dd');
        }

        if (!_.isEmpty(updateOptions)) {
          await usersService.update(updateOptions);
        }

        dispatch(fetchCurrentUserThunk());

        onFinish && onFinish();
      } catch (err) {
        if (err instanceof Error) {
          notificationService.handleError(err);
        }
      }
    },
  });

  useEffect(() => {
    dispatch(fetchCurrentUserThunk());
  }, [dispatch]);

  const handleChangeUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.currentTarget?.files
      ? event?.currentTarget?.files[0]
      : undefined;

    setFieldValue('avatar', file);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <Card variant="outlined">
          <CardHeader
            title={setMessage(
              Messages.action.update,
              Messages.common.information,
              Messages.user.personal,
            )}
          ></CardHeader>
          <CardContent>
            <Stack spacing={3}>
              {fullname && (
                <TextField
                  required
                  fullWidth
                  label={setMessage(Messages.user.fullname)}
                  {...getFieldProps('fullname')}
                  error={Boolean(touched.fullname && errors.fullname)}
                  helperText={touched.fullname && errors.fullname}
                />
              )}

              {avatar && (
                <Box component="label">
                  <UpdateAvatar
                    alt="avatar"
                    src={
                      values.avatar
                        ? `${URL.createObjectURL(values.avatar)}`
                        : user?.avatarURL &&
                          requestService.getURL(user?.avatarURL)
                    }
                  >
                    {user?.fullname && user?.fullname[0]}
                  </UpdateAvatar>
                  <input
                    type="file"
                    accept="image/*"
                    name="file"
                    id="file"
                    hidden
                    onChange={handleChangeUploadFile}
                  />
                </Box>
              )}

              {gender && (
                <TextField
                  required
                  select
                  fullWidth
                  label={setMessage(Messages.user.gender)}
                  {...getFieldProps('gender')}
                  error={Boolean(touched.gender && errors.gender)}
                  helperText={touched.gender && errors.gender}
                >
                  <MenuItem value={EGender.male}>
                    {setMessage(Formatter.formatGender(EGender.male))}
                  </MenuItem>
                  <MenuItem value={EGender.female}>
                    {setMessage(Formatter.formatGender(EGender.female))}
                  </MenuItem>
                  <MenuItem value={EGender.unknown}>
                    {setMessage(Formatter.formatGender(EGender.unknown))}
                  </MenuItem>
                </TextField>
              )}

              {birthday && (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label={setMessage(Messages.user.birthday)}
                    inputFormat="dd/MM/yyyy"
                    value={values.birthday}
                    onChange={(newValue: Date | null) => {
                      setFieldValue('birthday', newValue);
                    }}
                    renderInput={params => (
                      <TextField
                        error={Boolean(touched.birthday && errors.birthday)}
                        helperText={touched.birthday && errors.birthday}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}

              {address && (
                <TextField
                  required
                  fullWidth
                  label={setMessage(Messages.user.address)}
                  {...getFieldProps('address')}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />
              )}

              {password && (
                <>
                  <TextField
                    required
                    fullWidth
                    label={setMessage(Messages.user.oldPassword)}
                    {...getFieldProps('oldPassword')}
                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                    helperText={touched.oldPassword && errors.oldPassword}
                  />
                  <TextField
                    required
                    fullWidth
                    label={setMessage(Messages.user.password)}
                    {...getFieldProps('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <TextField
                    required
                    fullWidth
                    label={setMessage(Messages.user.retypePassword)}
                    {...getFieldProps('retypePassword')}
                    error={Boolean(
                      touched.retypePassword && errors.retypePassword,
                    )}
                    helperText={touched.retypePassword && errors.retypePassword}
                  />
                </>
              )}

              {title && (
                <TextField
                  required
                  fullWidth
                  label={setMessage(Messages.user.title)}
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
              )}

              {experience && (
                <TextField
                  required
                  fullWidth
                  label={setMessage(Messages.user.experience)}
                  {...getFieldProps('experience')}
                  error={Boolean(touched.experience && errors.experience)}
                  helperText={touched.experience && errors.experience}
                />
              )}

              {description && (
                <TextField
                  required
                  fullWidth
                  multiline
                  minRows={8}
                  maxRows={8}
                  label={setMessage(Messages.user.description)}
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              )}
            </Stack>

            <CardActions sx={{ justifyContent: 'right', mt: 4 }}>
              {onCancel && <CancelButton onClick={onCancel}></CancelButton>}
              <UpdateButton loading={isSubmitting}></UpdateButton>
            </CardActions>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

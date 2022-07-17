import { Stack, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormik } from 'formik';
import { FC } from 'react';
import {
  Messages,
  setMessage,
  setRequiredMessage,
} from '../../../lib/messages';
import * as Yup from 'yup';
import { SearchButton } from '../../../components/Button/ActionButton';
import { useRouter } from 'next/router';
import { urlQueryService } from '../../../lib/url-query.service';
import { endOfMonth, format, parse, startOfMonth } from 'date-fns';
import { DesktopDatePicker } from '@mui/x-date-pickers';

type TransactionHistoryFormProps = {
  // isFetching: boolean;
};

export const TransactionHistoryForm: FC = () => {
  const router = useRouter();

  const routerOptions = { router };

  const queryOptions = { query: router.query };

  const startDate =
    urlQueryService.getOne('startDate', queryOptions) ||
    format(startOfMonth(new Date()), 'dd/MM/yyyy');

  const endDate =
    urlQueryService.getOne('endDate', queryOptions) ||
    format(endOfMonth(new Date()), 'dd/MM/yyyy');

  const submitTime = urlQueryService.getOneAsNumber('submitTime', queryOptions);

  const formik = useFormik({
    initialValues: {
      startDate: parse(startDate, 'dd/MM/yyyy', new Date()),
      endDate: parse(endDate, 'dd/MM/yyyy', new Date()),
    },
    validationSchema: Yup.object().shape({
      startDate: Yup.date().required(setRequiredMessage(Messages.common.date)),
      endDate: Yup.date().required(setRequiredMessage(Messages.common.date)),
    }),
    onSubmit: values => {
      urlQueryService.replaceUrlQuery(
        {
          startDate: format(values.startDate, 'yyyy-MM-dd'),
          endDate: format(values.endDate, 'yyyy-MM-dd'),
          submitTime: submitTime ? submitTime + 1 : 1,
        },
        routerOptions,
      );
    },
  });

  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack direction="row" spacing={3}>
          <DesktopDatePicker
            label={setMessage(Messages.common.startDate)}
            inputFormat="dd/MM/yyyy"
            value={formik.values.startDate}
            onChange={(newValue: Date | null) => {
              formik.setFieldValue('startDate', newValue);
            }}
            renderInput={params => (
              <TextField
                error={Boolean(
                  formik.touched.startDate && formik.errors.startDate,
                )}
                helperText={formik.touched.startDate && formik.errors.startDate}
                {...params}
              />
            )}
          />
          <DesktopDatePicker
            label={setMessage(Messages.common.endDate)}
            inputFormat="dd/MM/yyyy"
            value={formik.values.endDate}
            onChange={(newValue: Date | null) => {
              formik.setFieldValue('endDate', newValue);
            }}
            renderInput={params => (
              <TextField
                error={Boolean(formik.touched.endDate && formik.errors.endDate)}
                helperText={formik.touched.endDate && formik.errors.endDate}
                {...params}
              />
            )}
          />
          <SearchButton />
        </Stack>
      </form>
    </>
  );
};

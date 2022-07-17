import { Button, Grid, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { ChangeEvent, EventHandler, FC, FormEvent, useState } from 'react';
import {
  AccpetButton,
  SearchButton,
} from '../../components/Button/ActionButton';
import { Messages, setMessage } from '../../lib/messages';
import { urlQueryService } from '../../lib/url-query.service';

type AdminOrderSearchFieldsProps = {
  isSubmitting: boolean;
};

export const AdminOrderSearchFields: FC<AdminOrderSearchFieldsProps> = () => {
  const router = useRouter();

  const [searchOrderId, setSearchOrderId] = useState<string>('');

  const handleChangeSearchOrderId = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchOrderId(event.target.value);
  };

  const handleSubmit = (evt: FormEvent<Element>) => {
    evt.preventDefault();

    urlQueryService.setUrlQuery({ id: searchOrderId }, { router });
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack spacing={3} alignItems="center" direction="row">
        <Grid item>
          <TextField
            label={setMessage(Messages.cart.orderId)}
            value={searchOrderId}
            onChange={handleChangeSearchOrderId}
          />
        </Grid>
        <Grid item>
          <SearchButton>{Messages.action.search}</SearchButton>
        </Grid>
      </Stack>
    </form>
  );
};

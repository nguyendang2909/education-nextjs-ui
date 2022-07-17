import { Grid, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, FormEvent, useEffect, useState } from 'react';
import { SearchButton } from '../../components/Button/ActionButton';
import { Messages, setMessage } from '../../lib/messages';
import { urlQueryService } from '../../lib/url-query.service';

type AdminUserSearchFieldsProps = {};

export const AdminUserSearchFields: FC<AdminUserSearchFieldsProps> = () => {
  const router = useRouter();

  const [searchEmail, setSearchEmail] = useState<string>();

  const [searchFullname, setSearchFullname] = useState<string>();

  const [searchPhoneNumber, setSearchPhoneNumber] = useState<string>();

  const handleSubmit = (evt: FormEvent<Element>) => {
    evt.preventDefault();

    urlQueryService.setUrlQuery(
      {
        email: searchEmail,
        fullname: searchFullname,
        phoneNumber: searchPhoneNumber,
      },
      { router },
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container sx={{ alignItems: 'center' }} spacing={2}>
        <Grid item>
          <TextField
            label={setMessage(Messages.user.email)}
            onChange={e => setSearchEmail(e.target.value)}
          />
        </Grid>

        <Grid item>
          <TextField
            label={setMessage(Messages.user.fullname)}
            onChange={e => setSearchFullname(e.target.value)}
          />
        </Grid>

        <Grid item>
          <TextField
            label={setMessage(Messages.user.phoneNumber)}
            onChange={e => setSearchPhoneNumber(e.target.value)}
          />
        </Grid>
        <Grid item>
          <SearchButton />
        </Grid>
      </Grid>
    </form>
  );
};

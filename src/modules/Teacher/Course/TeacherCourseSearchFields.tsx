import { Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, FormEvent, useState } from 'react';
import { SearchButton } from '../../../components/Button/ActionButton';
import { Messages, setMessage } from '../../../lib/messages';
import { urlQueryService } from '../../../lib/url-query.service';

type TeacherCourseSearchFieldsProps = {};

export const TeacherCourseSearchFields: FC<
  TeacherCourseSearchFieldsProps
> = () => {
  const router = useRouter();

  const [searchName, setSearchName] = useState<string>();

  const handleSubmit = (evt: FormEvent<Element>) => {
    evt.preventDefault();

    urlQueryService.setUrlQuery(
      {
        name: searchName,
      },
      { router },
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container sx={{ alignItems: 'center' }} spacing={2}>
        <Grid item>
          <TextField
            label={setMessage(Messages.course.name)}
            onChange={e => setSearchName(e.target.value)}
          />
        </Grid>

        <Grid item>
          <SearchButton />
        </Grid>
      </Grid>
    </form>
  );
};

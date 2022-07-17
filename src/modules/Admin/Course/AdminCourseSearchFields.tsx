import { Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, FormEvent, useState } from 'react';
import { SearchButton } from '../../../components/Button/ActionButton';
import { Messages, setMessage } from '../../../lib/messages';
import { urlQueryService } from '../../../lib/url-query.service';

type AdminCourseSearchFieldsProps = {};

export const AdminCourseSearchFields: FC<AdminCourseSearchFieldsProps> = () => {
  const router = useRouter();

  const [searchName, setSearchName] = useState<string>();

  const [searchCourseCategoryId, setSearchCourseCategoryId] =
    useState<string>();

  const [searchCourseSubcategoryId, setSearchCourseSubcategoryId] =
    useState<string>();

  const handleSubmit = (evt: FormEvent<Element>) => {
    evt.preventDefault();

    urlQueryService.setUrlQuery(
      {
        name: searchName,
        courseCategoryId: searchCourseCategoryId,
        courseSubcategoryId: searchCourseSubcategoryId,
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

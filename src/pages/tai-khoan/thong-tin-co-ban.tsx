import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../../types/components.type';
import _ from 'lodash';
import { APP_URL } from '../../config';
import { ContainerSpacing } from '../../components/Container';
import { PrivateMainLayout } from '../../Layout/PrivateMainLayout';
import { CardEditUserInfo } from '../../components/User/CardEditUserInfo';
import { pickBy } from 'lodash';
import { Grid } from '@mui/material';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const {
    fullname,
    birthday,
    title,
    experience,
    description,
    gender,
    address,
    avatar,
    password,
  } = router.query;

  const redirect = _.isArray(router.query.redirect)
    ? router.query.redirect[0]
    : router.query.redirect;

  const handleFinish = () => {
    router.replace(redirect || APP_URL.user.management);
  };

  return (
    <>
      <ContainerSpacing maxWidth="sm">
        <Grid>
          <CardEditUserInfo
            onFinish={handleFinish}
            onCancel={handleFinish}
            {...pickBy({
              fullname,
              birthday,
              title,
              experience,
              description,
              gender,
              address,
              avatar,
              password,
            })}
          />
        </Grid>
      </ContainerSpacing>
    </>
  );
};

Page.layout = PrivateMainLayout;

export default Page;

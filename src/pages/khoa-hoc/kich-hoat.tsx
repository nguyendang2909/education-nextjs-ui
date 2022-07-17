import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumbs, Button, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import { BoxCenter, BoxSpacing } from '../../components/Box';
import { Breadcrumb, BreadcrumbHome } from '../../components/Breadcrumbs';
import { ContainerSpacing } from '../../components/Container';
import { TypographyCenter } from '../../components/Text/Typography';
import { PrivateMainLayout } from '../../Layout/PrivateMainLayout';
import { Messages, messagesService, setMessage } from '../../lib/messages';
import { NextPageWithLayout } from '../../types/components.type';

const Page: NextPageWithLayout = () => {
  const pageTitle = 'kích hoạt khoá học';

  // const [activeCourseMessage, setActiveCourseMessage] =

  // const formik = useFormik<CourseUnlockParams>({
  //   initialValues: {
  //     unlockCode: '',
  //   },
  //   // validationSchema: Yup.object().shape({
  //   //   username: Yup.string().required(setRequiredMessage(Messages.user.username)),
  //   //   password: Yup.string()
  //   //     .min(8, setRequiredMinLengthMessage(8, Messages.user.password))
  //   //     .max(100, setRequiredMaxLengthMessage(100, Messages.user.password))
  //   //     .required(setRequiredMessage(Messages.user.password)),
  //   // },
  //   onSubmit: async values => {
  //     try {
  //       await coursesService.unlock(values);
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         // setErrorMessage(err.message);
  //       }
  //     }
  //   },
  // });

  return (
    <>
      <Head>
        <title>{messagesService.setPageTitle(pageTitle)}</title>
      </Head>

      <ContainerSpacing>
        <Breadcrumbs>
          <BreadcrumbHome />
          <Breadcrumb title={pageTitle} icon={faUnlock} />
        </Breadcrumbs>
        <Typography variant="h1">{setMessage(pageTitle)}</Typography>
      </ContainerSpacing>
      <ContainerSpacing>
        <form>
          <BoxCenter>
            <BoxSpacing>
              <TypographyCenter>
                Lưu ý: Mỗi khoá học chỉ cần kích hoạt 1 lần duy nhất.
              </TypographyCenter>
            </BoxSpacing>
            <BoxSpacing>
              <TextField
                required
                type="course-active-code"
                label={setMessage(Messages.common.activeCode)}
                sx={{ minWidth: '300px' }}
              ></TextField>
            </BoxSpacing>
            <BoxSpacing>
              <Button></Button>
            </BoxSpacing>
          </BoxCenter>
        </form>
      </ContainerSpacing>
    </>
  );
};

Page.layout = PrivateMainLayout;

export default Page;

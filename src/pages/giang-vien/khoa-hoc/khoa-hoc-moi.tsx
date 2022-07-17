import { CreateCourseForm } from '../../../modules/Course/Create/CreateCourseForm';
import { TeacherLayout } from '../../../Layout/TeacherLayout';
import { Messages } from '../../../lib/messages';
import { NextPageWithLayout } from '../../../types/components.type';
import { AppPage } from '../../../components/Page/AppPage';
import { ContainerSpacing } from '../../../components/Container';

const Page: NextPageWithLayout = () => {
  const pageTitle = `${Messages.action.create} ${Messages.course.name}`;

  return (
    <AppPage title={pageTitle} header={{}}>
      <ContainerSpacing maxWidth="sm">
        <CreateCourseForm />
      </ContainerSpacing>
    </AppPage>
  );
};

Page.layout = TeacherLayout;

export default Page;

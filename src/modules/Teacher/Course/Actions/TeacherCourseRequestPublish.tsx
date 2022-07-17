import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
} from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { appShortTitle, Messages } from '../../../../lib/messages';
import { notificationService } from '../../../../lib/notificationService';
import { teacherCoursesService } from '../../../../lib/teacher-courses.service';
import { ECoursePublish } from '../../../../types/enums';
import { CourseData } from '../../../../types/fetch-data.type';

type TeacherCourseRequestPublishProps = {
  course: CourseData;
  refetch: () => void;
};

export const TeacherCourseRequestPublish: FC<
  TeacherCourseRequestPublishProps
> = ({ course, refetch }) => {
  const [displayRequestPublishDialog, setDisplayRequestPublishDialog] =
    useState<boolean>(false);

  const [isRequestPublishDialogLoading, setRequestPublishDialogLoading] =
    useState<boolean>(false);

  const handleOpenRequestPublishDialog = () => {
    setDisplayRequestPublishDialog(true);
  };

  const handleCloseRequestPublishDialog = () => {
    setDisplayRequestPublishDialog(false);
  };

  const handleRequestPublish = async () => {
    if (course.id) {
      try {
        setRequestPublishDialogLoading(true);

        await teacherCoursesService.update(course.id, {
          publish: ECoursePublish.Pending,
        });

        refetch();
      } catch (err) {
        notificationService.handleError(err);
      } finally {
        setRequestPublishDialogLoading(false);

        handleCloseRequestPublishDialog();
      }
    }
  };

  const text = () => {
    switch (course.publish) {
      case ECoursePublish.Published:
        return <>Khoá học đã được đăng bán trên {appShortTitle}</>;

      case ECoursePublish.Pending:
        return (
          <>
            Bạn đã yêu cầu đăng tải khoá học lên {appShortTitle}, vui lòng đợi
            quản trị viên xét duyệt nhé.
          </>
        );

      default:
        return (
          <>
            Đừng quên{' '}
            <Link
              onClick={handleOpenRequestPublishDialog}
              sx={{ cursor: 'pointer' }}
            >
              {' '}
              đăng ký bán khoá học này
            </Link>{' '}
            với {appShortTitle} bạn nhé
          </>
        );
    }
  };

  return (
    <>
      {text()}

      <Dialog
        open={displayRequestPublishDialog}
        onClose={handleCloseRequestPublishDialog}
      >
        <DialogTitle>Đăng ký bán khoá học</DialogTitle>

        <Divider />

        <DialogContent>
          Nếu bạn hoàn thành khoá học, hãy nhấn đăng ký để yêu cầu{' '}
          {appShortTitle} đăng tải khoá học của bạn lên nhé.
        </DialogContent>

        <DialogActions>
          <Button size="large" onClick={handleCloseRequestPublishDialog}>
            {Messages.action.cancel}
          </Button>
          <LoadingButton
            size="large"
            onClick={handleRequestPublish}
            variant="contained"
            loading={isRequestPublishDialogLoading}
          >
            {Messages.action.register}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

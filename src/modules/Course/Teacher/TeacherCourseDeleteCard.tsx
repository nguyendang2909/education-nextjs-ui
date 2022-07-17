import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteButton } from '../../../components/Button/ActionButton';
import { DeleteDialog } from '../../../components/Dialog/DeleteDialog';
import { APP_URL } from '../../../config';
import { Messages, setMessage, setSuccessMessage } from '../../../lib/messages';
import { teacherCoursesService } from '../../../lib/teacher-courses.service';
import { CourseData } from '../../../types/fetch-data.type';

type TeacherCourseDeleteCardProps = {
  course: CourseData;
};

export const TeacherCourseDeleteCard: FC<TeacherCourseDeleteCardProps> = ({
  course,
}) => {
  const router = useRouter();

  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);

  const handleDeleteCourse = async () => {
    try {
      if (!course.id) {
        return;
      }

      await teacherCoursesService.delete(course.id);

      toast.success(
        setSuccessMessage(Messages.action.delete, Messages.course.name),
      );

      router.replace(APP_URL.teacher.courses);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const openDeleteDialog = () => {
    setDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

  return (
    <>
      <Card>
        <CardHeader
          title={`${setMessage(
            Messages.action.delete,
            Messages.course.name,
            course.name || '',
          )} `}
        />
        <CardContent>
          <Typography>
            Hành động này sẽ xóa {Messages.course.name}{' '}
            {setMessage(course.name)} và mọi thứ trong khoá học này.
          </Typography>
          <CardActions>
            <DeleteButton onClick={openDeleteDialog} />
          </CardActions>
        </CardContent>
      </Card>

      <DeleteDialog
        name={`${Messages.course.name} ${setMessage(course.name)}`}
        open={showDeleteDialog}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteCourse}
      />
    </>
  );
};

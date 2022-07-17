import { faBookMedical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider, List, Stack, Typography } from '@mui/material';

import { FC, Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { Messages, setMessage, setSuccessMessage } from '../../../lib/messages';

import { teacherCoursePartsService } from '../../../lib/teacher-courseparts.service';
import { CoursePartData, LessonData } from '../../../types/fetch-data.type';
import { DeleteDialog } from '../../../components/Dialog/DeleteDialog';
import { NotFoundContent } from '../../../components/NotFound';
import { CreateLessonDialog } from '../../Lesson/Create/CreateLessonDialog';
import { EditCoursePartDialog } from '../../Course/Edit/course-content/EditCoursePartDialog';
import { EditCoursePart } from './EditCoursePart';
import { CreateCoursePartDialog } from '../../Course/Edit/course-content/CreateCoursePartDialog';
import { teacherLessonsService } from '../../../lib/teacher-lessons.service';
import { BoxSpacing } from '../../../components/Box';

type EditCoursePartsProps = {
  courseId: number;
  selectedLessonId?: number;
  refetch: () => void;
  courseParts: CoursePartData[];
};

export const EditCourseParts: FC<EditCoursePartsProps> = ({
  courseId,
  selectedLessonId,
  refetch,
  courseParts = [],
}) => {
  const [deleteLesson, setDeleteLesson] = useState<LessonData>({});

  const [isOpenCreateCoursePart, setOpenCreateCoursePart] =
    useState<boolean>(false);

  const [editCoursePartId, setEditCoursePartId] = useState<number>();

  const [deleteCoursePart, setDeleteCoursePart] = useState<CoursePartData>({});

  const [coursePartIdToCreateLesson, setCoursePartIdToCreateLesson] = useState<
    number | undefined
  >();

  const handleOpenCreateLessonDialog = (coursePart: CoursePartData) => {
    setCoursePartIdToCreateLesson(coursePart.id);
  };

  const handleCloseEditCoursePart = async () => {
    setEditCoursePartId(undefined);
  };

  const handleCloseDeleteCoursePart = () => {
    setDeleteCoursePart({});
  };

  const handleDeleteCoursePart = async () => {
    try {
      deleteCoursePart.id &&
        (await teacherCoursePartsService.delete(deleteCoursePart.id));

      toast.success(
        setSuccessMessage(Messages.action.delete, Messages.course.part),
      );

      setDeleteCoursePart({});

      refetch();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const handleCloseCreateLessonDialog = () => {
    setCoursePartIdToCreateLesson(undefined);
  };

  const handleOpenCreateCoursePart = () => {
    setOpenCreateCoursePart(true);
  };

  const handleCloseCreateCoursePart = () => {
    setOpenCreateCoursePart(false);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" gutterBottom>
          {setMessage(Messages.common.content)}
        </Typography>
      </Stack>

      <List>
        <Divider />
        {courseParts.map((coursePart, index) => {
          return (
            <Fragment key={index}>
              <EditCoursePart
                coursePart={coursePart}
                onEdit={setEditCoursePartId}
                onDelete={setDeleteCoursePart}
                onCreate={handleOpenCreateLessonDialog}
                onFinish={refetch}
                selectedLessonId={selectedLessonId}
              ></EditCoursePart>
            </Fragment>
          );
        })}
      </List>

      <BoxSpacing>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FontAwesomeIcon icon={faBookMedical} />}
          onClick={handleOpenCreateCoursePart}
        >
          {setMessage(Messages.course.part, Messages.common.new)}
        </Button>
      </BoxSpacing>

      {editCoursePartId && (
        <EditCoursePartDialog
          id={editCoursePartId}
          open={!!editCoursePartId}
          onClose={handleCloseEditCoursePart}
          onFinish={refetch}
        />
      )}

      <DeleteDialog
        name={Messages.course.part}
        open={!!deleteCoursePart.id}
        onClose={handleCloseDeleteCoursePart}
        onDelete={handleDeleteCoursePart}
        onFinish={refetch}
      />

      {!!coursePartIdToCreateLesson && (
        <CreateLessonDialog
          coursePartId={coursePartIdToCreateLesson}
          open={!!coursePartIdToCreateLesson}
          onClose={handleCloseCreateLessonDialog}
          onFinish={refetch}
        />
      )}

      <CreateCoursePartDialog
        courseId={courseId}
        open={isOpenCreateCoursePart}
        onClose={handleCloseCreateCoursePart}
        onFinish={refetch}
      />
    </>
  );
};

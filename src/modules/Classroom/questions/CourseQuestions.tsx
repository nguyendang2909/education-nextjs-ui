import { FC, Fragment, useState } from 'react';
import { DeleteDialog } from '../../../components/Dialog/DeleteDialog';
import { courseAnswersService } from '../../../lib/course-answers.service';
import { courseQuestionsService } from '../../../lib/course-questions.service';
import { Messages } from '../../../lib/messages';
import { useAppSelector } from '../../../store/hooks';
import { CourseQuestionData } from '../../../types/fetch-data.type';
import { CourseQuestion } from './CourseQuestion';

type CourseQuestionsProps = {
  data: CourseQuestionData[];
  refetch: () => void;
};

export const CourseQuestions: FC<CourseQuestionsProps> = ({
  data: courseQuestions = [],
  refetch,
}) => {
  const currentUserId = useAppSelector(state => state.user?.info?.id);

  const [deleteAnswerId, setDeleteAnswerId] = useState<number>();

  const [deleteCourseQuestionId, setDeleteCourseQuestionId] =
    useState<number>();

  const handleCloseDeleteAnswer = () => {
    setDeleteAnswerId(undefined);
  };

  const handleDeleteAnswer = async () => {
    deleteAnswerId && (await courseAnswersService.delete(deleteAnswerId));
  };

  const handleDeleteCourseQuestion = async () => {
    deleteCourseQuestionId &&
      (await courseQuestionsService.delete(deleteCourseQuestionId));
  };

  const handleCloseDeleteCourseQuestion = () => {
    setDeleteCourseQuestionId(undefined);
  };

  return (
    <>
      {courseQuestions.map((courseQuestion, index) => {
        return (
          <Fragment key={index}>
            <CourseQuestion
              data={courseQuestion}
              refetch={refetch}
              currentUserId={currentUserId}
              onDeleteAnswer={setDeleteAnswerId}
              onDeleteQuestion={setDeleteCourseQuestionId}
            />
          </Fragment>
        );
      })}

      <DeleteDialog
        name={Messages.course.comment}
        open={!!deleteAnswerId}
        onClose={handleCloseDeleteAnswer}
        onDelete={handleDeleteAnswer}
        onFinish={refetch}
      />

      <DeleteDialog
        name={Messages.course.comment}
        open={!!deleteCourseQuestionId}
        onClose={handleCloseDeleteCourseQuestion}
        onDelete={handleDeleteCourseQuestion}
        onFinish={refetch}
      />
    </>
  );
};

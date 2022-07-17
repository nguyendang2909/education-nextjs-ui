import React, { FC } from 'react';
import { LessonData } from '../../../types/fetch-data.type';
import { EditLesson } from './EditLesson';

type EditLessonsProps = {
  lessons?: LessonData[];
  onFinish: () => void;
};

export const EditLessons: FC<EditLessonsProps> = ({
  lessons = [],
  onFinish,
}) => {
  return (
    <>
      {lessons.map((lesson, index) => {
        return <EditLesson key={index} lesson={lesson} />;
      })}
    </>
  );
};

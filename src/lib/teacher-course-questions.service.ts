import { APP_API } from '../config';
import { CourseQuestionData } from '../types/fetch-data.type';
import {
  TFindAllCourseQuestionsDto,
  TFindManyCourseQuestionsDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class TeacherCourseQuestionsService {
  async getMany(
    params: TFindManyCourseQuestionsDto = {},
  ): Promise<CourseQuestionData[]> {
    return await requestAPI.get<CourseQuestionData[]>(
      `${APP_API.teachers.courseQuestions}`,
      {
        params,
      },
    );
  }

  async count(params: TFindAllCourseQuestionsDto = {}): Promise<number> {
    return await requestAPI.get<number>(
      `${APP_API.teachers.count.courseQuestions}`,
      {
        params,
      },
    );
  }

  async getOneById(id: number): Promise<CourseQuestionData> {
    return await requestAPI.get<CourseQuestionData>(
      `${APP_API.teachers.courseQuestions}/${id}`,
    );
  }
}

export const teacherCourseQuestionsService =
  new TeacherCourseQuestionsService();

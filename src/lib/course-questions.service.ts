import { APP_API } from '../config';
import { CourseData, CourseQuestionData } from '../types/fetch-data.type';
import {
  CreateCourseQuestionDto,
  FindAllCourseQuestionsDto,
  FindManyCourseQuestionsDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class CourseQuestionsService {
  async create(createCourseQuestionDto: CreateCourseQuestionDto) {
    return await requestAPI.post(
      APP_API.courseQuestions,
      createCourseQuestionDto,
    );
  }

  async getMany(
    params: FindManyCourseQuestionsDto,
  ): Promise<CourseQuestionData[]> {
    return await requestAPI.get<CourseQuestionData[]>(
      `${APP_API.courseQuestions}`,
      {
        params,
      },
    );
  }

  async count(params: FindAllCourseQuestionsDto): Promise<number> {
    return await requestAPI.get<number>(`${APP_API.count.courseQuestions}`, {
      params,
    });
  }

  async getOneById(id: number): Promise<CourseData> {
    return await requestAPI.get<CourseData>(
      `${APP_API.count.courseQuestions}/${id}`,
    );
  }

  async delete(id: number) {
    return await requestAPI.delete(`${APP_API.courseQuestions}/${id}`);
  }
}

export const courseQuestionsService = new CourseQuestionsService();

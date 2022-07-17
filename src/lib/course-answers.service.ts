import { APP_API } from '../config';
import { CreateCourseAnswerDto } from '../types/request.dto';
import { requestAPI } from './request';

class CourseAnswersService {
  async create(createCourseAnswerDto: CreateCourseAnswerDto) {
    return await requestAPI.post(APP_API.courseAnswers, createCourseAnswerDto);
  }

  async delete(id: number) {
    return await requestAPI.delete(`${APP_API.courseAnswers}/${id}`);
  }
}

export const courseAnswersService = new CourseAnswersService();

import { APP_API } from '../config';
import { LessonData } from '../types/fetch-data.type';
import { requestAPI } from './request';

class LessonsService {
  async getOneById(id: number): Promise<LessonData> {
    return await requestAPI.get<LessonData>(`${APP_API.lessons}/${id}`);
  }

  async getMany() {}

  async delete(id: number) {
    return await requestAPI.delete(`${APP_API.teachers.lessons}/${id}`);
  }
}

export const lessonsService = new LessonsService();

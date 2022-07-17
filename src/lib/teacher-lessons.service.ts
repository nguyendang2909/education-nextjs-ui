import { APP_API } from '../config';
import { LessonData } from '../types/fetch-data.type';
import { TCreateLessonDto, TUpdateLessonDto } from '../types/request.dto';
import { requestAPI } from './request';

class TeacherLessonsService {
  async create(createLessonParams: TCreateLessonDto) {
    return await requestAPI.post(APP_API.teachers.lessons, createLessonParams);
  }

  async getOneById(id: number): Promise<LessonData> {
    return await requestAPI.get<LessonData>(
      `${APP_API.teachers.lessons}/${id}`,
    );
  }

  async getMany() {}

  async update(id: number, tUpdateLessonDto: TUpdateLessonDto) {
    return await requestAPI.patch(
      `${APP_API.teachers.lessons}/${id}`,
      tUpdateLessonDto,
    );
  }

  async delete(id: number) {
    return await requestAPI.delete(`${APP_API.teachers.lessons}/${id}`);
  }
}

export const teacherLessonsService = new TeacherLessonsService();

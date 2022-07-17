import { APP_API } from '../config';
import { CourseData, CoursePartData } from '../types/fetch-data.type';
import {
  TCreateCoursePartDto,
  TFindManyCoursePartsDto,
  TUpdateCoursePartDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class TeacherCoursePartsService {
  async create(params: TCreateCoursePartDto): Promise<CourseData> {
    return await requestAPI.post<CourseData>(
      APP_API.teachers.courseParts,
      params,
    );
  }

  async getMany(params: TFindManyCoursePartsDto = {}): Promise<CourseData[]> {
    return await requestAPI.get<CoursePartData[]>(
      APP_API.teachers.courseParts,
      {
        params,
      },
    );
  }

  // async count(params: TFindAllCoursesDto = {}) {
  //   return await requestAPI.get<number>(APP_API.teachers.countCourses, {
  //     params,
  //   });
  // }

  async getOneById(id: number): Promise<CoursePartData> {
    return await requestAPI.get<CourseData>(
      `${APP_API.teachers.courseParts}/${id}`,
    );
  }

  async update(id: number, values: TUpdateCoursePartDto) {
    const { ...updateOptions } = values;

    await requestAPI.patch(
      `${APP_API.teachers.courseParts}/${id}`,
      updateOptions,
    );
  }

  async delete(id: number) {
    return await requestAPI.delete(`${APP_API.teachers.courseParts}/${id}`);
  }
}

export const teacherCoursePartsService = new TeacherCoursePartsService();

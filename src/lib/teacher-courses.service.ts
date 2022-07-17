import { APP_API } from '../config';
import { CourseData } from '../types/fetch-data.type';
import {
  TCreateCourseDto,
  TFindAllCoursesDto,
  TFindManyCoursesDto,
  TUpdateCourseDto,
  TUpdateCourseImageDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class TeacherCoursesService {
  async create(params: TCreateCourseDto): Promise<CourseData> {
    return await requestAPI.post<CourseData>(APP_API.teachers.courses, params);
  }

  async getMany(params: TFindManyCoursesDto = {}): Promise<CourseData[]> {
    return await requestAPI.get<CourseData[]>(APP_API.teachers.courses, {
      params,
    });
  }

  async count(params: TFindAllCoursesDto = {}) {
    return await requestAPI.get<number>(APP_API.teachers.countCourses, {
      params,
    });
  }

  async getOneById(id: number): Promise<CourseData> {
    return await requestAPI.get<CourseData>(
      `${APP_API.teachers.courses}/${id}`,
    );
  }

  async update(id: number, values: TUpdateCourseDto, file?: File) {
    const { ...updateOptions } = values;

    await requestAPI.patch(`${APP_API.teachers.courses}/${id}`, updateOptions);
  }

  async updateImage(id: number, values: TUpdateCourseImageDto, file: File) {
    const { documentType } = values;

    const formData = new FormData();

    formData.append('file', file);

    formData.append('documentType', documentType);

    return await requestAPI.patch(
      `${APP_API.teachers.coursesImage}/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  async delete(courseId: number) {
    return await requestAPI.delete(`${APP_API.teachers.courses}/${courseId}`);
  }
}

export const teacherCoursesService = new TeacherCoursesService();

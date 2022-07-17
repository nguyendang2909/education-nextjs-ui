import { APP_API } from '../config';
import { CourseData } from '../types/fetch-data.type';
import {
  AFindAllCoursesDto,
  AFindManyCoursesDto,
  AUpdateCourseDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class AdminCoursesService {
  async getMany(params: AFindManyCoursesDto = {}): Promise<CourseData[]> {
    return await requestAPI.get<CourseData[]>(APP_API.admin.courses, {
      params,
    });
  }

  async count(params: AFindAllCoursesDto = {}) {
    return await requestAPI.get<number>(APP_API.admin.count.courses, {
      params,
    });
  }

  async getOneById(id: number): Promise<CourseData> {
    return await requestAPI.get<CourseData>(`${APP_API.admin.courses}/${id}`);
  }

  async update(id: number, values: AUpdateCourseDto) {
    const { ...updateOptions } = values;

    await requestAPI.patch(`${APP_API.admin.courses}/${id}`, updateOptions);
  }

  async uploadImage(courseId: number, file: File, type: 'cover' | 'banner') {
    const formData = new FormData();

    formData.append('image', file);

    const apiURL =
      type === 'cover'
        ? APP_API.admin.courseCoverImage
        : APP_API.admin.courseBanner;

    return await requestAPI.patch(`${apiURL}/${courseId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async delete(courseId: number) {
    return await requestAPI.delete(`${APP_API.admin.courses}/${courseId}`);
  }
}

export const adminCoursesService = new AdminCoursesService();

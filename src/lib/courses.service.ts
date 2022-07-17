import { APP_API, APP_URL, courseParamSplitter } from '../config';
import { CourseData, OrderItemData } from '../types/fetch-data.type';
import {
  CourseUnlockDto,
  FindAllCoursesDto,
  FindManyCoursesDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class CoursesService {
  async getMany(params: FindManyCoursesDto = {}): Promise<CourseData[]> {
    const result = await requestAPI.get<CourseData[]>(`${APP_API.courses}`, {
      params,
    });

    return result;
  }

  async count(params: FindAllCoursesDto = {}) {
    return await requestAPI.get<number>(`${APP_API.courses}/count`, {
      params,
    });
  }

  async getOneById(id: number): Promise<CourseData> {
    return await requestAPI.get<CourseData>(`${APP_API.courses}/${id}`);
  }

  async getOrderById(id: number) {
    return await requestAPI.get<OrderItemData>(
      `${APP_API.courses}/order-item/${id}`,
    );
  }

  // async getCartById(id: number) {
  //   return await requestAPI.get<OrderItemData>(`${APP_API.courses}/cart/${id}`);
  // }

  async learnById(id: number): Promise<CourseData> {
    return await requestAPI.get<CourseData>(`${APP_API.learnCourse}/${id}`);
  }

  async unlock(courseUnlockDto: CourseUnlockDto): Promise<CourseData> {
    return await requestAPI.post<CourseData>(
      `${APP_API.courseUnlock}`,
      courseUnlockDto,
    );
  }

  getPageLinkFromCourseIdAndName(id: number, name?: string): string {
    return `/${name?.replaceAll(' ', '-')}${courseParamSplitter}${id}`;
  }

  getIdFromParamId(paramId: string): number {
    const splitedParamId = paramId.split(courseParamSplitter);

    return +splitedParamId[splitedParamId.length - 1];
  }

  getLearnLink(id: number) {
    return `${APP_URL.classrooms}/${id}`;
  }
}

export const coursesService = new CoursesService();

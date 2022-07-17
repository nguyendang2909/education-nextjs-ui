import { APP_API } from '../config';
import {
  CourseCategoryData,
  CourseSubcategoryData,
} from '../types/fetch-data.type';
import {
  ACreateCourseSubcategoryDto,
  AFindAllCourseCategoriesDto,
  AFindAllCourseSubcategoriesDto,
  AUpdateCourseSubcategoryDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class AdminCourseSubcategoriesService {
  async create(createCourseSubcategoryDto: ACreateCourseSubcategoryDto) {
    return await requestAPI.post(
      `${APP_API.admin.courseSubcategories}`,
      createCourseSubcategoryDto,
    );
  }

  async getAll(
    aFindAllCourseSubcategoriesDto: AFindAllCourseSubcategoriesDto = {},
  ): Promise<CourseSubcategoryData[]> {
    const result = await requestAPI.get<CourseCategoryData[]>(
      `${APP_API.admin.courseSubcategories}`,
      {
        params: aFindAllCourseSubcategoriesDto,
      },
    );

    return result;
  }

  async count(params: AFindAllCourseCategoriesDto): Promise<number> {
    return await requestAPI.get<number>(
      `${APP_API.admin.count.courseSubcategories}`,
      {
        params,
      },
    );
  }

  async getOneById(id: number): Promise<CourseSubcategoryData> {
    return await requestAPI.get<CourseSubcategoryData>(
      `${APP_API.admin.courseSubcategories}/${id}`,
    );
  }

  async update(
    id: number,
    aUpdateCourseSubcategoryDto: AUpdateCourseSubcategoryDto,
  ) {
    return await requestAPI.patch(
      `${APP_API.admin.courseSubcategories}/${id}`,
      aUpdateCourseSubcategoryDto,
    );
  }
}

export const adminCourseSubcategoriesService =
  new AdminCourseSubcategoriesService();

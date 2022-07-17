import { APP_API } from '../config';
import { CourseCategoryData } from '../types/fetch-data.type';
import {
  ACreateCourseCategoryDto,
  AFindAllCourseCategoriesDto,
  AUpdateCourseCategoryDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class AdminCourseCategoriesService {
  async create(createCourseCategoryDto: ACreateCourseCategoryDto) {
    return await requestAPI.post(
      `${APP_API.admin.courseCategories}`,
      createCourseCategoryDto,
    );
  }
  async getAll(
    params: AFindAllCourseCategoriesDto = {},
  ): Promise<CourseCategoryData[]> {
    const result = await requestAPI.get<CourseCategoryData[]>(
      `${APP_API.admin.courseCategories}`,
      {
        params,
      },
    );

    return result;
  }

  async count(params: AFindAllCourseCategoriesDto): Promise<number> {
    const result = await requestAPI.get<number>(
      `${APP_API.admin.count.courseCategories}`,
      {
        params,
      },
    );

    return result;
  }

  async getOneById(id: number): Promise<CourseCategoryData> {
    return await requestAPI.get<CourseCategoryData>(
      `${APP_API.admin.courseCategories}/${id}`,
    );
  }

  async update(id: number, aUpdateCourseCategoryDto: AUpdateCourseCategoryDto) {
    return await requestAPI.patch(
      `${APP_API.admin.courseCategories}/${id}`,
      aUpdateCourseCategoryDto,
    );
  }
}

export const adminCourseCategoriesService = new AdminCourseCategoriesService();

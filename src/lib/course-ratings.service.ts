import { APP_API } from '../config';
import {
  CountCourseRatingsData,
  CourseRatingData,
} from '../types/fetch-data.type';
import {
  CreateCourseRatingDto,
  FindAllCourseRatingsDto,
  FindManyCourseRatingsDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class CourseRatingsService {
  async create(
    createCourseRatingDto: CreateCourseRatingDto,
  ): Promise<CourseRatingData> {
    return await requestAPI.post(APP_API.courseRatings, createCourseRatingDto);
  }

  async count(
    params: FindAllCourseRatingsDto = {},
  ): Promise<CountCourseRatingsData> {
    return await requestAPI.get<CountCourseRatingsData>(
      `${APP_API.count.courseRatings}`,
      {
        params,
      },
    );
  }

  async getMany(
    findManyCourseRatingsDto: FindManyCourseRatingsDto,
  ): Promise<CourseRatingData[]> {
    return await requestAPI.get<CourseRatingData[]>(
      `${APP_API.courseRatings}`,
      {
        params: findManyCourseRatingsDto,
      },
    );
  }

  async getOneById(id: number): Promise<CourseRatingData> {
    return await requestAPI.get<CourseRatingData>(
      `${APP_API.courseRatings}/${id}`,
    );
  }

  async getOneByCourseId(id: number): Promise<CourseRatingData> {
    return await requestAPI.get<CourseRatingData>(
      `${APP_API.courseRatings}/courses/${id}`,
    );
  }
}

export const courseRatingsService = new CourseRatingsService();

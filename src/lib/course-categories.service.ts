// import { courseCategoryParamSplitter } from '../config';
import { CourseCategoryData } from '../types/fetch-data.type';
import { FindAllCourseCategories } from '../types/request.dto';
import { requestAPI } from './request';

class CourseCategoriesService {
  async getAll(
    params: FindAllCourseCategories = {},
  ): Promise<CourseCategoryData[]> {
    const result = await requestAPI.get<CourseCategoryData[]>(
      '/course-categories',
      {
        params,
      },
    );

    return result;
  }

  async getFromId(id: number | string): Promise<CourseCategoryData> {
    return await requestAPI.get<CourseCategoryData>(`/course-categories/${id}`);
  }

  getPageLinkFromIdAndName(id: number, name?: string): string {
    return `/khoa-hoc?courseCategoryId=${id}`;
    // return `/khoa-hoc/${name?.replaceAll(
    //   ' ',
    //   '-',
    // )}${courseCategoryParamSplitter}${id}`;
  }

  // getCourseSubcategoryLink({
  //   id,
  //   name,
  //   courseSubcategoryId,
  //   courseSubcagegoryName,
  // }: {
  //   id: number;
  //   name?: string;
  //   courseSubcategoryId: number;
  //   courseSubcagegoryName?: string;
  // }): string {
  //   const courseCategoryLink = this.getPageLinkFromIdAndName(id, name);

  //   return `${courseCategoryLink}?`;
  // }

  // getIdFromParamId(paramId: string): number {
  //   const splitedParamId = paramId.split(courseCategoryParamSplitter);

  //   return +splitedParamId[splitedParamId.length - 1];
  // }
}

export const courseCategoriesService = new CourseCategoriesService();

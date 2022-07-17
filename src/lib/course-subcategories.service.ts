// import { courseCategoryParamSplitter } from '../config';
import { CourseCategoryData } from '../types/fetch-data.type';
import { requestAPI } from './request';

class CourseSubcategoriesService {
  async getFromId(id: number | string) {
    return await requestAPI.get<CourseCategoryData>(`/course-categories/${id}`);
  }

  getPageLinkFromIdAndName(id: number, name?: string): string {
    return `/khoa-hoc?courseSubcategoryId=${id}`;
    // return `/danh-muc-khoa-hoc-con/${name?.replaceAll(
    //   ' ',
    //   '-',
    // )}${courseCategoryParamSplitter}${id}`;
  }

  // getIdFromParamId(paramId: string): number {
  //   const splitedParamId = paramId.split(courseCategoryParamSplitter);

  //   return +splitedParamId[splitedParamId.length - 1];
  // }
}

export const courseSubcategoriesService = new CourseSubcategoriesService();

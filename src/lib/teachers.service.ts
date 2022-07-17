import { teacherParamSplitter } from '../config';
import { UserData } from '../types/fetch-data.type';
import { requestAPI } from './request';

class TeachersService {
  async getMany(params: Record<string, any> = {}): Promise<UserData[]> {
    return await requestAPI.get<UserData[]>('/teachers');
  }

  async getFromId(id: number | string): Promise<UserData> {
    return await requestAPI.get<UserData>(`/teachers/${id}`);
  }

  getPageLinkFromIdAndName(id: number, name?: string): string {
    return `/giang-vien/${name?.replaceAll(
      ' ',
      '-',
    )}${teacherParamSplitter}${id}`;
  }

  getIdFromParamId(paramId: string): number {
    const splitedParamId = paramId.split(teacherParamSplitter);

    return +splitedParamId[splitedParamId.length - 1];
  }
}

export const teachersService = new TeachersService();

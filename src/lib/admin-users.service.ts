import { APP_API } from '../config';
import { UserData } from '../types/fetch-data.type';
import {
  AFindAllUsersDto,
  AFindManyUsersDto,
  AUpdateUserDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class AdminUsersService {
  async getMany(aFindManyUsersDto: AFindManyUsersDto): Promise<UserData[]> {
    return await requestAPI.get<UserData[]>(APP_API.admin.users, {
      params: aFindManyUsersDto,
    });
  }

  async count(aFindAllUsersDto: AFindAllUsersDto): Promise<number> {
    return await requestAPI.get<number>(APP_API.admin.count.users, {
      params: aFindAllUsersDto,
    });
  }

  async update(id: number, aUpdateUserDto: AUpdateUserDto = {}) {
    return await requestAPI.patch(
      `${APP_API.admin.users}/${id}`,
      aUpdateUserDto,
    );
  }

  async updateAvatar(id: number, file: File) {
    const formData = new FormData();

    formData.append('image', file);

    return await requestAPI.patch(
      `${APP_API.admin.userAvatar}/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  async remove(id: number) {
    return await requestAPI.delete(`${APP_API.admin.users}/${id}`);
  }
}

export const adminUsersService = new AdminUsersService();

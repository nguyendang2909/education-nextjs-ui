import { APP_API } from '../config';
import { OrderData } from '../types/fetch-data.type';
import {
  AFindAllOrdersDto,
  AFindManyOrdersDto,
  AUpdateOrderDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class AdminOrdersService {
  async getMany(params: AFindManyOrdersDto = {}): Promise<OrderData[]> {
    return await requestAPI.get<OrderData[]>(APP_API.admin.orders, {
      params,
    });
  }

  async count(params: AFindAllOrdersDto = {}) {
    return await requestAPI.get<number>(APP_API.admin.count.orders, {
      params,
    });
  }

  async getOneById(id: number): Promise<OrderData> {
    return await requestAPI.get<OrderData>(`${APP_API.admin.orders}/${id}`);
  }

  async update(id: number, values: AUpdateOrderDto) {
    const { ...updateOptions } = values;

    await requestAPI.patch(`${APP_API.admin.orders}/${id}`, updateOptions);
  }
}

export const adminOrdersService = new AdminOrdersService();

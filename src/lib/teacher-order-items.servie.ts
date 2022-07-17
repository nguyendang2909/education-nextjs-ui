import { APP_API } from '../config';
import {
  OrderData,
  OrderItemData,
  TRevenueData,
} from '../types/fetch-data.type';
import {
  CreateOrderDto,
  TFindManyOrderItemsDto,
  TFindRevenue,
} from '../types/request.dto';
import { requestAPI } from './request';

class TeacherOrderItemsService {
  async create(createOrderDto: CreateOrderDto): Promise<OrderData> {
    return await requestAPI.post<OrderData>(APP_API.orders, createOrderDto);
  }

  async getMany(params: TFindManyOrderItemsDto = {}): Promise<OrderItemData[]> {
    return await requestAPI.get<OrderItemData[]>(APP_API.teachers.orderItems, {
      params,
    });
  }

  async getRevenue(params: TFindRevenue = {}): Promise<TRevenueData> {
    return await requestAPI.get<TRevenueData>(APP_API.teachers.revenue, {
      params,
    });
  }

  // async getPrice(params: FindAllCartsDto = {}): Promise<CartPriceData> {
  //   return await requestAPI.get<CartPriceData>(APP_API.cartPrice, {
  //     params,
  //   });
  // }

  // async count(params: FindAllCartsDto = {}) {
  //   return await requestAPI.get<number>(APP_API.count.carts, {
  //     params,
  //   });
  // }

  async getOneById(id: number): Promise<OrderData> {
    return await requestAPI.get<OrderData>(`${APP_API.orders}/${id}`);
  }

  // getIdFromParamId(paramId: string): number {
  //   const splitedParamId = paramId.split(courseParamSplitter);

  //   return +splitedParamId[splitedParamId.length - 1];
  // }

  // async delete(cartItemId: number): Promise<void> {
  //   await requestAPI.delete(`/carts/${cartItemId}`);
  // }
}

export const teacherOrderItemsService = new TeacherOrderItemsService();

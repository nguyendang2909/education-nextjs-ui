import { APP_API } from '../config';
import { OrderData } from '../types/fetch-data.type';
import {
  CreateOrderDto,
  FindAllOrdersDto,
  FindManyOrdersDto,
  UpdateOrderDto,
} from '../types/request.dto';
import { requestAPI } from './request';

class OrdersService {
  async create(createOrderDto: CreateOrderDto): Promise<OrderData> {
    return await requestAPI.post<OrderData>(APP_API.orders, createOrderDto);
  }

  async getMany(params: FindManyOrdersDto = {}): Promise<OrderData[]> {
    return await requestAPI.get<OrderData[]>(APP_API.orders, {
      params,
    });
  }

  // async getPrice(params: FindAllCartsDto = {}): Promise<CartPriceData> {
  //   return await requestAPI.get<CartPriceData>(APP_API.cartPrice, {
  //     params,
  //   });
  // }

  async count(params: FindAllOrdersDto = {}) {
    return await requestAPI.get<number>(APP_API.count.orders, {
      params,
    });
  }

  async getOneById(id: number): Promise<OrderData> {
    return await requestAPI.get<OrderData>(`${APP_API.orders}/${id}`);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto = {}) {
    return await requestAPI.patch(`${APP_API.orders}/${id}`, updateOrderDto);
  }
}

export const ordersService = new OrdersService();

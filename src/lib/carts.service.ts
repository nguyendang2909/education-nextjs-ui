import { APP_API, courseParamSplitter } from '../config';
import {
  CartItemData,
  CartPriceData,
  CourseData,
} from '../types/fetch-data.type';
import { AddToCartParams } from '../types/form-params.type';
import { FindAllCartsDto, FindManyCartsDto } from '../types/request.dto';
import { requestAPI } from './request';

class CartsService {
  async addToCart(addToCartParams: AddToCartParams) {
    return await requestAPI.post('/carts', {
      courseId: addToCartParams.courseId,
    });
  }

  async registerFreeCourse(courseId: number) {
    return await requestAPI.post(APP_API.cartsRegisterFreeCourse, {
      courseId: courseId,
    });
  }

  async getMany(params: FindManyCartsDto = {}): Promise<CartItemData[]> {
    return await requestAPI.get<CartItemData[]>(APP_API.carts, {
      params,
    });
  }

  async getPrice(params: FindAllCartsDto = {}): Promise<CartPriceData> {
    return await requestAPI.get<CartPriceData>(APP_API.cartPrice, {
      params,
    });
  }

  async count(params: FindAllCartsDto = {}) {
    return await requestAPI.get<number>(APP_API.count.carts, {
      params,
    });
  }

  async getOneById(id: string | number): Promise<CourseData> {
    return await requestAPI.get<CourseData>(`${APP_API.carts}/${id}`);
  }

  getIdFromParamId(paramId: string): number {
    const splitedParamId = paramId.split(courseParamSplitter);

    return +splitedParamId[splitedParamId.length - 1];
  }

  async delete(cartItemId: number): Promise<void> {
    await requestAPI.delete(`/carts/${cartItemId}`);
  }
}

export const cartsService = new CartsService();

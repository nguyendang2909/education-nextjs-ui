import { APP_API, APP_URL } from '../config';
import { EPaymentMethod } from '../types/enums';
import { Formatter } from './formatter';
import { ordersService } from './orders.servie';
import { requestAPI } from './request';

class PaymentsService {
  async payWithMomo(id: number): Promise<string> {
    return await requestAPI.get(`${APP_API.payments}/momo/${id}`);
  }

  async getPayUrl(id: number, paymentMethod: EPaymentMethod): Promise<string> {
    if (!paymentMethod) {
      throw new Error('Vui lòng chọn phương thức thanh toán');
    }

    await ordersService.update(id, {
      paymentMethod,
    });

    switch (paymentMethod) {
      case EPaymentMethod.Momo:
        const url = await this.payWithMomo(id);

        return url;

      default:
        return `${APP_URL.orderMoneyTransfer}/${Formatter.formatOrderId(id)}`;
    }
  }
}

export const paymentsService = new PaymentsService();

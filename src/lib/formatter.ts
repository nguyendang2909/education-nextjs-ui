import { format, parse, parseISO } from 'date-fns';
import {
  ECoursePublish,
  EGender,
  EOrderStatus,
  EPaymentMethod,
  ERegisterTeacher,
  ERole,
} from '../types/enums';
import { Messages } from './messages';

export class Formatter {
  public static formatMoney(money?: number): string {
    if (money === undefined || money === null) {
      return '';
    }

    return `${new Intl.NumberFormat('vi-VN').format(money)}đ`;
  }

  public static formatBirthday(dateString: string): string {
    try {
      return format(parse(dateString, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
    } catch (err) {
      return '';
    }
  }

  public static formatTime(timeString: string): string {
    try {
      return format(parseISO(timeString), 'dd/MM/yyyy HH:mm:ss');
    } catch (err) {
      return '';
    }
  }

  public static formatTimeToDate(timeString: string): string {
    try {
      return format(parseISO(timeString), 'dd/MM/yyyy');
    } catch (err) {
      return '';
    }
  }

  public static formatGender(gender: EGender): string {
    switch (gender) {
      case EGender.male:
        return Messages.user.male;

      case EGender.female:
        return Messages.user.female;

      default:
        return Messages.user.unknownGender;
    }
  }

  public static formatRole(role: ERole): string {
    switch (role) {
      case ERole.Teacher:
        return Messages.teacher.name;

      case ERole.Admin:
        return Messages.admin.name;

      default:
        return Messages.user.student;
    }
  }

  public static formatPaymentMethod(paymentMethod: EPaymentMethod): string {
    switch (paymentMethod) {
      case EPaymentMethod.Momo:
        return Messages.cart.momoTransfer;
      default:
        return Messages.cart.moneyTransfer;
    }
  }

  public static formatRegisterTeacher(registerTeacher: ERegisterTeacher) {
    switch (registerTeacher) {
      case ERegisterTeacher.notRegistered:
        return 'không đăng ký';
      case ERegisterTeacher.accept:
        return 'chấp nhận';
      case ERegisterTeacher.pending:
        return 'đang đăng ký';
      default:
        return 'bị từ chối';
    }
  }

  public static formatOrderId(id: number) {
    var zero = 7 - id.toString().length + 1;

    return `${Array(+(zero > 0 && zero)).join('0')}${id}`;
  }

  public static formatCoursePublish(publishStatus: ECoursePublish) {
    switch (publishStatus) {
      case ECoursePublish.Published:
        return 'đã đăng bán';
      case ECoursePublish.Pending:
        return 'đang yêu cầu';
      case ECoursePublish.Rejected:
        return 'bị từ chối';
      default:
        return 'không đăng bán';
    }
  }

  public static formatOrderStatus(status: EOrderStatus): string {
    switch (status) {
      case EOrderStatus.Cancel:
        return Messages.order.cancel;

      case EOrderStatus.Success:
        return Messages.order.success;

      case EOrderStatus.WaitForPayment:
        return Messages.order.waitForPayment;

      default:
        return '';
    }
  }
}

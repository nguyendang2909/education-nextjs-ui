import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBan,
  faCheckCircle,
  faHourglass,
  faQuestion,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { EOrderStatus, ERegisterTeacher } from '../types/enums';

class IconFormatter {
  public formatOrderStatus(status: EOrderStatus): IconProp {
    switch (status) {
      case EOrderStatus.Cancel:
        return faX;

      case EOrderStatus.Success:
        return faCheckCircle;

      case EOrderStatus.WaitForPayment:
        return faHourglass;

      default:
        return faQuestion;
    }
  }

  public formatRegisterTeacher(status: ERegisterTeacher): IconProp {
    switch (status) {
      case ERegisterTeacher.accept:
        return faCheckCircle;

      case ERegisterTeacher.notRegistered:
        return faX;

      case ERegisterTeacher.pending:
        return faHourglass;

      case ERegisterTeacher.reject:
        return faBan;
    }
  }
}

export const iconFormatter = new IconFormatter();
